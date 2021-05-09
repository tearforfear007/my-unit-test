// from 2.4.3 p36
export class LogAnalyzer {
  isValidLogFileName(fileName: string) {
    if (!fileName.toLocaleUpperCase().endsWith(".SLF")) {
      return false;
    }
    return true;
  }
}