import { faker } from "@faker-js/faker/locale/ja";

export function createEmployee({
  id = crypto.randomUUID(),
  name = "新入社員",
  grade = "グレードE",
  personMonth = "1.0",
  avatar = "/avatar.png",
  employmentType = null,
}) {
  return {
    id,
    name,
    grade,
    personMonth,
    avatar,
    employmentType,
  };
}

export function createEmployees(num) {
  return [...Array(num)].map(() =>
    createEmployee({
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    })
  );
}
