import type { Config } from "jest";

const config: Config = {
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "jsdom",
  testRegex: "/tests.ts$",
  moduleFileExtensions: ["ts", "js"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: ["text", "html", "json-summary"],
};

export default config;
