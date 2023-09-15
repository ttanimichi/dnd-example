import { createContext, Dispatch, SetStateAction } from "react";
import { DepartmentProps } from "../components/Department";

export type SetDepartmentsStateType = Dispatch<SetStateAction<DepartmentProps[]>> | null;
const SetDepartmentsContext = createContext<SetDepartmentsStateType>(null);

export default SetDepartmentsContext;
