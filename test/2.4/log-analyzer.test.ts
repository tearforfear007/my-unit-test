import { LogAnalyzer } from '../../src/2.4/log-analyzer';
describe("2.4 LogAnalyzer", () => {
  it("IsValidFileName_BadExtension_ReturnsFalse", () => {
    const analyzer: LogAnalyzer = new LogAnalyzer();
    const result: boolean = analyzer.isValidLogFileName("filewithbadextension.foo");
    expect(result).toBeFalsy();
  });
});