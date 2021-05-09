# 單元測試的藝術
## 2.3.2 : pg30
```csharp
// C#
public class LogAnalyzer {
  public bool IsValidLogFileName(string fileName) {
    if(fileName.EndsWith(".SLF")){
      return false;
    }
    return true;
  }
}
```
```typescript
// typescript
export class LogAnalyzer {
  isValidLogFileName(fileName: string) {
    if (fileName.endsWith(".SLF")) {
      return false;
    }
    return true;
  }
}
```
---
## 2.4 : pg33
```csharp
// C#
[Test]
public void IsValidLogFileName_BadExtension_ReturnsFalse() {
  LogAnalyzer analyzer = new LogAnalyzer();
  bool result = analyzer.IsValidLogFileName("filewithbadextension.foo");
  Assert.false(result);
}
```
```typescript
// typescript
export class LogAnalyzer {
  isValidLogFileName(fileName: string) {
    if (fileName.endsWith(".SLF")) {
      return false;
    }
    return true;
  }
}
```
---
## 2.4.3 pg36
```csharp
// C#
[Test]
public void IsValidLogFileName_GoodExtensionLowercase_ReturnsTrue() {
  LogAnalyzer analyzer = new LogAnalyzer();
  bool result = analyzer.IsValidLogFileName("filewithgoodextension.slf");
  Assert.True(result);
}

[Test]
public void IsValidLogFileName_GoodExtensionUppercase_ReturnsTrue() {
  LogAnalyzer analyzer = new LogAnalyzer();
  bool result = analyzer.IsValidLogFileName("filewithgoodextension.SLF");
  Assert.True(result);
}
```
```typescript
// typescript
describe("2.4 LogAnalyzer", () => {
  it("IsValidFileName_BadExtension_ReturnsFalse", () => {
    const analyzer: LogAnalyzer = new LogAnalyzer();
    const result: boolean = analyzer.isValidLogFileName("filewithbadextension.foo");
    expect(result).toBeFalsy();
  });
});
```

### 調整產品程式碼
```csharp
// C#
public bool IsValidLogFileName(string fileName){
  if(!fileName.EndsWith(".SLF",StringComparison.CurrentCultureIgnoreCase)){
    return false;
  }
  return true;
}
```
```typescript
// typescript
export class LogAnalyzer {
  isValidLogFileName(fileName: string) {
    if (!fileName.toLocaleUpperCase().endsWith(".SLF")) {
      return false;
    }
    return true;
    // 或者只要寫一行就好
    // return fileName.toLocaleUpperCase().endsWith(".SLF")
  }
}
```

## 2.5 pg38 使用參數來重構測試
```csharp
// C#
[TestCase("filewithgoodextension.SLF")]
[TestCase("filewithgoodextension.slf")]
public void IsValidLogFileName_ValidExtensions_ReturnsTrue(string file) {
  LogAnalyzer analyzer = new LogAnalyzer();
  bool result = analyzer.IsValidLogFileName(file);
  Assert.True(result);
}
```
```typescript 
// typescript
describe("2.4 LogAnalyzer", () => {
  const testCases = [
    "myFileName.SLF",
    "myFileName.slf"
  ];
  it('IsValidLogFileName_ValidExtensions_ReturnsTrue', () => {
    for (const fileName of testCases) {
      const result = analyzer.isValidLogFileName(fileName);
      expect(result).toBeTruthy();
    }
  })
})
```
---
## 2.6.1 pg42
```csharp
using NUnit.Framework;
[TestFixture]
public class LogAnalyzerTests {
  private LogAnalyzer m_analyzer = null;
  
  [Setup]
  public void Setup(){
    m_analyzer = new LogAnalyzer();
  }

  [Test]
  public void IsValidFileName_validFileLowerCased_ReturnsTrue() {
    bool result = m_analyzer.IsValidLogFileName("whatever.slf");
    Assert.IsTrue(result,"filename should be valid!");
  }
  
  [Test]
  public void IsValidFileName_validFileUpperCased_ReturnsTrue() {
    bool result = m_analyzer.IsValidLogFileName("whatever.SLF");
    Assert.IsTrue(result,"filename should be valid!");
  }

  [TearDown]
  public void TearDown() {
    m_analyzer = null;
  }
}
```
```typescript
// typescript
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
```
---
## 2.6.2 pg45 驗證預期的例外
code
```csharp
// C#
public class LogAnalyzer {
  public bool IsValidLogFileName(string fileName){
    if(string.IsNullOrEmpty(fileName)){
      throw new ArgumentException("fileName has to be provided");
    }
    if(!fileName.EndsWith(".SLF",StringComparison.CurrentCultureIgnoreCase)){
      return false;
    }
    return true;
  }
}
```
```typescript
// typescript
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
```
test
```csharp
// C#
[Test]
public void IsValidLogFileName_EmptyFileName_Throws() {
  LogAnalyzer la = MakeAnalyzer();
  var ex = Assert.Catch<Exception>(() => la.IsValidLogFileName(""));
  StringAssert.Contains("fileName has to be provided",ex.Message);
}
```
```typescript
// typescript
it('IsValidLogFileName_EmptyFileName_ThrowError', () => {
  // Note: You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
  expect(() => {
    analyzer.isValidLogFileName("")
  })
    .toThrow(new Error("fileName has to be provided"));
})
```
---
## 2.6.3 pg 忽略此測試
test
```csharp
// C#
[Test]
[Ignore("there is a problem with this test")]
public void IsValidFileName_ValidFile_ReturnsTrue(){
  //...
}
```
```typescript
// typescript
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
```
---
## 2.7 pg50 測試系統狀態的改變，而非驗證回傳值
code
```csharp
// C#
public class LogAnalyzer {
  public bool WasLastFileNameValid { get; set; }
  public bool IsValidLogFileName(string fileName){
    WasLastFileNameValid = false; // 改變系統狀態
    if(string.IsNullOrEmpty(fileName)){
      throw new ArgumentException("fileName has to be provided");
    }
    if(!fileName.EndsWith(".SLF",StringComparison.CurrentCultureIgnoreCase)){
      return false;
    }
    WasLastFileNameValid = true; // 改變系統狀態
    return true;
  }
}
```
```typescript
// typescript
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
```
test
```csharp
// C#
[Test]
public void IsValidLogFileName_WhenCalled_ChangesWasLastFileNameValid() {
  LogAnalyzer la = MakeAnalyzer();
  la.IsValidLogFileName("badname.foo");
  Assert.False(la.WasLastFileNameValid);
}
```
```typescript
// typescript
it('IsValidLogFileName_WhenCalled_ChangesWasLastFileNameValid', () => {
  analyzer.isValidLogFileName("badname.foo"); 
  expect(analyzer.wasLastFileNameValid).toBeFalsy();
})
```
重構測試
```csharp
// C#
[TestCase("badfile.foo",false)]
[TestCase("goodfile.slf",true)]
public void IsValidLogFileName_WhenCalled_ChangesWasLastFileNameValid(string file, bool expected) {
  LogAnalyzer la = MakeAnalyzer();
  la.IsValidLogFileName(file);
  Assert.AreEqual(expected, la.WasLastFileNameValid);
}
```
```typescript
// typescript
const testCases = [
  { testId: 1, fileName: "badfile.foo", expectedValue: false },
  { testId: 2, fileName: "goodfile.slf", expectedValue: true }
];

for (const { testId, fileName, expectedValue } of testCases) {
  it(`IsValidLogFileName_WhenCalled_ChangesWasLastFileNameValid:${testId},fileName:${fileName},expect:${expectedValue}`, () => {
    analyzer.isValidLogFileName(fileName);
    expect(analyzer.wasLastFileNameValid).toBe(expectedValue);
  })
}
```

