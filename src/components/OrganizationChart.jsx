import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import Department from "./Department";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import TargetContext from "../utils/TargetContext";
import SetTargetContext from "../utils/setTargetContext";
import { useContext } from "react";
import updateLevel from "../utils/updateLevel";

export default function OrganizationChart({ departments }) {
  const setDepartments = useContext(SetDepartmentsContext);
  const target = useContext(TargetContext);
  const setTarget = useContext(SetTargetContext);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } })
  );

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <div style={{ marginLeft: 20 }}>{departments.map(renderDepartment)}</div>
      <div style={{ height: 100 }}></div>
    </DndContext>
  );

  function renderDepartment({
    id,
    name,
    level,
    managers,
    memberSet,
    children,
  }) {
    return (
      <div key={id} style={{ display: "flex", alignItems: "flex-start" }}>
        <Department
          id={id}
          deptName={name}
          level={level}
          managers={managers}
          members={memberSet}
        />
        <div>{children.map(renderDepartment)}</div>
      </div>
    );
  }

  function handleDragStart(event) {
    const { active } = event;

    if (!active) return;
    setTarget(active.data.current.type);
  }

  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over || !active) return;

    const activeId = parseInt(active.id.match(/\d+/)[0], 10);
    const overId = parseInt(over.id.match(/\d+/)[0], 10);

    setDepartments((prevDepartments) => {
      const newDepartments = structuredClone(prevDepartments);
      if (target === "employee") {
        removeMember(newDepartments, activeId);
        addMember(newDepartments, over.id, activeId);
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

  function isDescendant(depts, parentId, childId) {
    const subTree = removeById(structuredClone(depts), parentId);
    return isDescendantSubTree(subTree, childId);
  }

  function isDescendantSubTree(subTree, childId) {
    if (subTree.id === childId) {
      return true;
    }

    if (subTree.children && subTree.children.length > 0) {
      for (let i = 0; i < subTree.children.length; i++) {
        if (isDescendantSubTree(subTree.children[i], childId)) {
          return true;
        }
      }
    }

    return false;
  }

  function removeById(depts, idToRemove) {
    for (let i = 0; i < depts.length; i++) {
      if (depts[i].id === idToRemove) {
        const removed = depts.splice(i, 1);
        return removed[0];
      }

      if (depts[i].children && depts[i].children.length > 0) {
        const removed = removeById(depts[i].children, idToRemove);
        if (removed) {
          return removed;
        }
      }
    }
  }

  function addToChildrenById(depts, id, value) {
    for (let i = 0; i < depts.length; i++) {
      if (depts[i].id === id) {
        depts[i].children.push(value);
        return;
      }

      if (depts[i].children && depts[i].children.length > 0) {
        addToChildrenById(depts[i].children, id, value);
      }
    }
  }

  function removeMember(depts, memberId) {
    depts.forEach((dept) => {
      dept.managers.delete(memberId);
      dept.memberSet.delete(memberId);
      removeMember(dept.children, memberId);
    });
  }

  function addMember(depts, overId, memberId) {
    if (typeof overId !== "string" || !overId.includes("-")) return;

    const type = overId.split("-")[0];
    const deptId = overId.split("-")[1];

    depts.forEach((dept) => {
      if (dept.id === parseInt(deptId, 10)) {
        if (type === "managers") {
          dept.managers.add(memberId);
        } else {
          dept.memberSet.add(memberId);
        }
      } else if (dept.children.length > 0) {
        addMember(dept.children, overId, memberId);
      }
    });
  }
}
