import { useEffect, useState } from "react";
import initialDepartments from "./initialDepartments";

// TODO: superjson を導入して Date 等の型にも対応する
// ref. https://github.com/blitz-js/superjson
export default function useDepartments() {
  const [departments, _setDepartments] = useState([]);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

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

  const setDepartments = (func) => {
    const newDepartments = func(departments);
    _setDepartments(newDepartments);
    setPast((prevPast) => [...prevPast, newDepartments]);
    setFuture([]);
  };

  const undo = () => {
    if (past.length > 1) {
      _setDepartments(past[past.length - 2]);
      setFuture((prevFuture) => [...prevFuture, past[past.length - 1]]);
      setPast((prevPast) => prevPast.slice(0, prevPast.length - 1));
    }
  };

  const redo = () => {
    if (future.length > 0) {
      _setDepartments(future[future.length - 1]);
      setPast((prevPast) => [...prevPast, future[future.length - 1]]);
      setFuture((prevFuture) => prevFuture.slice(0, prevFuture.length - 1));
    }
  };

  return [departments, setDepartments, undo, redo];
}

function getDepartments() {
  return JSON.parse(localStorage.getItem("departments")) || initialDepartments;
}
