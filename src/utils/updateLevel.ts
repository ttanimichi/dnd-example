import { DepartmentProps } from "../components/Department";

export default function updateLevel(
  depts: DepartmentProps[],
  level: number = 0
): DepartmentProps[] {
  return depts.map((dept: DepartmentProps) => {
    dept.level = level;
    if (dept.branches && dept.branches.length > 0) {
      dept.branches = updateLevel(dept.branches, level + 1);
    }
    return dept;
  });
}
