import CalcPresenter from '../CalcPresenter';

export function addInResult(this: CalcPresenter) {
  const msg = `Добавляем в результат ${this.inAttention}`;
  console.log(msg);
  this.answer.unshift(this.inAttention);
  this._inAttention = null;
  this.currentDigitIndex -= 1;
  this.stepInstructionsArea.innerHTML = msg;
  this.resultArea.innerHTML = this.answer.join('');
}
