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