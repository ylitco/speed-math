import CalcPresenter from '../CalcPresenter';

export function getSibling(this: CalcPresenter) {
  const msg = `Берём ${this.sibling} во внимание`;
  console.log(msg);
  this.stepInstructionsArea.innerHTML = msg;
}
