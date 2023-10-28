import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { DepartmentProps } from "./Department";
import toSuffix from "../utils/toSuffix";
import toEmployeeType from "../utils/toEmployeeType";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  departments: DepartmentProps[];
}

function flattenDepartments(
  departments: DepartmentProps[],
  parentName?: string,
  parentId?: string,
  parentLevel?: number
): {
  name: string;
  id: string;
  level: number;
  parentName?: string;
  parentId?: string;
  parentLevel?: number;
}[] {
  let flatDepartments: {
    name: string;
    id: string;
    level: number;
    parentName?: string;
    parentId?: string;
    parentLevel?: number;
  }[] = [];

  departments.forEach((department) => {
    flatDepartments.push({
      name: department.name,
      id: department.id,
      level: department.level,
      parentName: parentName,
      parentId: parentId,
      parentLevel: parentLevel,
    });

    if (department.branches.length > 0) {
      flatDepartments = flatDepartments.concat(
        flattenDepartments(
          department.branches,
          department.name,
          department.id,
          department.level
        )
      );
    }
  });

  return flatDepartments;
}

function flattenEmployees(departments: DepartmentProps[]) {
  let flatEmployees: {
    name: string;
    id: string;
    employmentType: string;
    isRetired: boolean;
    isSuspended: boolean;
    grade: string;
    personMonth: string;
    departmentName: string;
    departmentId: string;
    departmentLevel: number;
  }[] = [];

  departments.forEach((department) => {
    flatEmployees = flatEmployees.concat(
      department.members.concat(department.managers).map((employee) => {
        return {
          name: employee.name,
          id: employee.id,
          employmentType: employee.employmentType ?? "",
          isRetired: employee.isRetired ?? false,
          isSuspended: employee.isSuspended ?? false,
          grade: employee.grade,
          personMonth: employee.personMonth,
          departmentName: department.name,
          departmentId: department.id,
          departmentLevel: department.level,
        };
      })
    );

    if (department.branches.length > 0) {
      flatEmployees = flatEmployees.concat(
        flattenEmployees(department.branches)
      );
    }
  });

  return flatEmployees;
}

