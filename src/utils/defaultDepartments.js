import updateLevel from "./updateLevel";
import { createEmployees } from "./createEmployees";

const defaultDepartments = [
  {
    name: "株式会社イグザンプル",
    branches: [
      {
        name: "管理",
        branches: [
          {
            name: "人事",
            branches: [
              {
                name: "労務",
                branches: [],
              },
              {
                name: "採用",
                branches: [],
              },
            ],
          },
          {
            name: "総務",
            branches: [
              {
                name: "庶務",
                branches: [],
              },
            ],
          },
        ],
      },
      {
        name: "営業",
        branches: [
          {
            name: "営業第一",
            branches: [
              {
                name: "法人営業",
                branches: [],
              },
              {
                name: "新規営業",
                branches: [],
              },
            ],
          },
          {
            name: "営業第二",
            branches: [
              {
                name: "企画営業",
                branches: [],
              },
              {
                name: "販売推進",
                branches: [],
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

    if (dept.branches && dept.branches.length > 0) {
      buildDepartments(dept.branches);
    }
  });
}

buildDepartments(defaultDepartments);

// The top level department doesn't have managers
defaultDepartments[0].managers = [];

updateLevel(defaultDepartments);

export default defaultDepartments;