## 2.7 pg52 pg53
code Add() 與 Sum() 方法
```csharp
// C#
public class MemCalculator {
  private int sum = 0;
  public void Add(int number){
    sum += number;
  }
  public int Sum(){
    int temp = sum;
    sum = 0;
    return temp;
  }
}
```
```typescript
// typescript
export class MemCalculator {
  sum: number = 0;

  Add(num: number) {
    this.sum += num;
  }

  Sum() {
    const temp = this.sum;
    this.sum = 0;
    return temp;
  }
}
```
test 2-7
```csharp
// C#
[Test]
public void Sum_ByDefault_ReturnsZero(){
  MemCalculator calc = new MemCalculator();
  int lastSum = calc.Sum();
  Assert.AreEqual(0,lastSum); // 驗證預設的回傳值
}
```
```typescript
// typescript
it(`Sum_ByDefault_ReturnsZero`, () => {
  let calc: MemCalculator =  new MemCalculator();
  const lastSum: number = calc.Sum();
  expect(lastSum).toEqual(0);
})
```
test 2-8
```csharp
// C#
[Test]
public void Sum_ByDefault_ReturnsZero(){
  MemCalculator calc = new MemCalculator();
  int lastSum = calc.Sum();
  Assert.AreEqual(0,lastSum); // 驗證預設的回傳值
}
[Test]
public void Add_WhenCalled_ChangesSum(){
  MemCalculator calc = new MemCalculator();
  calc.Add(1);
  int sum = calc.Sum();
  Assert.AreEqual(1,sum); // 驗證預設的回傳值
}
private static MemCalculator MakeCalc(){
  return new MemCalculator();
}
```
```typescript
// typescript
const makeCalc = () => {
  return new MemCalculator();
}

it(`Sum_ByDefault_ReturnsZero`, () => {
  let calc: MemCalculator = makeCalc();
  const lastSum: number = calc.Sum();
  expect(lastSum).toEqual(0);
})

it(`Add_WhenCalled_ChangesSum`, () => {
  let calc: MemCalculator = makeCalc();
  calc.Add(1);
  const lastSum: number = calc.Sum();
  expect(lastSum).toEqual(1);
})
```

# 3.4.3 pg70
```csharp
public class LogAnalyzer {
  private IExtensionManager manager;
  public LogAnalyzer(IExtensionManager mgr){
    manager = mgr;
  }
  public bool IsValidLogFileName(string fileName){
    return manager.IsValid(fileName);
  }
}
public interface IExtensionManager {
  bool IsValid(string fileName);  
}
[TestFixture]
public class LogAnalyzerTests {
  [Test]
  public void IsValidFileName_NameSupportedExtension_ReturnsTrue(){
    FakeExtensionManager myFakeManager = new FakeExtensionManager();
    myFakeManager.WillBeValid = true;
    LogAnalyzer log = new LogAnalyzer(myFakeManager);
    bool result = log.IsValidLogFileName("short.ext");
    Assert.True(result);
  }
}
internal class FakeExtensionManager: IExtensionManager {
  public bool WillBeValid = false;
  public bool IsValid(string fileName){
    return WillBeValid;
  }
}
```
```typescript
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
```
# Futher reading 進階 Mock
## Mocking in jest 
https://jestjs.io/docs/es6-class-mocks
https://jestjs.io/docs/mock-functions

## Mocking in angular
https://codecraft.tv/courses/angular/unit-testing/mocks-and-spies/

