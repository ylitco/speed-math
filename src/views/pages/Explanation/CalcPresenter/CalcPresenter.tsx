import { RefObject } from "react";
import * as instructionsOf from './algorithms';
import * as animationOf from './animations';

export default class CalcPresenter {
  private steps: Array<() => void> = [];
  private currentStep = 0;
  currentDigitIndex = this.secondFactor.length - 1;
  _inAttention: null | number = null;
  inMind: null | number = null;
  answer: Array<number> = [];

  _doAfter: (() => void) | null = null;

  constructor(
    private readonly _secondFactor: number,
    private readonly _canvas: RefObject<HTMLDivElement>,
    private readonly handlers: CalcPresenterEventHandlers,
  ) {}

  get secondFactor() {
    return this._secondFactor.toString().split('').map(n => +n);
  }

  get canvas(): HTMLDivElement {
    if (this._canvas.current === null) throw new Error('Canvas element is not specified');

    return this._canvas.current;
  }

  public start = () => {
    if (!this.steps.length) {
      if (this.handlers.onFinish) {
        this.handlers.onFinish();
      }

      return;
    }

    this.steps[0]();
  }

  public nextStep = () => {
    if (this.steps.length - 1 === this.currentStep) {
      if (this.handlers.onFinish) {
        this.handlers.onFinish();
      }

      return;
    }

    this.currentStep = this.currentStep + 1;
    this.steps[this.currentStep]();
  }

  private createStep(stepCb: (...args: any) => void) {
    return (...args: any) => {
      this.steps.push(() => {
        console.debug(stepCb.name);
        stepCb.bind(this)(args)
      });

      return this;
    };
  }

  skip() {
    this.nextStep();
  }

  get digit() {
    if (this.currentDigitIndex < 0) {
      return 0;
    } else {
      return this.secondFactor[this.currentDigitIndex];
    }
  }

  get sibling() {
    return this.secondFactor[this.currentDigitIndex + 1] || 0;
  }

  get inAttention() {
    if (this._inAttention === null) throw new Error('нет промежуточного вычисления');

    return this._inAttention;
  }

  set inAttention(number: number) {
    this._inAttention = number;
  }

  get factorArea() {
    return this.canvas.querySelector('#factor') as HTMLDivElement;
  }

  get stepInstructionsArea() {
    return this.canvas.querySelector('#doStep') as HTMLDivElement;
  }

  get resultArea() {
    return this.canvas.querySelector('#result') as HTMLDivElement;
  }

  get mindArea() {
    return this.canvas.querySelector('#keepInMind') as HTMLDivElement;
  }

  _getBoxStartPoint(elem: HTMLElement) {
    /**
     * Возвращает позицию элемента в координатах полотна
     */
    const elemBoxRect = elem.getBoundingClientRect();

    return {
      top: elemBoxRect.top - this.canvas.offsetTop,
      left: elemBoxRect.left - this.canvas.offsetLeft,
    };
  }

  _calcOffset(elem: HTMLElement, destinationElem: HTMLElement, where: InsertPosition) {
    const clone = elem.cloneNode(true) as HTMLElement;

    clone.style.top = 'initial';
    clone.style.left = 'initial';
    clone.removeAttribute('style');

    destinationElem.insertAdjacentElement(where, clone);

    const cloneStartPoint = this._getBoxStartPoint(clone);

    clone.remove();

    return cloneStartPoint;
  }

  _clone(elem: HTMLElement) {
    const clone = elem.cloneNode(true) as HTMLElement;

    clone.setAttribute('id', 'active-clone');

    const cloneStartPoint = this._getBoxStartPoint(elem);

    clone.style.position = 'absolute';
    clone.style.left = cloneStartPoint.left + 'px';
    clone.style.top = cloneStartPoint.top + 'px';

    this.canvas.insertAdjacentElement('beforeend', clone);

    return clone;
  }

  get _currentDigit() {
    if (this.currentDigitIndex < 0) {
      return this.factorArea.querySelector('#left') as HTMLElement;
    }

    return this.factorArea.querySelector(`#digit-${this.currentDigitIndex}`) as HTMLElement;
  }

  public repeat = (addSteps: (iteration: number) => void, count: number) => {
    while (count >= 0) {
      addSteps(count);
      count -= 1;
    }

    return this;
  };

  look = this.createStep(animationOf.look);

  remember = this.createStep(animationOf.remember);

  focusOnDigit = this.createStep(animationOf.focusOnDigit);

  getDigit = this.createStep(animationOf.getDigit);

  calculate = this.createStep(animationOf.calculate);

  focusOnSibling = this.createStep(animationOf.focusOnSibling);

  getSibling = this.createStep(animationOf.getSibling);

  addSibling = this.createStep(animationOf.addSibling);

  addInResult = this.createStep(animationOf.addInResult);

  addFromMind = this.createStep(animationOf.addFromMind);

  keepInMind = this.createStep(animationOf.keepInMind);

  giveAnswer = this.createStep(animationOf.giveAnswer);

  useSibling = this.createStep(animationOf.useSibling);

  getHalf = this.createStep(animationOf.getHalf);

  parity: null | 'even' | 'odd' = null;

  checkParity = this.createStep(animationOf.checkParity);

  addFiveIfOdd = this.createStep(animationOf.addFiveIfOdd);

  subtractFromTen = this.createStep(animationOf.subtractFromTen);

  subtractFromNine = this.createStep(animationOf.subtractFromNine);

  addHalfOfSibling = this.createStep(animationOf.addHalfOfSibling);
}

interface CalcPresenterEventHandlers {
  onFinish?: () => void;
}

export function createCalcPresenter (
  firstFactor: number, secondFactor: number, canvas: RefObject<HTMLDivElement>, handlers: CalcPresenterEventHandlers,
) {
  const calcPresenter = new CalcPresenter(secondFactor, canvas, handlers);

  switch (firstFactor) {
    case 3: return instructionsOf.three(calcPresenter);
    case 4: return instructionsOf.four(calcPresenter);
    case 5: return instructionsOf.five(calcPresenter);
    case 6: return instructionsOf.six(calcPresenter);
    case 7: return instructionsOf.seven(calcPresenter);
    case 8: return instructionsOf.eight(calcPresenter);
    case 9: return instructionsOf.nine(calcPresenter);
    case 11: return instructionsOf.eleven(calcPresenter);
    case 12: return instructionsOf.twelve(calcPresenter);
    default: {
      return calcPresenter;
    }
  }
}
