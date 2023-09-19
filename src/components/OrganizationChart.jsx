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
      <div style={{ marginLeft: 16, paddingTop: 80 }}>
        {departments.map(renderDepartment)}
      </div>
      <div style={{ height: 100 }}></div>
    </DndContext>
  );

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

  function handleDragStart(event) {
    const { active } = event;

    if (!active) return;
    setTarget(active.data.current.type);
  }

  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over || !active) return;
    const activeId = active.id.split("/")[1];
    const overId = over.id.split("/")[1];

    setDepartments((prevDepartments) => {
      const newDepartments = structuredClone(prevDepartments);
      if (target === "employee") {
        const removed = removeMember(newDepartments, active.id.split("/")[1]);
        addMember(newDepartments, over.id, removed);
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

    if (subTree.branches && subTree.branches.length > 0) {
      for (let i = 0; i < subTree.branches.length; i++) {
        if (isDescendantSubTree(subTree.branches[i], childId)) {
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

      if (depts[i].branches && depts[i].branches.length > 0) {
        const removed = removeById(depts[i].branches, idToRemove);
        if (removed) {
          return removed;
        }
      }
    }
  }

  function addToChildrenById(depts, id, value) {
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

  function removeMember(depts, memberId) {
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

  function addMember(depts, overId, employee) {
    if (typeof overId !== "string") return;
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
}
