import { LogAnalyzer } from '../../src/2.4.3/log-analyzer';
describe("2.6.1 LogAnalyzer", () => {

  let analyzer: LogAnalyzer;

  // 等同於 setup
  beforeEach(() => {
    analyzer = new LogAnalyzer();
  });

  // 等同於 teardown
  afterEach(() => {
    // 這個寫法 null as any 只是為了要繞過 typescript 的 type檢查，平常不會用到
    analyzer = null as any;
  });

  it('IsValidLogFileName_validFileLowerCased_ReturnsTrue', () => {
    const result = analyzer.isValidLogFileName("whatever.slf");
    expect(result).toBeTruthy();
  })

  it('IsValidLogFileName_validFileUpperCased_ReturnsTrue', () => {
    const result = analyzer.isValidLogFileName("whatever.SLF");
    expect(result).toBeTruthy();
  })

});