import React from "react";
import { Droppable } from "./Droppable";

export default function Department({ id, deptName, employees }) {
  return (
    <div
      style={{
        marginRight: 20,
        marginTop: 20,
        border: "1px solid grey",
        width: "320px",
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
      <Droppable key={id} id={id}>
        {employees}
      </Droppable>
    </div>
  );
}
