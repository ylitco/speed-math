import CalcPresenter from '../CalcPresenter';

export function subtractFromNine(this: CalcPresenter) {
  const msg = `Вычитаем ${this.inAttention} из 9: 9 - ${this.inAttention} = ${9 - this.inAttention}`;
  console.log(msg);
  this.stepInstructionsArea.innerHTML = msg;

  this.inAttention = 9 - this.inAttention;
}
