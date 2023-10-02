import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { DepartmentProps } from "./Department";
// import initialDepartments from "../utils/initialDepartments";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  departments: DepartmentProps[];
}

const ShoppingCartDialog: FC<Props> = ({ open, setOpen, departments }) => {
  // const departmentNames = buildDepartmentNames(departments);
  // const initialDepartmentNames = buildDepartmentNames(initialDepartments);

  // NOTE: コンパイルエラーにならないよう一時的に参照させている仮実装
  departments;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>買い物かご</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            「買い物かご」には、現時点での組織図からの変更点の一覧が表示されます。変更点の一覧は以下の通りです。
          </DialogContentText>
          <Box sx={{ height: 10 }} />
          <div>
            <h3>新設の部署</h3>
            <ul>
              <li>新規営業チーム</li>
              <li>人事ユニット</li>
            </ul>
          </div>
          <div>
            <h3>廃止する部署</h3>
            <ul>
              <li>新規営業チーム</li>
              <li>人事ユニット</li>
            </ul>
          </div>
          <div>
            <h3>部署名の変更</h3>
            <ul>
              <li>新規営業チーム → 第二営業チーム</li>
              <li>人事ユニット → 労務ユニット</li>
            </ul>
          </div>
          <div>
            <h3>配置が変更された部署</h3>
            <ul>
              <li>新規営業チーム（第一営業ユニット → 第三営業ユニット）</li>
              <li>人事ユニット（経営管理グループ → 開発グループ）</li>
            </ul>
          </div>
          <div>
            <h3>新入社員</h3>
            <ul>
              <li>山田 太郎（中途採用）</li>
              <li>佐藤 一郎（障害者採用）</li>
            </ul>
          </div>
          <div>
            <h3>退職</h3>
            <ul>
              <li>山田 太郎</li>
              <li>佐藤 一郎</li>
            </ul>
          </div>
          <div>
            <h3>休職</h3>
            <ul>
              <li>山田 太郎</li>
              <li>佐藤 一郎</li>
            </ul>
          </div>
          <div>
            <h3>昇格・降格</h3>
            <ul>
              <li>山田 太郎（グレードB → グレードA）</li>
              <li>佐藤 一郎（グレードC → グレードD）</li>
            </ul>
          </div>
          <div>
            <h3>人月の変更</h3>
            <ul>
              <li>山田 太郎（1.0 → 0.8）</li>
              <li>佐藤 一郎（0.6 → 0.8）</li>
            </ul>
          </div>
          <div>
            <h3>異動</h3>
            <ul>
              <li>新規営業チーム（第一営業ユニット → 第三営業ユニット）</li>
              <li>人事ユニット（経営管理グループ → 開発グループ）</li>
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
          {/* <Button onClick={handleClose}>保存する</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShoppingCartDialog;
