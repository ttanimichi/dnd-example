import { FC, useContext } from "react";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import TargetContext from "../utils/TargetContext";
import DeptMenu from "./DeptMenu";
import toSuffix from "../utils/toSuffix";
import EmployeeList from "./employeeList";
import { EmployeeProps } from "./Employee";

export type DepartmentProps = {
  id: string | number;
  name: string;
  level: number;
  collapse: boolean;
  members: EmployeeProps[];
  managers: EmployeeProps[];
  branches: DepartmentProps[];
};

const Department: FC<DepartmentProps> = ({ 
  id, name, managers, members, level, collapse, branches
}) => {
  const target = useContext(TargetContext);
  const suffix = toSuffix(level);

  const DeptHeader: FC = () => (
    <div
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>{`${name}${suffix}`}</div>
      <DeptMenu dept={{id, name, managers, members, level, collapse, branches}} />
    </div>
  );

  const DeptBody: FC = () => (
    <div style={{ borderTop: "1px solid grey" }}>
      {level === 0 ? (
        <>
          <Droppable
            key={`members/${id}`}
            id={`members/${id}`}
            disabled={target !== "employee"}
          >
            <div style={{ height: 10 }}></div>
            <EmployeeList employees={members} />
          </Droppable>
        </>
      ) : (
        <>
          <Droppable
            key={`managers/${id}`}
            id={`managers/${id}`}
            disabled={target !== "employee"}
          >
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>部門長</div>
            <EmployeeList employees={managers} />
          </Droppable>
          <hr style={{ margin: 0 }} />
          <Droppable
            key={`members/${id}`}
            id={`members/${id}`}
            disabled={target !== "employee"}
          >
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>メンバー</div>
            <EmployeeList employees={members} />
          </Droppable>
        </>
      )}
    </div>
  );

  return (
    <Droppable
      key={`drop-dept/${id}`}
      id={`drop-dept/${id}`}
      disabled={target !== "dept"}
    >
      <Draggable
        key={`drag-dept/${id}`}
        id={`drag-dept/${id}`}
        data={{ type: "dept" }}
      >
        <div
          style={{
            marginRight: 10,
            marginTop: 20,
            border: "1px solid grey",
            width: "360px",
          }}
          key={name}
        >
          <DeptHeader />
          {collapse ? null : <DeptBody />}
        </div>
      </Draggable>
    </Droppable>
  );
}

export default Department;
