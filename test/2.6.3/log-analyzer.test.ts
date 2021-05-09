import { LogAnalyzer } from '../../src/2.6.2/log-analyzer';
describe("2.6.3 LogAnalyzer", () => {

  let analyzer: LogAnalyzer;

  beforeEach(() => {
    analyzer = new LogAnalyzer();
  });

  // use xit()
  xit('use xit() Ignore Test : IsValidLogFileName', () => {
    const result = analyzer.isValidLogFileName("whatever.SLF");
    expect(result).toBeTruthy();
  })

  // or use test.skip()
  test.skip('use test.skip() Ignore Test : IsValidLogFileName', () => {
    const result = analyzer.isValidLogFileName("whatever.SLF");
    expect(result).toBeTruthy();
  })

});


