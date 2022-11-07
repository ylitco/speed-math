import CalcPresenter from '../CalcPresenter';

export function getHalf(this: CalcPresenter) {
    const msg = `Находим половину от ${this.inAttention}: ${Math.floor(this.inAttention / 2)}`;
    console.log(msg)
    this.inAttention = Math.floor(this.inAttention / 2);
    this.stepInstructionsArea.innerHTML = msg;
}
