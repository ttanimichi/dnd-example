import { useContext, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import toSuffix from "../utils/toSuffix";

export default function NewDeptDialog({ open, setOpen, dept }) {
  const setDepartments = useContext(SetDepartmentsContext);

  const suffix = toSuffix(dept.level + 1);

  const [deptName, setDeptName] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const addDept = (depts) => {
    depts.forEach((d) => {
      if (d.id === dept.id) {
        d.branches.push({
          id: crypto.randomUUID(),
          name: deptName,
          managers: [],
          members: [],
          branches: [],
          level: d.level + 1,
          suffix,
        });
      }
      if (d.branches && d.branches.length > 0) {
        addDept(d.branches);
      }
    });
  };

  const handleSave = () => {
    setDepartments((prev) => {
      const newDepts = structuredClone(prev);
      addDept(newDepts);
      return newDepts;
    });

    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新規部署を作成</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            新規部署を作成します。以下の項目を入力して右下の「保存する」ボタンを押してください。
          </DialogContentText>
          <Box sx={{ height: 10 }} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              autoFocus
              margin="dense"
              id="newDeptName"
              label="部署名"
              type="text"
              fullWidth
              variant="standard"
              value={deptName}
              onChange={(event) => {
                setDeptName(event.target.value);
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
}
