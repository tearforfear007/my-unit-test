class LogAnalyzer {
  private manager: IExtensionManager;
  constructor(mgr: IExtensionManager) {
    this.manager = mgr;
  }
  isValidLogFileName(fileName: string) {
    return this.manager.isValid(fileName);
  }
}

interface IExtensionManager {
  isValid(fileName: string): boolean;
}

describe(("3.4.3 LogAnalyzer"), () => {
  it('IsValidFileName_NameSupportedExtension_ReturnsTrue', () => {
    const myFakeManager: FakeExtensionManager = new FakeExtensionManager();
    myFakeManager.willBeValid = true;
    const log: LogAnalyzer = new LogAnalyzer(myFakeManager);
    const result: boolean = log.isValidLogFileName("short.ext");
    expect(result).toBeTruthy();
  })
})

class FakeExtensionManager implements IExtensionManager {
  willBeValid = false;
  isValid(fileName: string): boolean {
    return this.willBeValid;
  }
}