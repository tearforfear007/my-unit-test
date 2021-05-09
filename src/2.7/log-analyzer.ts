// from 2.7 pg50
export class LogAnalyzer {
  
  wasLastFileNameValid: boolean = false;

  isValidLogFileName(fileName: string) {
    this.wasLastFileNameValid = false; // 改變系統狀態
    if (!fileName) {
      throw new Error("fileName has to be provided");
    }
    if (!fileName.toUpperCase().endsWith(".SLF")) {
      return false;
    }
    this.wasLastFileNameValid = true; // 改變系統狀態
    return true;
  }
}