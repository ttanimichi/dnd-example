import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import SetDepartmentsContext from "../utils/SetDepartmentsContext";

function GradeSelect({ grade, setGrade }) {
  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">グレード</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={grade}
        label="グレード"
        onChange={handleChange}
      >
        <MenuItem value={"グレードA"}>グレードA</MenuItem>
        <MenuItem value={"グレードB"}>グレードB</MenuItem>
        <MenuItem value={"グレードC"}>グレードC</MenuItem>
        <MenuItem value={"グレードD"}>グレードD</MenuItem>
        <MenuItem value={"グレードE"}>グレードE</MenuItem>
        <MenuItem value={"グレードF"}>グレードF</MenuItem>
        <MenuItem value={"グレードG"}>グレードG</MenuItem>
        <MenuItem value={"アルバイト・パート"}>アルバイト・パート</MenuItem>
        <MenuItem value={"その他（出向など）"}>その他（出向など）</MenuItem>
        <MenuItem value={"業務委託"}>業務委託</MenuItem>
      </Select>
    </FormControl>
  );
}

function PersonMonthSelect({ personMonth, setPersonMonth }) {
  const handleChange = (event) => {
    setPersonMonth(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">人月</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={personMonth}
        label="人月"
        onChange={handleChange}
      >
        <MenuItem value={"1.0"}>1.0</MenuItem>
        <MenuItem value={"0.9"}>0.9</MenuItem>
        <MenuItem value={"0.8"}>0.8</MenuItem>
        <MenuItem value={"0.7"}>0.7</MenuItem>
        <MenuItem value={"0.6"}>0.6</MenuItem>
        <MenuItem value={"0.5"}>0.5</MenuItem>
        <MenuItem value={"0.4"}>0.4</MenuItem>
        <MenuItem value={"0.3"}>0.3</MenuItem>
        <MenuItem value={"0.2"}>0.2</MenuItem>
        <MenuItem value={"0.1"}>0.1</MenuItem>
        <MenuItem value={"0.0"}>0.0</MenuItem>
      </Select>
    </FormControl>
  );
}

export default function EmployeeInfoDialog({ open, setOpen, employee }) {
  const setDepartments = React.useContext(SetDepartmentsContext);

  const [grade, setGrade] = React.useState(employee.grade);
  const [personMonth, setPersonMonth] = React.useState(employee.personMonth);
  const [name, setName] = React.useState(employee.name);

  const handleClose = () => {
    setOpen(false);
  };

  const _updateEmployee = (member) => {
    if (member.id === employee.id) {
      member.grade = grade;
      member.personMonth = personMonth;
      member.name = name;
    }
  };

  const updateEmployee = (depts) => {
    depts.forEach((dept) => {
      dept.members.forEach(_updateEmployee);
      dept.managers.forEach(_updateEmployee);
      if (dept.branches && dept.branches.length > 0) {
        updateEmployee(dept.branches);
      }
    });
  };

  const handleSave = () => {
    setDepartments((prev) => {
      const newDepts = structuredClone(prev);
      updateEmployee(newDepts);
      return newDepts;
    });

    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>従業員情報を編集</DialogTitle>
        <DialogContent>
          <DialogContentText>
            以下の従業員情報を入力してください。
          </DialogContentText>
          <Box sx={{ height: 10 }} />
          <Stack spacing={3}>
            <TextField
              autoFocus
              margin="dense"
              id="employeeName"
              label="従業員名"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <GradeSelect grade={grade} setGrade={setGrade} />
            <PersonMonthSelect
              personMonth={personMonth}
              setPersonMonth={setPersonMonth}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSave}>保存する</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
