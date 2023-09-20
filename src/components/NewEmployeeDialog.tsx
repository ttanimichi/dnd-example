import { FC, useState, useContext } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import SetDepartmentsContext, {
  SetDepartmentsStateType,
} from "../utils/SetDepartmentsContext";

import { createEmployee } from "../utils/createEmployees";
import { DepartmentProps } from "./Department";

function TypeSelect({ type, setType }) {
  const handleChange = (event: SelectChangeEvent) => {
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
  const handleChange = (event: SelectChangeEvent) => {
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
  const handleChange = (event: SelectChangeEvent) => {
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

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  dept: DepartmentProps;
};

const EmployeeInfoDialog: FC<Props> = ({ open, setOpen, dept }) => {
  const [name, setName] = useState("");
  const [employmentType, setEmploymentType] = useState("mid_career");
  const [grade, setGrade] = useState("グレードE");
  const [personMonth, setPersonMonth] = useState("1.0");

  const setDepartments = useContext<SetDepartmentsStateType>(
    SetDepartmentsContext
  );
  if (setDepartments === null) return null;

  const handleClose = () => {
    setOpen(false);
  };

  const addEmployee = (depts: DepartmentProps[]) => {
    depts.forEach((d) => {
      if (d.id === dept.id) {
        d.members.push(
          createEmployee({
            name,
            grade,
            personMonth,
            employmentType,
          })
        );
      }
      if (d.branches && d.branches.length > 0) {
        addEmployee(d.branches);
      }
    });
  };

  const handleSave = () => {
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
        <DialogContent dividers={true}>
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
};

export default EmployeeInfoDialog;
