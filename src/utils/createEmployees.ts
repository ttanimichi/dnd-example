import { faker } from "@faker-js/faker/locale/ja";
import { EmployeeProps } from "../components/Employee";

export function createEmployee({
  id,
  name,
  grade,
  personMonth,
  avatar,
  employmentType,
}: Partial<EmployeeProps>): EmployeeProps {
  return {
    id: id ?? crypto.randomUUID(),
    name: name ?? "新入社員",
    grade: grade ?? "グレードE",
    personMonth: personMonth ?? "1.0",
    avatar: avatar ?? "/avatar.png",
    employmentType,
  };
}

export function createEmployees(num: number): EmployeeProps[] {
  return Array.from({ length: num }).map(() =>
    createEmployee({
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    })
  );
}
