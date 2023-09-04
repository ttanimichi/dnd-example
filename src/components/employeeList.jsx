import Employee from "./Employee";

export default function EmployeeList({ employees }) {
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
}
