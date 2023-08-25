import updateLevel from "./updateLevel";

const defaultDepartments = [
  {
    id: 0,
    name: "株式会社イグザンプル",
    managers: new Set([]),
    members: new Set([22]),
    children: [
      {
        id: 6,
        name: "管理",
        managers: new Set([23]),
        members: new Set([16]),
        children: [
          {
            id: 1,
            name: "人事",
            managers: new Set([24]),
            members: new Set([1, 2, 3]),
            children: [
              {
                id: 2,
                name: "労務",
                managers: new Set([25]),
                members: new Set([7, 8]),
                children: [],
              },
              {
                id: 3,
                name: "採用",
                managers: new Set([26]),
                members: new Set([9, 10]),
                children: [],
              },
            ],
          },
          {
            id: 4,
            name: "総務",
            managers: new Set([27]),
            members: new Set([4, 13]),
            children: [],
          },
        ],
      },
      {
        id: 7,
        name: "営業",
        managers: new Set([28]),
        members: new Set([14, 15]),
        children: [
          {
            id: 5,
            name: "営業第一",
            managers: new Set([29]),
            members: new Set([5, 6, 21]),
            children: [
              {
                id: 9,
                name: "法人営業",
                managers: new Set([30]),
                members: new Set([17, 18]),
                children: [],
              },
              {
                id: 10,
                name: "新規営業",
                managers: new Set([31]),
                members: new Set([19, 20]),
                children: [],
              },
            ],
          },
          {
            id: 8,
            name: "営業第二",
            managers: new Set([32]),
            members: new Set([11, 12]),
            children: [],
          },
        ],
      },
    ],
  },
];

updateLevel(defaultDepartments);

export default defaultDepartments;
