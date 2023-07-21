import React from "react";
import { Droppable } from "./Droppable";

export default function Department({ deptName, employees }) {
  return (
    <div
      style={{
        margin: "20px",
        border: "1px solid grey",
        width: "400px",
      }}
      key={deptName}
    >
      <div
        style={{
          borderBottom: "1px solid grey",
          padding: 10,
          backgroundColor: "lightgrey",
        }}
      >
        {deptName}
      </div>
      <Droppable key={deptName} id={deptName}>
        {employees}
      </Droppable>
    </div>
  );
}
