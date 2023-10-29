import { useState } from "react";

import Header from "./Header";
import OrganizationChart from "./OrganizationChart";

import TargetContext from "../utils/TargetContext";
import SetTargetContext from "../utils/setTargetContext";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import useDepartments from "../utils/useDepartments";

export default function App() {
  const [departments, setDepartments, undo, redo] = useDepartments();
  const [target, setTarget] = useState<string>("employee");

  return (
    <TargetContext.Provider value={target}>
      <SetTargetContext.Provider value={setTarget}>
        <SetDepartmentsContext.Provider value={setDepartments}>
          <Header departments={departments} undo={undo} redo={redo} />
          <OrganizationChart departments={departments} />
        </SetDepartmentsContext.Provider>
      </SetTargetContext.Provider>
    </TargetContext.Provider>
  );
}
