import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

export default function App() {
  const containers = ["人事部", "総務部", "営業部"];
  const [departments, setDepartments] = useState({
    人事部: new Set([1, 2, 3]),
    総務部: new Set([4]),
    営業部: new Set([5, 6]),
  });

  const droppable = (id, name) => (
    <div key={id} style={{ paddingBottom: 10 }}>
      <Draggable id={`employee${id}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid grey",
          }}
        >
          <img src={`/face/${id}.png`} alt="" width="50" />
          <span style={{ width: 10 }} />
          <span>{name}</span>
        </div>
      </Draggable>
    </div>
  );

  const employees = [
    "松山 望結 (グレードC, 人月1.0)",
    "木村 乃蒼 (グレードA, 人月0.6)",
    "奥田 光雄 (グレードD, 人月1.0)",
    "徳田 泰人 (グレードB, 人月0.8)",
    "浅野 和聖 (グレードC, 人月0.8)",
    "黒木 波映 (グレードB, 人月1.0)",
  ].map((name, index) => droppable(index + 1, name));

  const Members = ({ id }) => {
    return <>{[...departments[id]].map((id) => employees[id - 1])}</>;
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {containers.map((id) => (
        <div
          style={{
            margin: "20px",
            border: "1px solid grey",
            width: "400px",
          }}
          key={id}
        >
          <div
            style={{
              borderBottom: "1px solid grey",
              padding: 10,
              backgroundColor: "lightgrey",
            }}
          >
            {id}
          </div>
          <Droppable key={id} id={id}>
            <Members id={id} />
          </Droppable>
        </div>
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
