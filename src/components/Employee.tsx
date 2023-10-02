import { FC } from "react";
import { Draggable } from "./Draggable";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EmployeeMenu from "./EmployeeMenu";

export interface EmployeeProps {
  id: string;
  name: string;
  grade: string;
  personMonth: string;
  avatar: string;
  secondaryRole?: boolean;
  isRetired?: boolean;
  isSuspended?: boolean;
  employmentType?: string;
}

const Employee: FC<EmployeeProps> = ({
  id,
  name,
  grade,
  personMonth,
  avatar,
  secondaryRole,
  isRetired,
  isSuspended,
}) => {
  const nameStyle =
    isRetired ?? isSuspended
      ? { textDecoration: "line-through" }
      : { fontWeight: "bold" };

  return (
    <div key={id} style={{ paddingBottom: 10 }}>
      <Draggable id={`drag-employee/${id}`} data={{ type: "employee" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid grey",
          }}
        >
          <img src={avatar} alt="" width="64" />
          <span style={{ width: 10 }} />
          <Stack spacing={1} style={{ flex: 1 }}>
            <div style={nameStyle}>{name}</div>
            <Stack direction="row" spacing={1}>
              <Chip label={grade} size="small" />
              {(() => {
                if (secondaryRole) {
                  return <Chip label="兼任" size="small" />;
                } else if (isSuspended) {
                  return <Chip label="休職中" size="small" />;
                } else if (isRetired) {
                  return <Chip label="退職済み" size="small" />;
                } else {
                  return <Chip label={`人月${personMonth}`} size="small" />;
                }
              })()}
            </Stack>
          </Stack>
          <span style={{ width: 10 }} />
          <EmployeeMenu
            employee={{
              id,
              name,
              grade,
              personMonth,
              avatar,
              secondaryRole,
              isRetired,
              isSuspended,
            }}
          />
          <span style={{ width: 10 }} />
        </div>
      </Draggable>
    </div>
  );
};

export default Employee;
