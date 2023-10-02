import { FC } from "react";
import Employee, { EmployeeProps } from "./Employee";

interface Props {
  employees: EmployeeProps[];
}

const EmployeeList: FC<Props> = ({ employees }) => {
  const noDataFound = (
    <div style={{ paddingTop: 10, paddingBottom: 10 }}>データがありません</div>
  );

  if (employees.length > 0) {
    return employees.map(
      ({
        id,
        name,
        grade,
        personMonth,
        avatar,
        secondaryRole,
        isRetired,
        isSuspended,
      }) => {
        return (
          <Employee
            key={id}
            id={id}
            name={name}
            grade={grade}
            personMonth={personMonth}
            avatar={avatar}
            secondaryRole={secondaryRole}
            isRetired={isRetired}
            isSuspended={isSuspended}
          />
        );
      }
    );
  } else {
    return noDataFound;
  }
};

export default EmployeeList;
