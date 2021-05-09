// from 2.6.2 pg45
export class LogAnalyzer {
  isValidLogFileName(fileName: string) {
    if (!fileName) {
      throw new Error("fileName has to be provided");
    }
    if (!fileName.toUpperCase().endsWith(".SLF")) {
      return false;
    }
    return true;
  }
}