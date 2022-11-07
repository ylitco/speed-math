import CalcPresenter from '../CalcPresenter';

export function addFiveIfOdd(this: CalcPresenter) {
  if (this.parity === 'even') {
    this.skip();

    return;
  }

  const msg = `Нечётное число, прибавляем 5: ${this.inAttention} + 5 = ${this.inAttention + 5}`;
  console.log(msg)
  this.stepInstructionsArea.innerHTML = msg;

  this.inAttention += 5;
}
