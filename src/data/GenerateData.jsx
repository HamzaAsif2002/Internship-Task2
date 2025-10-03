import { faker } from "@faker-js/faker";

// Cache variable (so data is generated only once)
let cachedData = null;

export const GenerateData = (count = 100) => {
  if (!cachedData) {
    const activityLevels = ["Low", "Medium", "High"];
    const preferences = ["Sports", "Music", "Tech", "Travel", "Food", "Movies"];

    cachedData = Array.from({ length: count }).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 70 }),
      gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
      country: faker.location.country(),
      activityLevel: faker.helpers.arrayElement(activityLevels),
      preference: faker.helpers.arrayElement(preferences),
      lastActiveDays: faker.number.int({ min: 0, max: 60 }),
    }));
  }
  return cachedData;
};
