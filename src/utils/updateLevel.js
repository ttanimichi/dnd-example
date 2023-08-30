export default function updateLevel(depts, level = 0) {
  return depts.map((dept) => {
    dept.level = level;
    if (dept.branches && dept.branches.length > 0) {
      dept.branches = updateLevel(dept.branches, level + 1);
    }
    return dept;
  });
}
