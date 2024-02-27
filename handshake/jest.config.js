/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.json",
      },
    ],
  },
  testEnvironment: "node",
  // verbose: true,
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
};
