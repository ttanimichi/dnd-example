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

function GradeSelect() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">グレード</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="グレード"
        onChange={handleChange}
      >
        <MenuItem value={10}>グレードA</MenuItem>
        <MenuItem value={20}>グレードB</MenuItem>
        <MenuItem value={30}>グレードC</MenuItem>
        <MenuItem value={40}>グレードD</MenuItem>
        <MenuItem value={50}>グレードE</MenuItem>
        <MenuItem value={60}>グレードF</MenuItem>
        <MenuItem value={70}>グレードG</MenuItem>
        <MenuItem value={80}>アルバイト・パート</MenuItem>
        <MenuItem value={90}>その他（出向など）</MenuItem>
        <MenuItem value={100}>業務委託</MenuItem>
      </Select>
    </FormControl>
  );
}

function PersonMonthSelect() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">人月</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="人月"
        onChange={handleChange}
      >
        <MenuItem value={10}>1.0</MenuItem>
        <MenuItem value={20}>0.9</MenuItem>
        <MenuItem value={30}>0.8</MenuItem>
        <MenuItem value={40}>0.7</MenuItem>
        <MenuItem value={50}>0.6</MenuItem>
        <MenuItem value={60}>0.5</MenuItem>
        <MenuItem value={70}>0.4</MenuItem>
        <MenuItem value={80}>0.3</MenuItem>
        <MenuItem value={90}>0.2</MenuItem>
        <MenuItem value={100}>0.1</MenuItem>
        <MenuItem value={110}>0.0</MenuItem>
      </Select>
    </FormControl>
  );
}

export default function EmployeeInfoFormDialog({ open, setOpen }) {
  const handleClose = () => {
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
          <Box sx={{ height: 20 }} />
          <Stack spacing={3}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="名前"
              type="text"
              fullWidth
              variant="standard"
            />
            <GradeSelect />
            <PersonMonthSelect />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleClose}>保存する</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
