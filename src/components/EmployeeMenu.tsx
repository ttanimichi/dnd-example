import { useContext, useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmployeeInfoDialog from "./EmployeeInfoDialog";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import { EmployeeProps } from "./Employee";
import { DepartmentProps } from "./Department";

interface Props {
  employee: EmployeeProps;
}

export default function EmployeeMenu({ employee }: Props) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const setDepartments = useContext(SetDepartmentsContext);
  if (setDepartments === null) return null;

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMultipleRoles = () => {
    setDepartments((prev: DepartmentProps[]) => {
      const newDepts = structuredClone(prev);
      addRole(newDepts);
      return newDepts;
    });
    handleClose();
  };

  const buildSecondaryRole = (): EmployeeProps => {
    return {
      secondaryRole: true,
      id: crypto.randomUUID(),
      avatar: employee.avatar,
      name: employee.name,
      grade: employee.grade,
      personMonth: "0.0",
    };
  };

  const addRole = (depts: DepartmentProps[]) => {
    depts.forEach((d) => {
      const member = d.members.find((m) => m.id === employee.id);
      const manager = d.managers.find((m) => m.id === employee.id);

      if (member) {
        d.members.push(buildSecondaryRole());
      } else if (manager) {
        d.managers.push(buildSecondaryRole());
      } else if (d.branches.length > 0) {
        addRole(d.branches);
      }
    });
  };

  const handleDelete = () => {
    setDepartments((prev: DepartmentProps[]) => {
      const newDepts = structuredClone(prev);
      deleteEmployee(newDepts);
      return newDepts;
    });
    handleClose();
  };

  const deleteEmployee = (depts: DepartmentProps[]) => {
    depts.forEach((d) => {
      const member = d.members.find((m) => m.id === employee.id);
      const manager = d.managers.find((m) => m.id === employee.id);

      if (member) {
        d.members.splice(d.members.indexOf(member), 1);
      } else if (manager) {
        d.managers.splice(d.managers.indexOf(manager), 1);
      } else if (d.branches.length > 0) {
        deleteEmployee(d.branches);
      }
    });
  };

  if (employee.secondaryRole) {
    return (
      <Button
        id="basic-button"
        variant="outlined"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleDelete}
      >
        削除
      </Button>
    );
  } else {
    return (
      <>
        <Button
          id="basic-button"
          variant="outlined"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          編集
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setDialogOpen(true);
              handleClose();
            }}
          >
            従業員情報を編集
          </MenuItem>
          <MenuItem onClick={handleMultipleRoles}>複製（兼任用）</MenuItem>
        </Menu>
        <EmployeeInfoDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          employee={employee}
        />
      </>
    );
  }
}
