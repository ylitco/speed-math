import CalcPresenter from '../CalcPresenter';

export function giveAnswer(this: CalcPresenter) {
  console.log(`Показываем результат - ${this.answer.join('')}`);
  this.stepInstructionsArea.innerHTML = this.answer.join('');
  this.resultArea.innerHTML = '';
}
