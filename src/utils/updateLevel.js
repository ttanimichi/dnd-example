export default function updateLevel(depts, level = 0) {
  return depts.map((dept) => {
    dept.level = level;
    if (dept.children && dept.children.length > 0) {
      dept.children = updateLevel(dept.children, level + 1);
    }
    return dept;
  });
}
