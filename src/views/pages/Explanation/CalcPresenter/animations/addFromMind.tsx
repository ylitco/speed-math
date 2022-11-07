import CalcPresenter from "../CalcPresenter";

export function addFromMind(this: CalcPresenter) {
  if (this.inMind) {
    const msg = `Добавляю цифру в уме - ${this.inAttention} + ${this.inMind} = ${this.inAttention + this.inMind}`;
    console.log(msg);
    this.stepInstructionsArea.innerHTML = msg;
    this.inAttention = this.inAttention + this.inMind;
    this.inMind = null;
  } else {
    this.skip();
  }
}