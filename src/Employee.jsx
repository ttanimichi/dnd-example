import { Draggable } from "./Draggable";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EmployeeMenu from "./EmployeeMenu";

export default function Employee(props) {
  const { id, name, grade, personMonth } = props;

  return (
    <div key={id} style={{ paddingBottom: 10, marginLeft: -100 }}>
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
              <Chip label={grade} size="small" />
              <Chip label={`人月${personMonth}`} size="small" />
            </Stack>
          </Stack>
          <span style={{ width: 10 }} />
          <EmployeeMenu employee={props} />
          <span style={{ width: 10 }} />
        </div>
      </Draggable>
    </div>
  );
}
