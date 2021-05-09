import { LogAnalyzer } from '../../src/2.4.3/log-analyzer';
describe("2.5 LogAnalyzer", () => {
  const testCases = [
    "myFileName.SLF",
    "myFileName.slf"
  ];

  it('IsValidLogFileName_ValidExtensions_ReturnsTrue', () => {
    const analyzer = new LogAnalyzer();
    for (const fileName of testCases) {
      const result = analyzer.isValidLogFileName(fileName);
      expect(result).toBeTruthy();
    }
  })
});