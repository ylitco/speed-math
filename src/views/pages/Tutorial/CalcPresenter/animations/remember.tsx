import CalcPresenter from '../CalcPresenter';
import { gsap } from 'gsap';

export function remember(this: CalcPresenter) {
  const LABEL = 'start-remember';
  const tl = gsap.timeline();

  tl.to(this.stepInstructionsArea, { flex: 1 }, LABEL)
    .to(this.mindArea, { flex: 1 }, LABEL)
    .to(this.resultArea, { flex: 1 }, LABEL);

  this.tl.add(tl);
}