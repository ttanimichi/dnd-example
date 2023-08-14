import { useState } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import Employee from "./Employee";
import Department from "./Department";
import TargetContext from "./TargetContext";
import SetTargetContext from "./setTargetContext";

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

function updateLevel(depts, level = 0) {
  return depts.map((dept) => {
    dept.level = level;
    if (dept.children && dept.children.length > 0) {
      dept.children = updateLevel(dept.children, level + 1);
    }
    return dept;
  });
}

const noDataFound = (
  <div style={{ paddingTop: 10, paddingBottom: 10 }}>データがありません</div>
);

export default function App() {
  const [departments, setDepartments] = useState(
    updateLevel(defaultDepartments)
  );
  const [target, setTarget] = useState(null);

  const employees = [
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
  ].map((name, index) => (
    <Employee key={index + 1} id={index + 1} name={name} />
  ));

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } })
  );

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <TargetContext.Provider value={target}>
        <SetTargetContext.Provider value={setTarget}>
          <div style={{ marginLeft: 20 }}>
            {departments.map(renderDepartment)}
          </div>
          <div style={{ height: 100 }}></div>
        </SetTargetContext.Provider>
      </TargetContext.Provider>
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
          level={department.level}
          managers={deptManagers}
          members={deptMembers}
        />
        <div>{department.children.map(renderDepartment)}</div>
      </div>
    );
  }

  function handleDragStart(event) {
    const { active } = event;

    if (!active) return;
    setTarget(active.data.current.type);
  }

  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over || !active) return;

    const activeId = parseInt(active.id.match(/\d+/)[0], 10);
    const overId = parseInt(over.id.match(/\d+/)[0], 10);

    setDepartments((prevDepartments) => {
      const newDepartments = structuredClone(prevDepartments);
      if (target === "employee") {
        removeMember(newDepartments, activeId);
        addMember(newDepartments, over.id, activeId);
      } else if (target === "dept") {
        // 循環参照を防止
        if (!isDescendant(newDepartments, activeId, overId)) {
          const removed = removeById(newDepartments, activeId);
          addToChildrenById(newDepartments, overId, removed);
          updateLevel(newDepartments);
        }
      }
      return newDepartments;
    });
  }
}

function isDescendant(depts, parentId, childId) {
  const subTree = removeById(structuredClone(depts), parentId);
  return isDescendantSubTree(subTree, childId);
}

function isDescendantSubTree(subTree, childId) {
  if (subTree.id === childId) {
    return true;
  }

  if (subTree.children && subTree.children.length > 0) {
    for (let i = 0; i < subTree.children.length; i++) {
      if (isDescendantSubTree(subTree.children[i], childId)) {
        return true;
      }
    }
  }

  return false;
}

function removeById(depts, idToRemove) {
  for (let i = 0; i < depts.length; i++) {
    if (depts[i].id === idToRemove) {
      const removed = depts.splice(i, 1);
      return removed[0];
    }

    if (depts[i].children && depts[i].children.length > 0) {
      const removed = removeById(depts[i].children, idToRemove);
      if (removed) {
        return removed;
      }
    }
  }
}

function addToChildrenById(depts, id, value) {
  for (let i = 0; i < depts.length; i++) {
    if (depts[i].id === id) {
      depts[i].children.push(value);
      return;
    }

    if (depts[i].children && depts[i].children.length > 0) {
      addToChildrenById(depts[i].children, id, value);
    }
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
