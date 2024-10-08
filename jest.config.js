module.exports = {
  moduleFileExtensions: ["js", "json", "node"],
  rootDir: ".",
  testMatch: ["**/tests/*.spec.js"],
  collectCoverageFrom: [
    "./src/**/controllers/*.js",
    "./src/**/services/*.js",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/tests/**",
    "!**/config/**",  // Exclude configuration files
    "!**/index.js",    // Exclude index files if they're just exports
    "!**/app.js"
  ],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "test"
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  forceExit: true,
  detectOpenHandles: true,
  verbose: true,
  reporters: [
    "default",
    ['jest-html-reporter', {
      pageTitle: 'Test Report',
      outputPath: './test-report.html',
      includeFailureMsg: true,
      includeConsoleLog: true,
      includeCoverageReport: true,
      coverageReportPath: "./coverage/lcov-report/index.html"
    }]
  ],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover", "html"],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  testResultsProcessor: 'jest-sonar-reporter'
};