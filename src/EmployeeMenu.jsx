import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmployeeInfoDialog from "./EmployeeInfoDialog.jsx";

export default function EmployeeMenu({ employee }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);

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
        <MenuItem
          onClick={() => {
            setDialogOpen(true);
            handleClose();
          }}
        >
          従業員情報を編集
        </MenuItem>
        <MenuItem onClick={handleClose}>退職</MenuItem>
        <MenuItem onClick={handleClose}>休職</MenuItem>
        <MenuItem onClick={handleClose}>複製（兼任用）</MenuItem>
      </Menu>
      <EmployeeInfoDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        employee={employee}
      />
    </div>
  );
}
