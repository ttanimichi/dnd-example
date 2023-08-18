import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeptNameDialog from "./DeptNameDialog";
import NewDeptDialog from "./NewDeptDialog";

export default function DeptMenu({ dept }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deptNameDialogOpen, setDeptNameDialogOpen] = useState(false);
  const [newDeptDialogOpen, setNewDeptDialogOpen] = useState(false);
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
        <MenuItem onClick={handleClose}>新入社員を追加</MenuItem>
        <MenuItem onClick={handleClose}>この部署を廃止</MenuItem>
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
    </div>
  );
}