const ShoppingCartDialog: FC<Props> = ({ open, setOpen, departments }) => {
  const initialDepartments = JSON.parse(
    localStorage.getItem("initialDepartments") ?? "[]"
  ) as DepartmentProps[];

  const departmentArray = flattenDepartments(departments);
  const initialDepartmentArray = flattenDepartments(initialDepartments);
  const employeeArray = flattenEmployees(departments);
  const initialEmployeeArray = flattenEmployees(initialDepartments);

  const newDepartmentNames = departmentArray
    .filter(
      (dept) =>
        !initialDepartmentArray.some(
          (initialDept) => initialDept.id === dept.id
        )
    )
    .map((dept) => `${dept.name}${toSuffix(dept.level)}`);

  const deletedDepartmentNames = initialDepartmentArray
    .filter(
      (dept) =>
        !departmentArray.some((initialDept) => initialDept.id === dept.id)
    )
    .map((dept) => `${dept.name}${toSuffix(dept.level)}`);

  const changedDepartmentInfo = departmentArray
    .filter((dept) => {
      const initialDept = initialDepartmentArray.find(
        (initialDept) => initialDept.id === dept.id
      );
      return initialDept !== undefined && initialDept.name !== dept.name;
    })
    .map((dept) => {
      const initialDept = initialDepartmentArray.find(
        (initialDept) => initialDept.id === dept.id
      );
      return {
        initialName: `${initialDept?.name}${toSuffix(initialDept?.level ?? 0)}`,
        changedName: `${dept.name}${toSuffix(dept.level)}`,
      };
    });

  const movedDepartments = departmentArray
    .filter((dept) => {
      const initialDept = initialDepartmentArray.find(
        (initialDept) => initialDept.id === dept.id
      );
      return (
        initialDept !== undefined && initialDept.parentId !== dept.parentId
      );
    })
    .map((dept) => {
      const initialDept = initialDepartmentArray.find(
        (initialDept) => initialDept.id === dept.id
      );
      return {
        name: `${dept.name}${toSuffix(dept.level)}`,
        oldParentName: initialDept
          ? `${initialDept.parentName}${toSuffix(initialDept.parentLevel ?? 0)}`
          : null,
        newParentName: `${dept.parentName}${toSuffix(dept.parentLevel ?? 0)}`,
      };
    });

  const newEmployees = employeeArray.filter(
    (employee) =>
      !initialEmployeeArray.some(
        (initialEmployee) => initialEmployee.id === employee.id
      )
  );

  const deletedEmployees = employeeArray.filter(
    (employee) => employee.isRetired
  );

  const suspendEmployees = employeeArray.filter(
    (employee) => employee.isSuspended
  );

  const changedGradeEmployees = employeeArray
    .filter((employee) => {
      const initialEmployee = initialEmployeeArray.find(
        (initialEmployee) => initialEmployee.id === employee.id
      );
      return (
        initialEmployee !== undefined &&
        initialEmployee.grade !== employee.grade
      );
    })
    .map((employee) => {
      const initialEmployee = initialEmployeeArray.find(
        (initialEmployee) => initialEmployee.id === employee.id
      );
      return {
        id: employee.id,
        name: employee.name,
        grade: employee.grade,
        initialGrade: initialEmployee?.grade ?? "",
      };
    });

  const changedPersonMonthEmployees = employeeArray
    .filter((employee) => {
      const initialEmployee = initialEmployeeArray.find(
        (initialEmployee) => initialEmployee.id === employee.id
      );
      return (
        initialEmployee !== undefined &&
        initialEmployee.personMonth !== employee.personMonth
      );
    })
    .map((employee) => {
      const initialEmployee = initialEmployeeArray.find(
        (initialEmployee) => initialEmployee.id === employee.id
      );
      return {
        id: employee.id,
        name: employee.name,
        personMonth: employee.personMonth,
        initialPersonMonth: initialEmployee?.personMonth ?? "",
      };
    });

  const movedEmployees = employeeArray
    .filter((employee) => {
      const initialEmployee = initialEmployeeArray.find(
        (initialEmployee) => initialEmployee.id === employee.id
      );
      return (
        initialEmployee !== undefined &&
        initialEmployee.departmentId !== employee.departmentId
      );
    })
    .map((employee) => {
      const initialEmployee = initialEmployeeArray.find(
        (initialEmployee) => initialEmployee.id === employee.id
      );
      return {
        id: employee.id,
        name: employee.name,
        departmentName: `${employee.departmentName}${toSuffix(
          employee.departmentLevel
        )}`,
        initialDepartmentName: `${initialEmployee?.departmentName}${toSuffix(
          initialEmployee?.departmentLevel ?? 0
        )}`,
      };
    });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        data-dndkit-disabled-dnd-flag="true"
      >
        <DialogTitle>買い物かご</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            「買い物かご」には、現時点での組織図からの変更点の一覧が表示されます。変更点の一覧は以下の通りです。
          </DialogContentText>
          <Box sx={{ height: 10 }} />
          <div>
            <h3>新設の部署</h3>
            <ul>
              {newDepartmentNames.length > 0 ? (
                newDepartmentNames.map((name) => <li key={name}>{name}</li>)
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
          <div>
            <h3>廃止する部署</h3>
            <ul>
              {deletedDepartmentNames.length > 0 ? (
                deletedDepartmentNames.map((name) => <li key={name}>{name}</li>)
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
          <div>
            <h3>部署名の変更</h3>
            <ul>
              {changedDepartmentInfo.length > 0 ? (
                changedDepartmentInfo.map((dept) => (
                  <li key={dept.initialName}>
                    {dept.initialName} → {dept.changedName}
                  </li>
                ))
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
          <div>
            <h3>配置が変更された部署</h3>
            <ul>
              {movedDepartments.length > 0 ? (
                movedDepartments.map((dept) => (
                  <li key={dept.name}>
                    {dept.name}：{dept.oldParentName} → {dept.newParentName}
                  </li>
                ))
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
          <div>
            <h3>新入社員</h3>
            <ul>
              {newEmployees.length > 0 ? (
                newEmployees.map((employee) => (
                  <li key={employee.id}>
                    {employee.name}（{toEmployeeType(employee.employmentType)}）
                  </li>
                ))
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
          <div>
            <h3>退職</h3>
            <ul>
              {deletedEmployees.length > 0 ? (
                deletedEmployees.map((employee) => (
                  <li key={employee.id}>{employee.name}</li>
                ))
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
          <div>
            <h3>休職</h3>
            <ul>
              {suspendEmployees.length > 0 ? (
                suspendEmployees.map((employee) => (
                  <li key={employee.id}>{employee.name}</li>
                ))
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
          <div>
            <h3>昇格・降格</h3>
            <ul>
              {changedGradeEmployees.length > 0 ? (
                changedGradeEmployees.map((employee) => (
                  <li key={employee.id}>
                    {`${employee.name}（${employee.initialGrade} → ${employee.grade}）`}
                  </li>
                ))
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
          <div>
            <h3>人月の変更</h3>
            <ul>
              {changedPersonMonthEmployees.length > 0 ? (
                changedPersonMonthEmployees.map((employee) => (
                  <li key={employee.id}>
                    {`${employee.name}（${employee.initialPersonMonth} → ${employee.personMonth}）`}
                  </li>
                ))
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
          <div>
            <h3>異動</h3>
            <ul>
              {movedEmployees.length > 0 ? (
                movedEmployees.map((employee) => (
                  <li key={employee.id}>
                    {`${employee.name}（${employee.initialDepartmentName} → ${employee.departmentName}）`}
                  </li>
                ))
              ) : (
                <li>該当なし</li>
              )}
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
          {/* <Button onClick={handleClose}>保存する</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShoppingCartDialog;
