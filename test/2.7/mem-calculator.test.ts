import { MemCalculator } from '../../src/2.7/mem-calculator';
describe("2.7 MemCalculator", () => {

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
});


