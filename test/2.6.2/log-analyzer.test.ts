import { LogAnalyzer } from '../../src/2.6.2/log-analyzer';
describe("2.6.2 LogAnalyzer", () => {

  let analyzer: LogAnalyzer;

  beforeEach(() => {
    analyzer = new LogAnalyzer();
  });

  it('IsValidLogFileName_EmptyFileName_ThrowError', () => {
    // Note: You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
    expect(() => {
      analyzer.isValidLogFileName("")
    })
      .toThrow(new Error("fileName has to be provided"));
  })

});
