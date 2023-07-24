import React from "react";
import { Droppable } from "./Droppable";

export default function Department({ id, deptName, managers, members }) {
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
      <div>
        <Droppable key={`managers-${id}`} id={`managers-${id}`}>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>部門長</div>
          {managers}
        </Droppable>
        <hr style={{ margin: 0 }} />
        <Droppable key={`members-${id}`} id={`members-${id}`}>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>メンバー</div>
          {members}
        </Droppable>
      </div>
    </div>
  );
}
