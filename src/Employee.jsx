import { Draggable } from "./Draggable";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EmployeeMenu from "./EmployeeMenu";

export default function Employee({ id, name }) {
  return (
    <div key={id} style={{ paddingBottom: 10 }}>
      <Draggable id={`drag-employee-${id}`} data={{ type: "employee" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid grey",
          }}
        >
          <img src={`/face/${id}.png`} alt="" width="64" />
          <span style={{ width: 10 }} />
          <Stack spacing={1} style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold" }}>{name}</div>
            <Stack direction="row" spacing={1}>
              <Chip label="グレードE" size="small" />
              <Chip label="人月0.8" size="small" />
            </Stack>
          </Stack>
          <span style={{ width: 10 }} />
          <EmployeeMenu />
          <span style={{ width: 10 }} />
        </div>
      </Draggable>
    </div>
  );
}
