import CalcPresenter from '../CalcPresenter';

export function useSibling(this: CalcPresenter) {
    const msg = `Забываем про ${this.inAttention} и дальше работаем с соседом ${this.sibling}`;
    console.log(msg);
    this.inAttention = this.sibling;
    this.stepInstructionsArea.innerHTML = msg;
}
