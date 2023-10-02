import { createContext } from "react";
import { SetDepartmentsType } from "./useDepartments";

const SetDepartmentsContext = createContext<SetDepartmentsType | null>(null);

export default SetDepartmentsContext;
