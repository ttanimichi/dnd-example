import { useContext, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import SetDepartmentsContext from "./SetDepartmentsContext";
import toSuffix from "./utils/toSuffix";

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
        d.children.push({
          id: Math.floor(Math.random() * (1000000 + 1 - 1000)) + 1000,
          name: deptName,
          managers: new Set(),
          memberSet: new Set(),
          children: [],
          level: d.level + 1,
          suffix,
        });
      }
      if (d.children && d.children.length > 0) {
        addDept(d.children);
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
        <DialogContent>
          <DialogContentText>以下の項目を入力してください。</DialogContentText>
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
              style={{ width: 60, display: "flex", justifyContent: "center" }}
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
