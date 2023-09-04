import { useContext } from "react";
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
import initialDepartments from "../utils/initialDepartments";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";

export default function Header({ departments }) {
  const setDepartments = useContext(SetDepartmentsContext);

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
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (readerEvent) => {
        const content = readerEvent.target.result;
        setDepartments(JSON.parse(content));
      };
    };
    input.click();
  };

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100vw" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ドラッグ＆ドロップできる組織図
          </Typography>
          <Stack spacing={2} direction="row">
            <Button color="inherit" variant="outlined" startIcon={<UndoIcon />}>
              戻る
            </Button>
            <Button color="inherit" variant="outlined" startIcon={<RedoIcon />}>
              進む
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
            >
              エクスポート
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
              startIcon={<FactoryIcon />}
              onClick={() => {
                setDepartments(initialDepartments);
              }}
            >
              初期状態にリセット
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
            >
              買い物かご
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
