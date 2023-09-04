import { useEffect, useState } from "react";
import defaultDepartments from "./defaultDepartments";

// TODO: superjson を導入して Date 等の型にも対応する
// ref. https://github.com/blitz-js/superjson
//
// NOTE: 履歴をスタックで管理するなら localStorage ではなく IndexedDB を使った方が良いかも
export default function useDepartments() {
  const [departments, setDepartments] = useState(getDepartments());

  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  return [departments, setDepartments];
}

function getDepartments() {
  return JSON.parse(localStorage.getItem("departments")) || defaultDepartments;
}
