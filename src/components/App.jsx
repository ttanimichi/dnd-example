import { useState } from "react";

import TargetContext from "../utils/TargetContext";
import SetTargetContext from "../utils/setTargetContext";
import SetEmployeesContext from "../utils/SetEmployeesContext";
import SetDepartmentsContext from "../utils/SetDepartmentsContext";
import Header from "./Header";
import OrganizationChart from "./OrganizationChart";
import updateLevel from "../utils/updateLevel";

const defaultDepartments = [
  {
    id: 0,
    name: "株式会社イグザンプル",
    managers: new Set([]),
    memberSet: new Set([22]),
    children: [
      {
        id: 6,
        name: "管理",
        managers: new Set([23]),
        memberSet: new Set([16]),
        children: [
          {
            id: 1,
            name: "人事",
            managers: new Set([24]),
            memberSet: new Set([1, 2, 3]),
            children: [
              {
                id: 2,
                name: "労務",
                managers: new Set([25]),
                memberSet: new Set([7, 8]),
                children: [],
              },
              {
                id: 3,
                name: "採用",
                managers: new Set([26]),
                memberSet: new Set([9, 10]),
                children: [],
              },
            ],
          },
          {
            id: 4,
            name: "総務",
            managers: new Set([27]),
            memberSet: new Set([4, 13]),
            children: [],
          },
        ],
      },
      {
        id: 7,
        name: "営業",
        managers: new Set([28]),
        memberSet: new Set([14, 15]),
        children: [
          {
            id: 5,
            name: "営業第一",
            managers: new Set([29]),
            memberSet: new Set([5, 6, 21]),
            children: [
              {
                id: 9,
                name: "法人営業",
                managers: new Set([30]),
                memberSet: new Set([17, 18]),
                children: [],
              },
              {
                id: 10,
                name: "新規営業",
                managers: new Set([31]),
                memberSet: new Set([19, 20]),
                children: [],
              },
            ],
          },
          {
            id: 8,
            name: "営業第二",
            managers: new Set([32]),
            memberSet: new Set([11, 12]),
            children: [],
          },
        ],
      },
    ],
  },
];

const defaultEmployees = [
  "松山 望結",
  "木村 乃蒼",
  "奥田 光雄",
  "徳田 泰人",
  "浅野 和聖",
  "黒木 波映",
  "田中 彩花",
  "鈴木 由美",
  "山田 裕二",
  "佐藤 英二",
  "小林 瑠衣",
  "高橋 一郎",
  "伊藤 二郎",
  "山本 三郎",
  "中村 四郎",
  "小川 五郎",
  "加藤 結衣",
  "吉田 美咲",
  "山口 美保",
  "松本 健太",
  "山田 太郎",
  "藤原 拓哉",
  "鈴木 一郎",
  "高橋 二郎",
  "田中 三郎",
  "伊藤 四郎",
  "渡辺 五郎",
  "山本 結衣",
  "中村 美咲",
  "小川 美保",
  "加藤 健太",
  "吉田 太郎",
].map((name, index) => ({
  id: index + 1,
  name,
  grade: "グレードE",
  personMonth: "1.0",
}));

export default function App() {
  const [departments, setDepartments] = useState(
    updateLevel(defaultDepartments)
  );
  const [employees, setEmployees] = useState(defaultEmployees);
  const [target, setTarget] = useState(null);

  return (
    <>
      <TargetContext.Provider value={target}>
        <SetTargetContext.Provider value={setTarget}>
          <SetEmployeesContext.Provider value={setEmployees}>
            <SetDepartmentsContext.Provider value={setDepartments}>
              <Header />
              <OrganizationChart
                departments={departments}
                employees={employees}
              />
            </SetDepartmentsContext.Provider>
          </SetEmployeesContext.Provider>
        </SetTargetContext.Provider>
      </TargetContext.Provider>
    </>
  );
}
