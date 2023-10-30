import { FC, useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FactoryIcon from "@mui/icons-material/Factory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stack from "@mui/material/Stack";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ShoppingCartDialog from "./ShoppingCartDialog";
import { DepartmentProps } from "./Department";

interface Props {
  departments: DepartmentProps[];
  undo: () => void;
  redo: () => void;
}

const Header: FC<Props> = ({ departments, undo, redo }) => {
  const [shoppingCartDialogOpen, setShoppingCartDialogOpen] = useState(false);
  const setDepartments = useContext(SetDepartmentsContext);
  if (setDepartments === null) return null;

  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(departments, null, 4));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "state.txt");
    dlAnchorElem.click();
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files === null) return;
      const reader = new FileReader();
      reader.readAsText(files[0], "UTF-8");
      reader.onload = (readerEvent) => {
        const target = readerEvent.target;
        if (target === null) return;
        const content = target.result;
        const depts = JSON.parse(content as string) as DepartmentProps[];
        setDepartments(() => depts);
      };
    };
    input.click();
  };

  // TODO: 再帰処理を関数間で共通化する
  const changeCollapse = (departments: DepartmentProps[], flag: boolean) => {
    departments.forEach((d) => {
      d.collapse = flag;
      if (d.branches.length > 0) {
        changeCollapse(d.branches, flag);
      }
    });
  };

  const handleCollapse = () => {
    setDepartments((prev) => {
      const newDepartments = structuredClone(prev);
      changeCollapse(newDepartments, true);
      return newDepartments;
    });
  };

  const handleExpand = () => {
    setDepartments((prev) => {
      const newDepartments = structuredClone(prev);
      changeCollapse(newDepartments, false);
      return newDepartments;
    });
  };

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100vw" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ドラッグ＆ドロップできる組織図
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<UndoIcon />}
              onClick={undo}
            >
              戻る
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<RedoIcon />}
              onClick={redo}
            >
              進む
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
            >
              出力
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={handleImport}
            >
              インポート
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<UnfoldLessIcon />}
              onClick={handleCollapse}
            >
              折り畳む
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<UnfoldMoreIcon />}
              onClick={handleExpand}
            >
              展開
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<FactoryIcon />}
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
            >
              初期化
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              onClick={() => {
                setShoppingCartDialogOpen(true);
              }}
            >
              買い物かご
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {shoppingCartDialogOpen && (
        <ShoppingCartDialog
          open={shoppingCartDialogOpen}
          setOpen={setShoppingCartDialogOpen}
          departments={departments}
        />
      )}
    </Box>
  );
};

export default Header;
