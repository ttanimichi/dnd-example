import { FC, useContext, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import toSuffix from "../utils/toSuffix";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import { DepartmentProps } from "../components/Department";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  dept: DepartmentProps;
}

const DeptNameDialog: FC<Props> = ({ open, setOpen, dept }) => {
  const suffix: string = toSuffix(dept.level);
  const [name, setName] = useState<string>(dept.name);
  const setDepartments = useContext(SetDepartmentsContext);
  if (setDepartments === null) return null;

  const handleClose = () => {
    setOpen(false);
  };

  const updateDeptName = (depts: DepartmentProps[]) => {
    depts.forEach((d) => {
      if (d.id === dept.id) {
        d.name = name;
      }
      if (d.branches && d.branches.length > 0) {
        updateDeptName(d.branches);
      }
    });
  };

  const handleSave = () => {
    setDepartments((prev) => {
      const newDepts = structuredClone(prev);
      updateDeptName(newDepts);
      return newDepts;
    });

    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>部署名を編集</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            部署名を編集します。以下の項目を入力して右下の「保存する」ボタンを押してください。
          </DialogContentText>
          <Box sx={{ height: 10 }} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              autoFocus
              margin="dense"
              id="deptName"
              label="部署名"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <div
              style={{ width: 100, display: "flex", justifyContent: "center" }}
            >
              {suffix}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSave}>保存する</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeptNameDialog;
