import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { createSlot } from './const';

export function addSibling(this: CalcPresenter) {
  console.log(`Добавляем соседа: ${this.inAttention} + ${this.sibling} = ${this.inAttention + this.sibling}`);
  this.inAttention += this.sibling;

  const focusedDigitElem = this.stepInstructionsArea.querySelector<HTMLElement>('#focused-digit')!;
  const rightSiblingElem = this.stepInstructionsArea.querySelector<HTMLElement>('#right-sibling')!;

  const plusElem = createSlot({ symbol: '+', slotId: 'plus', slotStyles: { padding: '0 10px' } });

  focusedDigitElem.insertAdjacentElement('afterend', plusElem);

  const centerPosition = this.getElementPosition(plusElem);
  const focusedDigitStartPosition = this.getElementPosition(focusedDigitElem);
  const rightSiblingStartPosition = this.getElementPosition(rightSiblingElem);
  const focusedDigitRelativeEndPosition = this.getDistanceBetweenPoints(centerPosition, focusedDigitStartPosition);
  const rightSiblingRelativeEndPosition = this.getDistanceBetweenPoints(centerPosition, rightSiblingStartPosition);

  const tl = gsap.timeline();

  tl.addLabel('0')
    .from(plusElem, { width: 0, opacity: 0, yPercent: 100, paddingLeft: 0, paddingRight: 0 }, '0')
    .addLabel('1')
    .to(focusedDigitElem, { opacity: 0, x: focusedDigitRelativeEndPosition.x, y: focusedDigitRelativeEndPosition.y, onComplete: showResult.bind(this) }, '1')
    .to(plusElem, { opacity: 0, onComplete: () => plusElem.remove() }, '1')
    .to(rightSiblingElem, { opacity: 0, x: rightSiblingRelativeEndPosition.x, y: rightSiblingRelativeEndPosition.y, onComplete: () => rightSiblingElem.remove() }, '1');

  this.tl.add(tl);

  function showResult(this: CalcPresenter) {
    const slotElem = createSlot({ symbol: this.inAttention, slotId: 'step-result', symbolId: 'step-result-symbol' });
    // const slotElem = document.createElement('div');
    // ReactDOM.render(
    //   <Digit id="step-result" className={digitStyles.focused}>{this.inAttention + this.sibling}</Digit>,
    //   slotElem,
    // );
    focusedDigitElem.remove();
    this.stepInstructionsArea.insertAdjacentElement('afterbegin', slotElem);

    tl.from(slotElem, { opacity: 0 });
  }
}
