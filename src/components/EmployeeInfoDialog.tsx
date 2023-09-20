import { FC, useState, useContext, ChangeEvent } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SetDepartmentsContext, {
  SetDepartmentsStateType,
} from "../utils/SetDepartmentsContext";
import { EmployeeProps } from "./Employee";
import { DepartmentProps } from "./Department";

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
  employee: EmployeeProps;
};

const EmployeeInfoDialog: FC<Props> = ({ open, setOpen, employee }) => {
  const [grade, setGrade] = useState(employee.grade);
  const [personMonth, setPersonMonth] = useState(employee.personMonth);
  const [name, setName] = useState(employee.name);
  const [isRetired, setIsRetired] = useState(!!employee.isRetired);
  const [isSuspended, setIsSuspended] = useState(!!employee.isSuspended);

  const setDepartments = useContext<SetDepartmentsStateType>(
    SetDepartmentsContext
  );
  if (setDepartments === null) return null;

  const handleRetired = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsRetired(checked);
    if (checked) setIsSuspended(false);
  };

  const handleSuspended = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsSuspended(checked);
    if (checked) setIsRetired(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const _updateEmployee = (member: EmployeeProps) => {
    if (member.id === employee.id) {
      member.grade = grade;
      member.personMonth = personMonth;
      member.name = name;
      member.isRetired = isRetired;
      member.isSuspended = isSuspended;
    }
  };

  const updateEmployee = (depts: DepartmentProps[]) => {
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
        <DialogContent dividers={true}>
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
          <div
            style={{ marginTop: 10, display: "flex", flexDirection: "column" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSuspended}
                  onChange={handleSuspended}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="休職中"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRetired}
                  onChange={handleRetired}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="退職済み"
            />
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

export default EmployeeInfoDialog;
