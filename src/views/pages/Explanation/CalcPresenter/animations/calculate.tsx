import CalcPresenter from '../CalcPresenter';

export function calculate(this: CalcPresenter, [operator, number]: Array<string>) {
  const result = eval(this.inAttention + operator + number); // eslint-disable-line no-eval
  const msg = `Вычисляем ${this.inAttention} ${operator} ${number} = ${result}`;

  console.log(msg);
  this.stepInstructionsArea.innerHTML = msg;

  this.inAttention = result;
}
