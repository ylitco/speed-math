import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';

export function giveAnswer(this: CalcPresenter) {
  console.log(`Показываем результат - ${this.answer.join('')}`);
  // this.stepInstructionsArea.innerHTML = this.answer.join('');
  // this.resultArea.innerHTML = '';

  const tl = gsap.timeline();

  tl.to(this.factorArea, { opacity: 0, flex: 0 })
    .to(this.stepInstructionsArea, { flex: 0 }, 0)
    .to(this.mindArea, { flex: 0 }, 0);

  this.tl.add(tl);
}
