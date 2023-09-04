import { useState } from "react";

import Header from "./Header";
import OrganizationChart from "./OrganizationChart";

import TargetContext from "../utils/TargetContext";
import SetTargetContext from "../utils/setTargetContext";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import defaultDepartments from "../utils/defaultDepartments";

export default function App() {
  const [departments, setDepartments] = useState(defaultDepartments);
  const [target, setTarget] = useState(null);

  return (
    <TargetContext.Provider value={target}>
      <SetTargetContext.Provider value={setTarget}>
        <SetDepartmentsContext.Provider value={setDepartments}>
          <Header />
          <OrganizationChart departments={departments} />
        </SetDepartmentsContext.Provider>
      </SetTargetContext.Provider>
    </TargetContext.Provider>
  );
}
