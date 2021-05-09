import { LogAnalyzer } from '../../src/2.7/log-analyzer';
describe("2.7 LogAnalyzer", () => {

  let analyzer: LogAnalyzer;

  beforeEach(() => {
    analyzer = new LogAnalyzer();
  });

  const testCases = [
    { testId: 1, fileName: "badfile.foo", expectedValue: false },
    { testId: 2, fileName: "goodfile.slf", expectedValue: true }
  ];

  for (const { testId, fileName, expectedValue } of testCases) {
    it(`IsValidLogFileName_WhenCalled_ChangesWasLastFileNameValid:${testId},fileName:${fileName},expect:${expectedValue}`, () => {
      analyzer.isValidLogFileName(fileName);
      expect(analyzer.wasLastFileNameValid).toBe(expectedValue);
    })
  }
});


