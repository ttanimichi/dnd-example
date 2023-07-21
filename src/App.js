import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Employee from "./Employee";
import Department from "./Department";

export default function App() {
  const containers = ["人事部", "総務部", "営業部"];
  const [departments, setDepartments] = useState({
    人事部: new Set([1, 2, 3]),
    総務部: new Set([4]),
    営業部: new Set([5, 6]),
  });

  const employees = [
    "松山 望結 (グレードC, 人月1.0)",
    "木村 乃蒼 (グレードA, 人月0.6)",
    "奥田 光雄 (グレードD, 人月1.0)",
    "徳田 泰人 (グレードB, 人月0.8)",
    "浅野 和聖 (グレードC, 人月0.8)",
    "黒木 波映 (グレードB, 人月1.0)",
  ].map((name, index) => <Employee id={index + 1} name={name} />);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {containers.map((deptName) => (
        <Department
          deptName={deptName}
          employees={[...departments[deptName]].map((id) => employees[id - 1])}
        />
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over, active } = event;
    const activeId = parseInt(active.id.match(/\d+/)[0], 10);

    setDepartments((departments) => {
      const newDepartments = { ...departments };
      departments.人事部.delete(activeId);
      departments.総務部.delete(activeId);
      departments.営業部.delete(activeId);
      newDepartments[over.id].add(activeId);
      return newDepartments;
    });
  }
}
