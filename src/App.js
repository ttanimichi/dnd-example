import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Employee from "./Employee";
import Department from "./Department";

const defaultDepartments = [
  {
    id: 1,
    name: "人事部",
    memberSet: new Set([1, 2, 3]),
    children: [
      {
        id: 2,
        name: "労務課",
        memberSet: new Set([7, 8]),
        children: [],
      },
      {
        id: 3,
        name: "採用課",
        memberSet: new Set([9, 10]),
        children: [],
      },
    ],
  },
  {
    id: 4,
    name: "総務部",
    memberSet: new Set([4]),
    children: [],
  },
  {
    id: 5,
    name: "営業部",
    memberSet: new Set([5, 6]),
    children: [],
  },
];

export default function App() {
  const [departments, setDepartments] = useState(defaultDepartments);

  const employees = [
    "松山 望結 (グレードC, 人月1.0)",
    "木村 乃蒼 (グレードA, 人月0.6)",
    "奥田 光雄 (グレードD, 人月1.0)",
    "徳田 泰人 (グレードB, 人月0.8)",
    "浅野 和聖 (グレードC, 人月0.8)",
    "黒木 波映 (グレードB, 人月1.0)",
    "田中 彩花(グレードA, 人月1.0)",
    "鈴木 由美(グレードB, 人月0.9)",
    "山田 裕二(グレードC, 人月0.8)",
    "佐藤 英二(グレードA, 人月0.8)",
  ].map((name, index) => (
    <Employee key={index + 1} id={index + 1} name={name} />
  ));

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ marginLeft: 20 }}>{departments.map(renderDepartment)}</div>
    </DndContext>
  );

  function renderDepartment(department) {
    return (
      <div
        key={department.id}
        style={{ display: "flex", alignItems: "flex-start" }}
      >
        <Department
          id={department.id}
          deptName={department.name}
          employees={[...department.memberSet].map((id) => employees[id - 1])}
        />
        <div>{department.children.map(renderDepartment)}</div>
      </div>
    );
  }

  function handleDragEnd(event) {
    const { over, active } = event;
    const activeId = parseInt(active.id.match(/\d+/)[0], 10);
    setDepartments((prevDepartments) => {
      const newDepartments = structuredClone(prevDepartments);
      removeMember(newDepartments, activeId);
      addMember(newDepartments, parseInt(over.id), activeId);
      return newDepartments;
    });
  }
}

function removeMember(depts, memberId) {
  depts.forEach((dept) => {
    dept.memberSet.delete(memberId);
    removeMember(dept.children, memberId);
  });
}

function addMember(depts, deptId, memberId) {
  depts.forEach((dept) => {
    if (dept.id === deptId) {
      dept.memberSet.add(memberId);
    } else if (dept.children.length > 0) {
      addMember(dept.children, deptId, memberId);
    }
  });
}
