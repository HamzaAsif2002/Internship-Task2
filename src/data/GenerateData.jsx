import { faker } from "@faker-js/faker";

// Cache variable (so data is generated only once)
let cachedData = null;

export const GenerateData = () => {
  if (!cachedData) {
    cachedData = Array.from({ length: 100 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      country: faker.location.country(),
      gender: faker.person.sexType(),
    }));
  }
  return cachedData;
};
