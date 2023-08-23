import { useState } from "react";

import Header from "./Header";
import OrganizationChart from "./OrganizationChart";

import TargetContext from "../utils/TargetContext";
import SetTargetContext from "../utils/setTargetContext";
import SetEmployeesContext from "../utils/SetEmployeesContext";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import defaultDepartments from "../utils/defaultDepartments";
import defaultEmployees from "../utils/defaultEmployees";

export default function App() {
  const [departments, setDepartments] = useState(defaultDepartments);
  const [employees, setEmployees] = useState(defaultEmployees);
  const [target, setTarget] = useState(null);

  return (
    <TargetContext.Provider value={target}>
      <SetTargetContext.Provider value={setTarget}>
        <SetEmployeesContext.Provider value={setEmployees}>
          <SetDepartmentsContext.Provider value={setDepartments}>
            <Header />
            <OrganizationChart
              departments={departments}
              employees={employees}
            />
          </SetDepartmentsContext.Provider>
        </SetEmployeesContext.Provider>
      </SetTargetContext.Provider>
    </TargetContext.Provider>
  );
}
