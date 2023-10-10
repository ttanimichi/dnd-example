import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import Department, { DepartmentProps } from "./Department";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import TargetContext from "../utils/TargetContext";
import SetTargetContext, {
  SetTargetStateType,
} from "../utils/setTargetContext";
import { useContext, MouseEvent } from "react";
import updateLevel from "../utils/updateLevel";
import { EmployeeProps } from "./Employee";

function renderDepartment({
  id,
  name,
  level,
  managers,
  members,
  branches,
  collapse,
}: DepartmentProps) {
  return (
    <div key={id} style={{ display: "flex", alignItems: "flex-start" }}>
      <Department
        id={id}
        name={name}
        level={level}
        managers={managers}
        members={members}
        branches={branches}
        collapse={collapse}
      />
      <div>{branches.map(renderDepartment)}</div>
    </div>
  );
}

function isDescendant(
  depts: DepartmentProps[],
  parentId: string,
  childId: string
) {
  const subTree = removeById(structuredClone(depts), parentId);
  if (subTree === undefined) return false;
  return isDescendantSubTree(subTree, childId);
}

function isDescendantSubTree(subTree: DepartmentProps, childId: string) {
  if (subTree.id === childId) {
    return true;
  }

  if (subTree.branches.length > 0) {
    for (const branch of subTree.branches) {
      if (isDescendantSubTree(branch, childId)) {
        return true;
      }
    }
  }

  return false;
}

function removeById(
  depts: DepartmentProps[],
  idToRemove: string
): DepartmentProps | undefined {
  for (const [index, dept] of depts.entries()) {
    if (dept.id === idToRemove) {
      const removed = depts.splice(index, 1);
      return removed[0];
    }

    if (dept.branches.length > 0) {
      const removed = removeById(dept.branches, idToRemove);
      if (removed) return removed;
    }
  }
}

function addToChildrenById(
  depts: DepartmentProps[],
  id: string,
  value: DepartmentProps
) {
  for (const dept of depts) {
    if (dept.id === id) {
      dept.branches.push(value);
      return;
    }

    if (dept.branches.length > 0) {
      addToChildrenById(dept.branches, id, value);
    }
  }
}

function removeMember(
  depts: DepartmentProps[],
  memberId: string
): EmployeeProps | undefined {
  for (const dept of depts) {
    const removedManagers = dept.managers.filter((n) => n.id === memberId);
    const removedMembers = dept.members.filter((n) => n.id === memberId);

    if (removedManagers.length > 0) {
      dept.managers = dept.managers.filter((n) => n.id !== memberId);
      return removedManagers[0];
    } else if (removedMembers.length > 0) {
      dept.members = dept.members.filter((n) => n.id !== memberId);
      return removedMembers[0];
    } else {
      const result = removeMember(dept.branches, memberId);
      if (result !== undefined) return result;
    }
  }
}

function addMember(
  depts: DepartmentProps[],
  overId: string,
  employee: EmployeeProps
): void {
  const [type, deptId] = overId.split("/");

  depts.forEach((dept) => {
    if (dept.id === deptId) {
      if (type === "managers") {
        dept.managers.push(employee);
      } else {
        dept.members.push(employee);
      }
    } else if (dept.branches.length > 0) {
      addMember(dept.branches, overId, employee);
    }
  });
}

function shouldHandleEvent(element: HTMLElement | null) {
  let cur = element;

  while (cur) {
    if (cur.dataset.dndkitDisabledDndFlag) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
}

// モーダルやメニューなどドラッグ&ドロップの対象から除外したい要素には
// data-dndkit-disabled-dnd-flag="true"
// という属性を付与する
// ref.https://www.gaji.jp/blog/2022/02/24/9184/
class CustomMouseSensor extends MouseSensor {
  static activators = [
    {
      eventName: "onMouseDown" as const,
      handler: ({ nativeEvent: event }: MouseEvent): boolean => {
        return shouldHandleEvent(event.target as HTMLElement);
      },
    },
  ];
}

export default function OrganizationChart({
  departments,
}: {
  departments: DepartmentProps[];
}) {
  const sensors = useSensors(
    useSensor(CustomMouseSensor, { activationConstraint: { distance: 3 } })
  );

  const target = useContext<string | null>(TargetContext);
  const setTarget = useContext<SetTargetStateType>(SetTargetContext);
  const setDepartments = useContext(SetDepartmentsContext);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <div style={{ marginLeft: 16, paddingTop: 80 }}>
        {departments.map(renderDepartment)}
      </div>
      <div style={{ height: 100 }}></div>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    if (setTarget === null) return;

    setTarget(active.data.current?.type as string | null);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (setDepartments === null) return null;

    const { over, active } = event;
    if (!over) return;
    const activeId = active.id.toString().split("/")[1];
    const overId = over.id.toString().split("/")[1];

    setDepartments((prevDepartments) => {
      const newDepartments = structuredClone(prevDepartments);
      if (target === "employee") {
        const removed = removeMember(newDepartments, activeId);
        if (removed === undefined) return newDepartments;
        addMember(newDepartments, over.id.toString(), removed);
      } else if (target === "dept") {
        // 循環参照を防止
        if (!isDescendant(newDepartments, activeId, overId)) {
          const removed = removeById(newDepartments, activeId);
          if (removed === undefined) return newDepartments;
          addToChildrenById(newDepartments, overId, removed);
          updateLevel(newDepartments);
        }
      }
      return newDepartments;
    });
  }
}
