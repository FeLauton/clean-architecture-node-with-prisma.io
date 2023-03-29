module.exports = {
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "tests/(.*)": "<rootDir>/tests/$1",
    "src/(.*)": "<rootDir>/src/$1",
    "data/(.*)": "<rootDir>/src/data/$1",
    "domain/(.*)": "<rootDir>/src/domain/$1",
    "infra/(.*)": "<rootDir>/src/infra/$1",
    "main/(.*)": "<rootDir>/src/main/$1",
    "presentation/(.*)": "<rootDir>/src/presentation/$1",
    "validation/(.*)": "<rootDir>/src/validation/$1",
  },
};
