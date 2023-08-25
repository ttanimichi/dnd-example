import updateLevel from "./updateLevel";

const defaultDepartments = [
  {
    id: 0,
    name: "株式会社イグザンプル",
    managers: [],
    members: [22],
    children: [
      {
        id: 6,
        name: "管理",
        managers: [23],
        members: [16],
        children: [
          {
            id: 1,
            name: "人事",
            managers: [24],
            members: [1, 2, 3],
            children: [
              {
                id: 2,
                name: "労務",
                managers: [25],
                members: [7, 8],
                children: [],
              },
              {
                id: 3,
                name: "採用",
                managers: [26],
                members: [9, 10],
                children: [],
              },
            ],
          },
          {
            id: 4,
            name: "総務",
            managers: [27],
            members: [4, 13],
            children: [],
          },
        ],
      },
      {
        id: 7,
        name: "営業",
        managers: [28],
        members: [14, 15],
        children: [
          {
            id: 5,
            name: "営業第一",
            managers: [29],
            members: [5, 6, 21],
            children: [
              {
                id: 9,
                name: "法人営業",
                managers: [30],
                members: [17, 18],
                children: [],
              },
              {
                id: 10,
                name: "新規営業",
                managers: [31],
                members: [19, 20],
                children: [],
              },
            ],
          },
          {
            id: 8,
            name: "営業第二",
            managers: [32],
            members: [11, 12],
            children: [],
          },
        ],
      },
    ],
  },
];

updateLevel(defaultDepartments);

export default defaultDepartments;
