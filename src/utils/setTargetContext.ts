import { createContext, Dispatch, SetStateAction } from "react";

export type SetTargetStateType = Dispatch<SetStateAction<string | null>> | null;
const SetTargetContext = createContext<SetTargetStateType>(null);

export default SetTargetContext;
