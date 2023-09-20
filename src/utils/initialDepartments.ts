import updateLevel from "./updateLevel";
import { createEmployees } from "./createEmployees";
import { EmployeeProps } from "../components/Employee";

const initialDepartments = [
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

type Dept = {
  name: string;
  branches: Dept[];
  id?: string;
  managers?: EmployeeProps[];
  members?: EmployeeProps[];
};

function buildDepartments(depts: Dept[]) {
  depts.forEach((dept) => {
    dept.id = crypto.randomUUID();
    dept.managers = createEmployees(1);
    dept.members = createEmployees(2);

    if (dept.branches && dept.branches.length > 0) {
      buildDepartments(dept.branches);
    }
  });
}

buildDepartments(initialDepartments);

// The top level department doesn't have managers
initialDepartments[0].managers = [];

updateLevel(initialDepartments);

export default initialDepartments;
