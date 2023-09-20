import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import Department, { DepartmentProps } from "./Department";
import SetDepartmentsContext, {
  SetDepartmentsStateType,
} from "../utils/SetDepartmentsContext";
import TargetContext from "../utils/TargetContext";
import SetTargetContext, {
  SetTargetStateType,
} from "../utils/setTargetContext";
import { useContext } from "react";
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
}) {
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
  return isDescendantSubTree(subTree, childId);
}

function isDescendantSubTree(subTree, childId) {
  if (subTree.id === childId) {
    return true;
  }

  if (subTree.branches && subTree.branches.length > 0) {
    for (let i = 0; i < subTree.branches.length; i++) {
      if (isDescendantSubTree(subTree.branches[i], childId)) {
        return true;
      }
    }
  }

  return false;
}

function removeById(depts: DepartmentProps[], idToRemove: string) {
  for (let i = 0; i < depts.length; i++) {
    if (depts[i].id === idToRemove) {
      const removed = depts.splice(i, 1);
      return removed[0];
    }

    if (depts[i].branches && depts[i].branches.length > 0) {
      const removed = removeById(depts[i].branches, idToRemove);
      if (removed) {
        return removed;
      }
    }
  }
}

function addToChildrenById(
  depts: DepartmentProps[],
  id: string,
  value: DepartmentProps
) {
  for (let i = 0; i < depts.length; i++) {
    if (depts[i].id === id) {
      depts[i].branches.push(value);
      return;
    }

    if (depts[i].branches && depts[i].branches.length > 0) {
      addToChildrenById(depts[i].branches, id, value);
    }
  }
}

function removeMember(depts: DepartmentProps[], memberId: string) {
  for (let i = 0; i < depts.length; i++) {
    const dept = depts[i];
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
) {
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

export default function OrganizationChart({ departments }) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } })
  );

  const target = useContext<string | null>(TargetContext);
  const setTarget = useContext<SetTargetStateType>(SetTargetContext);
  const setDepartments = useContext<SetDepartmentsStateType>(
    SetDepartmentsContext
  );

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
    if (!active || setTarget === null) return;

    setTarget(active.data.current?.type);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (setDepartments === null) return null;

    const { over, active } = event;
    if (!over || !active) return;
    const activeId = active.id.toString().split("/")[1];
    const overId = over.id.toString().split("/")[1];

    setDepartments((prevDepartments) => {
      const newDepartments = structuredClone(prevDepartments);
      if (target === "employee") {
        const removed = removeMember(newDepartments, activeId);
        addMember(newDepartments, over.id.toString(), removed);
      } else if (target === "dept") {
        // 循環参照を防止
        if (!isDescendant(newDepartments, activeId, overId)) {
          const removed = removeById(newDepartments, activeId);
          addToChildrenById(newDepartments, overId, removed);
          updateLevel(newDepartments);
        }
      }
      return newDepartments;
    });
  }
}
