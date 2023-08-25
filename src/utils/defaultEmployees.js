import { faker } from "@faker-js/faker/locale/ja";

const defaultEmployees = [...Array(32)].map((name, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  grade: "グレードE",
  personMonth: "1.0",
}));

export default defaultEmployees;
