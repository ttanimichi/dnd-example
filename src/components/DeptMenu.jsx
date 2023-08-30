import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeptNameDialog from "./DeptNameDialog";
import NewDeptDialog from "./NewDeptDialog";
import NewEmployeeDialog from "./NewEmployeeDialog";
import AlertDialog from "./AlertDialog";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";

export default function DeptMenu({ dept }) {
  const setDepartments = useContext(SetDepartmentsContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [deptNameDialogOpen, setDeptNameDialogOpen] = useState(false);
  const [newDeptDialogOpen, setNewDeptDialogOpen] = useState(false);
  const [newEmployeeDialogOpen, setNewEmployeeDialogOpen] = useState(false);
  const [deleteDeptDialogOpen, setDeleteDeptDialogOpen] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openDeptNameDialog = () => {
    setDeptNameDialogOpen(true);
    handleClose();
  };
  const openNewDeptDialog = () => {
    setNewDeptDialogOpen(true);
    handleClose();
  };
  const openNewEmployeeDialog = () => {
    setNewEmployeeDialogOpen(true);
    handleClose();
  };
  const openDeleteDeptDialog = () => {
    if (
      dept.members.length > 0 ||
      dept.managers.length > 0 ||
      dept.branches.length > 0
    ) {
      setDeleteDeptDialogOpen(true);
    } else {
      setDepartments((prev) => {
        const newDepts = structuredClone(prev);
        deleteDept(newDepts);
        return newDepts;
      });
    }

    handleClose();
  };
  const deleteDept = (depts) => {
    depts.forEach((d) => {
      if (d.id === dept.id) {
        depts.splice(depts.indexOf(d), 1);
      } else if (d.branches && d.branches.length > 0) {
        deleteDept(d.branches);
      }
    });
  };

  return (
    <div>
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
        <MenuItem onClick={openNewEmployeeDialog}>新入社員を追加</MenuItem>
        <MenuItem onClick={openDeleteDeptDialog}>この部署を廃止</MenuItem>
        <MenuItem onClick={openDeptNameDialog}>部署名を編集</MenuItem>
        <MenuItem onClick={openNewDeptDialog}>直下に部署を追加</MenuItem>
      </Menu>
      <DeptNameDialog
        open={deptNameDialogOpen}
        setOpen={setDeptNameDialogOpen}
        dept={dept}
      />
      <NewDeptDialog
        open={newDeptDialogOpen}
        setOpen={setNewDeptDialogOpen}
        dept={dept}
      />
      <NewEmployeeDialog
        open={newEmployeeDialogOpen}
        setOpen={setNewEmployeeDialogOpen}
        dept={dept}
      />
      <AlertDialog
        open={deleteDeptDialogOpen}
        setOpen={setDeleteDeptDialogOpen}
        message="部署を廃止するには、メンバー全員と部門長を他の部署に移動する必要があります。また、配下の部署も事前にすべて削除しておく必要があります。"
      />
    </div>
  );
}
