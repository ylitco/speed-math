import CalcPresenter from '../CalcPresenter';
import { gsap } from 'gsap';

export function getSibling(this: CalcPresenter) {
  console.info(`Берём ${this.sibling} во внимание`);

  const [focusedDigitElem] = this.stepResult;
  const focusedDigitStartPosition = this.getElementPosition(focusedDigitElem);

  const isRightSiblingExist = !!this._currentDigit.nextSibling;
  const rightSiblingElem = this.getRightSibling();
  const rightSiblingTwin = this.cloneTo(rightSiblingElem, 'beforeend', this.stepInstructionsArea, 'right-sibling');

  const rightSiblingStartPosition = this.getElementPosition(rightSiblingElem);
  const rightSiblingEndPosition = this.getElementPosition(rightSiblingTwin);
  const focusedDigitEndPosition = this.getElementPosition(focusedDigitElem);

  const rightSiblingRelativeStartPosition = this.getDistanceBetweenPoints(rightSiblingStartPosition, rightSiblingEndPosition);
  const focusedDigitRelativeStartPosition = this.getDistanceBetweenPoints(focusedDigitStartPosition, focusedDigitEndPosition);

  if (!isRightSiblingExist) rightSiblingElem.style.opacity = '0';

  const tl = gsap.timeline();

  tl.fromTo(rightSiblingTwin, { x: rightSiblingRelativeStartPosition.x, y: rightSiblingRelativeStartPosition.y }, { x: 0, y: 0, paddingLeft: 10 })
    .fromTo(focusedDigitElem, { x: focusedDigitRelativeStartPosition.x, y: focusedDigitRelativeStartPosition.y }, { x: 0, y: 0, paddingRight: 10 }, 0);

  this.tl.add(tl);
}
