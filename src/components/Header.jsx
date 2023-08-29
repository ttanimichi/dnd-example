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

export default function Header() {
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
              startIcon={<FactoryIcon />}
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
