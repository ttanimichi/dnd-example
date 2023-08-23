import { useContext } from "react";
import { Droppable } from "../utils/Droppable";
import { Draggable } from "../utils/Draggable";
import TargetContext from "../utils/TargetContext";
import DeptMenu from "./DeptMenu";
import toSuffix from "../utils/toSuffix";

export default function Department({ id, deptName, managers, members, level }) {
  const target = useContext(TargetContext);

  let suffix = toSuffix(level);
  const dept = { id, deptName, managers, members, level, suffix };

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
            marginRight: 10,
            marginTop: 20,
            border: "1px solid grey",
            width: "360px",
          }}
          key={deptName}
        >
          <div
            style={{
              borderBottom: "1px solid grey",
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>{`${deptName}${suffix}`}</div>
            <DeptMenu dept={dept} />
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
