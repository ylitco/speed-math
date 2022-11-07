import CalcPresenter from '../CalcPresenter';

export function addSibling(this: CalcPresenter) {
  const msg = `Добавляем соседа: ${this.inAttention} + ${this.sibling} = ${this.inAttention + this.sibling}`;
  console.log(msg);
  this.stepInstructionsArea.innerHTML = msg;
  this.inAttention += this.sibling;
}
