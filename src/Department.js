import React, { useContext, useState } from "react";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import TargetContext from "./TargetContext";

import "rsuite/dist/rsuite.min.css";
import { Dropdown } from "rsuite";

export default function Department({ id, deptName, level, managers, members }) {
  const [flag, setFlag] = useState(false);
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
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>{`${deptName}${suffix}`}</div>
              <Dropdown title="編集">
                <Dropdown.Item
                  onClick={() => {
                    console.log("採用（中途）");
                    setFlag(true);
                  }}
                >
                  採用（中途）
                </Dropdown.Item>
                <Dropdown.Item>採用（障害者）</Dropdown.Item>
                <Dropdown.Item>採用（新卒）</Dropdown.Item>
              </Dropdown>
            </div>
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
                  {members.filter((member) => {
                    console.log(member);
                    return flag === true || member.props.id < 33;
                  })}
                </Droppable>
              </>
            )}
          </div>
        </div>
      </Draggable>
    </Droppable>
  );
}
