import React, { useContext } from "react";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import TargetContext from "./TargetContext";

export default function Department({ id, deptName, level, managers, members }) {
  const target = useContext(TargetContext);

  let suffix = "";
  switch (level) {
    case 0:
      break;
    case 1:
      suffix = "本部";
      break;
    case 2:
      suffix = "部";
      break;
    default:
      suffix = "課";
  }

  return (
    <Droppable
      key={`drop-dept-${id}`}
      id={`drop-dept-${id}`}
      disabled={target !== "dept"}
    >
      <Draggable
        key={`drag-dept-${id}`}
        id={`drag-dept-${id}`}
        data={{ type: "dept" }}
      >
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
            {`${deptName}${suffix}`}
          </div>
          <div>
            {id === 0 ? (
              <>
                <Droppable
                  key={`members-${id}`}
                  id={`members-${id}`}
                  disabled={target !== "employee"}
                >
                  <div style={{ height: 10 }}></div>
                  {members}
                </Droppable>
              </>
            ) : (
              <>
                <Droppable
                  key={`managers-${id}`}
                  id={`managers-${id}`}
                  disabled={target !== "employee"}
                >
                  <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                    部門長
                  </div>
                  {managers}
                </Droppable>
                <hr style={{ margin: 0 }} />
                <Droppable
                  key={`members-${id}`}
                  id={`members-${id}`}
                  disabled={target !== "employee"}
                >
                  <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                    メンバー
                  </div>
                  {members}
                </Droppable>
              </>
            )}
          </div>
        </div>
      </Draggable>
    </Droppable>
  );
}
