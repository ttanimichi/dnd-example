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

import SetEmployeesContext from "./SetEmployeesContext";
import SetDepartmentsContext from "./SetDepartmentsContext";

function TypeSelect({ type, setType }) {
  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="employment-type-label">採用種別</InputLabel>
      <Select
        labelId="employment-type-label"
        id="employment-type-label"
        value={type}
        label="採用種別"
        onChange={handleChange}
      >
        <MenuItem value={"mid_career"}>中途採用</MenuItem>
        <MenuItem value={"new_graduate"}>新卒採用</MenuItem>
        <MenuItem value={"handicapped"}>障害者採用</MenuItem>
      </Select>
    </FormControl>
  );
}

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

export default function EmployeeInfoDialog({ open, setOpen, dept }) {
  const setEmployees = React.useContext(SetEmployeesContext);
  const setDepartments = React.useContext(SetDepartmentsContext);

  const [name, setName] = React.useState("");
  const [employmentType, setEmploymentType] = React.useState("mid_career");
  const [grade, setGrade] = React.useState("グレードE");
  const [personMonth, setPersonMonth] = React.useState("1.0");

  const id = Math.floor(Math.random() * (100000000 + 1 - 10000)) + 10000;

  const handleClose = () => {
    setOpen(false);
  };
  const addEmployee = (depts) => {
    depts.forEach((d) => {
      if (d.id === dept.id) {
        d.memberSet.add(id);
      }
      if (d.children && d.children.length > 0) {
        addEmployee(d.children);
      }
    });
  };

  const handleSave = () => {
    setEmployees((prev) => {
      const newEmployees = [...prev];
      newEmployees.push({
        id,
        name,
        employmentType,
        grade,
        personMonth,
      });
      return newEmployees;
    });

    setDepartments((prev) => {
      const newDepts = structuredClone(prev);
      addEmployee(newDepts);
      return newDepts;
    });

    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新入社員を追加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            以下の項目を入力してください（従業員名は「UIデザイナー」「IT統制責任者候補」など仮の呼称でも問題ありません）
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
            <TypeSelect type={employmentType} setType={setEmploymentType} />
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
