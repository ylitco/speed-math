import CalcPresenter from '../CalcPresenter';

export function addHalfOfSibling(this: CalcPresenter) {
    const msg = `Прибавляем половину соседа: ${this.inAttention} + ${Math.floor(this.sibling / 2)} = ${this.inAttention + Math.floor(this.sibling / 2)}`;
    console.log(msg);
    this.inAttention += Math.floor(this.sibling / 2);
    this.stepInstructionsArea.innerHTML = msg;
}
