import React from "react";
import { Draggable } from "./Draggable";

export default function Employee({ id, name }) {
  return (
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
}
