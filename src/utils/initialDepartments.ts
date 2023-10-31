/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import updateLevel from "./updateLevel";
import { createEmployees } from "./createEmployees";
import { DepartmentProps } from "../components/Department";

// NOTE: ネストしたオブジェクトを動的に組み立てるために意図的に any を使用している
const depts: any[] = [
  {
    name: "株式会社イグザンプル",
    managers: [],
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

function build(depts: any[]) {
  const buildDepartments = (depts: any[]) => {
    depts.forEach((dept) => {
      dept.id = crypto.randomUUID();
      dept.managers = createEmployees(1);
      dept.members = createEmployees(2);
      dept.collapse = false;
      dept.isVisible = false;
      dept.level = -1;

      if (dept.branches && dept.branches.length > 0) {
       buildDepartments(dept.branches as any[]);
      }
    });
  }

  buildDepartments(depts);

  const initialDepts = depts as DepartmentProps[];
  updateLevel(initialDepts);

  return initialDepts;
}

const initialDepartments = build(depts);

export default initialDepartments;
