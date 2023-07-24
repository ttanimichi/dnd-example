import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Employee from "./Employee";
import Department from "./Department";

const defaultDepartments = [
  {
    id: 0,
    name: "株式会社イグザンプル",
    managers: new Set([]),
    memberSet: new Set([22]),
    children: [
      {
        id: 6,
        name: "管理本部",
        managers: new Set([23]),
        memberSet: new Set([16]),
        children: [
          {
            id: 1,
            name: "人事部",
            managers: new Set([24]),
            memberSet: new Set([1, 2, 3]),
            children: [
              {
                id: 2,
                name: "労務課",
                managers: new Set([25]),
                memberSet: new Set([7, 8]),
                children: [],
              },
              {
                id: 3,
                name: "採用課",
                managers: new Set([26]),
                memberSet: new Set([9, 10]),
                children: [],
              },
            ],
          },
          {
            id: 4,
            name: "総務部",
            managers: new Set([27]),
            memberSet: new Set([4, 13]),
            children: [],
          },
        ],
      },
      {
        id: 7,
        name: "営業本部",
        managers: new Set([28]),
        memberSet: new Set([14, 15]),
        children: [
          {
            id: 5,
            name: "営業第一部",
            managers: new Set([29]),
            memberSet: new Set([5, 6, 21]),
            children: [
              {
                id: 9,
                name: "法人営業課",
                managers: new Set([30]),
                memberSet: new Set([17, 18]),
                children: [],
              },
              {
                id: 10,
                name: "新規営業課",
                managers: new Set([31]),
                memberSet: new Set([19, 20]),
                children: [],
              },
            ],
          },
          {
            id: 8,
            name: "営業第二部",
            managers: new Set([32]),
            memberSet: new Set([11, 12]),
            children: [],
          },
        ],
      },
    ],
  },
];

const noDataFound = (
  <div style={{ paddingTop: 10, paddingBottom: 10 }}>データがありません</div>
);

export default function App() {
  const [departments, setDepartments] = useState(defaultDepartments);

  const employees = [
    "松山 望結 (グレードC, 人月1.0)",
    "木村 乃蒼 (グレードA, 人月0.6)",
    "奥田 光雄 (グレードD, 人月1.0)",
    "徳田 泰人 (グレードB, 人月0.8)",
    "浅野 和聖 (グレードC, 人月0.8)",
    "黒木 波映 (グレードB, 人月1.0)",
    "田中 彩花(グレードA, 人月1.0)",
    "鈴木 由美(グレードB, 人月0.9)",
    "山田 裕二(グレードC, 人月0.8)",
    "佐藤 英二(グレードA, 人月0.8)",
    "小林 瑠衣(グレードC, 人月0.8)",
    "高橋 一郎(グレードB, 人月0.8)",
    "伊藤 二郎(グレードC, 人月0.8)",
    "山本 三郎(グレードA, 人月0.8)",
    "中村 四郎(グレードB, 人月0.8)",
    "小川 五郎(グレードC, 人月0.8)",
    "加藤 結衣(グレードA, 人月0.8)",
    "吉田 美咲(グレードB, 人月0.8)",
    "山口 美保(グレードC, 人月0.8)",
    "松本 健太(グレードA, 人月0.8)",
    "山田 太郎(グレードB, 人月0.8)",
    "藤原 拓哉(グレードC, 人月0.8)",
    "鈴木 一郎(グレードA, 人月0.8)",
    "高橋 二郎(グレードB, 人月0.8)",
    "田中 三郎(グレードC, 人月0.8)",
    "伊藤 四郎(グレードA, 人月0.8)",
    "渡辺 五郎(グレードB, 人月0.8)",
    "山本 結衣(グレードC, 人月0.8)",
    "中村 美咲(グレードA, 人月0.8)",
    "小川 美保(グレードB, 人月0.8)",
    "加藤 健太(グレードC, 人月0.8)",
    "吉田 太郎(グレードA, 人月0.8)",
  ].map((name, index) => (
    <Employee key={index + 1} id={index + 1} name={name} />
  ));

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ marginLeft: 20 }}>{departments.map(renderDepartment)}</div>
      <div style={{ height: 100 }}></div>
    </DndContext>
  );

  function renderDepartment(department) {
    const deptMembers =
      department.memberSet.size > 0
        ? [...department.memberSet].map((id) => employees[id - 1])
        : noDataFound;

    const deptManagers =
      department.managers.size > 0
        ? [...department.managers].map((id) => employees[id - 1])
        : noDataFound;

    return (
      <div
        key={department.id}
        style={{ display: "flex", alignItems: "flex-start" }}
      >
        <Department
          id={department.id}
          deptName={department.name}
          managers={deptManagers}
          members={deptMembers}
        />
        <div>{department.children.map(renderDepartment)}</div>
      </div>
    );
  }

  function handleDragEnd(event) {
    const { over, active } = event;

    const activeId = parseInt(active.id.match(/\d+/)[0], 10);
    setDepartments((prevDepartments) => {
      const newDepartments = structuredClone(prevDepartments);
      removeMember(newDepartments, activeId);
      addMember(newDepartments, over.id, activeId);
      return newDepartments;
    });
  }
}

function removeMember(depts, memberId) {
  depts.forEach((dept) => {
    dept.managers.delete(memberId);
    dept.memberSet.delete(memberId);
    removeMember(dept.children, memberId);
  });
}

function addMember(depts, overId, memberId) {
  if (typeof overId !== "string" || !overId.includes("-")) return;

  const type = overId.split("-")[0];
  const deptId = overId.split("-")[1];

  depts.forEach((dept) => {
    if (dept.id === parseInt(deptId, 10)) {
      if (type === "managers") {
        dept.managers.add(memberId);
      } else {
        dept.memberSet.add(memberId);
      }
    } else if (dept.children.length > 0) {
      addMember(dept.children, overId, memberId);
    }
  });
}
