import updateLevel from "./updateLevel";
import { createEmployees } from "./createEmployees";

const defaultDepartments = [
  {
    name: "株式会社イグザンプル",
    children: [
      {
        name: "管理",
        children: [
          {
            name: "人事",
            children: [
              {
                name: "労務",
                children: [],
              },
              {
                name: "採用",
                children: [],
              },
            ],
          },
          {
            name: "総務",
            children: [
              {
                name: "庶務",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "営業",
        children: [
          {
            name: "営業第一",
            children: [
              {
                name: "法人営業",
                children: [],
              },
              {
                name: "新規営業",
                children: [],
              },
            ],
          },
          {
            name: "営業第二",
            children: [
              {
                name: "企画営業",
                children: [],
              },
              {
                name: "販売推進",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

function buildDepartments(depts) {
  depts.forEach((dept) => {
    dept.id = crypto.randomUUID();
    dept.managers = createEmployees(1);
    dept.members = createEmployees(2);

    if (dept.children && dept.children.length > 0) {
      buildDepartments(dept.children);
    }
  });
}

buildDepartments(defaultDepartments);

// The top level department doesn't have managers
defaultDepartments[0].managers = [];

updateLevel(defaultDepartments);

export default defaultDepartments;
