// from 2.3.2 p30
// 讓 if 判斷少了 ！運算子，就可以變成一個有bug的程式，讓test出錯
export class LogAnalyzer {
  isValidLogFileName(fileName: string) {
    if (!fileName.endsWith(".SLF")) {
      return false;
    }
    return true;
  }
}