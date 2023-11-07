import { FC, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import { DepartmentProps } from "./Department";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  departments: DepartmentProps[];
}

function toggleVisible(group: DepartmentProps) {
  group.isVisible = !group.isVisible;
  group.branches.forEach((g) => {
    toggleVisible(g);
  });
}

const VisibleGroupsDialog: FC<Props> = ({ open, setOpen, departments }) => {
  const setDepartments = useContext(SetDepartmentsContext);
  if (setDepartments === null || departments.length === 0) return null;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        data-dndkit-disabled-dnd-flag="true"
      >
        <DialogTitle>グループ選択</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            表示するグループを選択してください（いくつでも選択できますが、表示される部署の数が多ければ多いほど画面の描画が重くなり処理速度が遅くなります）
          </DialogContentText>
          <Box sx={{ height: 10 }} />

          <div
            style={{ marginTop: 10, display: "flex", flexDirection: "column" }}
          >
            {departments[0].branches.map((group) => {
              return (
                <FormControlLabel
                  key={group.id}
                  control={
                    <Checkbox
                      checked={group.isVisible}
                      onChange={() => {
                        const newDepartments = structuredClone(departments);
                        const targetGroup = newDepartments[0].branches.find(
                          (g) => {
                            return g.id === group.id;
                          }
                        );
                        if (targetGroup === undefined) return;
                        toggleVisible(targetGroup);
                        setDepartments(() => newDepartments);
                      }}
                    />
                  }
                  label={group.name}
                />
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VisibleGroupsDialog;
