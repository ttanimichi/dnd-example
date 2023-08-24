import { useContext } from "react";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import TargetContext from "../utils/TargetContext";
import EmployeesContext from "../utils/EmployeesContext";
import DeptMenu from "./DeptMenu";
import toSuffix from "../utils/toSuffix";
import Employee from "./Employee";

export default function Department({ id, deptName, managers, members, level }) {
  const target = useContext(TargetContext);
  const employees = useContext(EmployeesContext);
  const employeeMap = new Map();
  employees.forEach((e) => {
    employeeMap.set(e.id, e);
  });

  let suffix = toSuffix(level);
  const dept = { id, deptName, level, suffix };

  function employeeList(ids) {
    const noDataFound = (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        データがありません
      </div>
    );

    if (ids.size > 0) {
      return [...ids].map((id) => {
        const { name, grade, personMonth } = employeeMap.get(id);
        return (
          <Employee
            key={id}
            id={id}
            name={name}
            grade={grade}
            personMonth={personMonth}
          />
        );
      });
    } else {
      return noDataFound;
    }
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
                  {employeeList(members)}
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
                  {employeeList(managers)}
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
                  {employeeList(members)}
                </Droppable>
              </>
            )}
          </div>
        </div>
      </Draggable>
    </Droppable>
  );
}
