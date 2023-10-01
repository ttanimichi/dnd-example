import { useEffect, useState } from "react";
import initialDepartments from "./initialDepartments";
import { DepartmentProps } from "../components/Department";

// TODO: superjson を導入して Date 等の型にも対応する
// ref. https://github.com/blitz-js/superjson

type FuncType = (prev: DepartmentProps[]) => DepartmentProps[];
export type SetDepartmentsType = (func: FuncType) => void;

type Props = [DepartmentProps[], SetDepartmentsType, () => void, () => void];

export default function useDepartments(): Props {
  const [departments, _setDepartments] = useState<DepartmentProps[]>([]);
  const [past, setPast] = useState<DepartmentProps[][]>([]);
  const [future, setFuture] = useState<DepartmentProps[][]>([]);

  useEffect(() => {
    const init = getDepartments();
    _setDepartments(init);
    setPast([init]);
  }, []);

  useEffect(() => {
    if (departments.length > 0) {
      localStorage.setItem("departments", JSON.stringify(departments));
    }
  }, [departments]);

  const setDepartments = (func: FuncType) => {
    const newDepartments = func(departments);
    _setDepartments(newDepartments);
    setPast((prevPast) => [...prevPast, newDepartments]);
    setFuture([]);
  };

  const undo = (): void => {
    if (past.length > 1) {
      _setDepartments(past[past.length - 2]);
      setFuture((prevFuture) => [...prevFuture, past[past.length - 1]]);
      setPast((prevPast) => prevPast.slice(0, prevPast.length - 1));
    }
  };

  const redo = (): void => {
    if (future.length > 0) {
      _setDepartments(future[future.length - 1]);
      setPast((prevPast) => [...prevPast, future[future.length - 1]]);
      setFuture((prevFuture) => prevFuture.slice(0, prevFuture.length - 1));
    }
  };

  return [departments, setDepartments, undo, redo];
}

function getDepartments(): DepartmentProps[] {
  const departments = localStorage.getItem("departments");
  if (departments === null) return initialDepartments;
  return JSON.parse(departments) as DepartmentProps[];
}
