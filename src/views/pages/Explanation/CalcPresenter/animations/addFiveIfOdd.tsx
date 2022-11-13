import CalcPresenter from '../CalcPresenter';

export function addFiveIfOdd(this: CalcPresenter) {
  if (this.parity === 'even') {
    this.skip();

    return;
  }

  console.info(`Нечётное число, прибавляем 5: ${this.inAttention} + 5 = ${this.inAttention + 5}`)

  this.inAttention += 5;
}
