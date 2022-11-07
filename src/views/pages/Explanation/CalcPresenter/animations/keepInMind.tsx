import CalcPresenter from '../CalcPresenter';

export function keepInMind(this: CalcPresenter) {
  if (this.inAttention > 9) {
    const number = this.inAttention.toString().split('') as Array<string>;
    this.inMind = +(number.shift() as string);
    this.inAttention = +number.join();
    const msg = `Запоминаю ${this.inMind}`;
    console.log(msg)
    this.stepInstructionsArea.innerHTML = msg;
  } else {
    this.skip();
  }
}
