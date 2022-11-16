import { RefObject } from 'react';
import { gsap } from 'gsap';
import * as instructionsOf from './algorithms';
import * as animationOf from './animations';
import {LEFT_ZERO, RIGHT_ZERO} from "./animations/const";
import styles from '../Explanation.module.scss';
import {STEP_KEEP_IN_MIND} from "./animations/addSibling";
import {STEP_RESULT} from "./animations/addInResult";

export interface Point {
  x: number;
  y: number;
}

export default class CalcPresenter {
  private steps: Array<() => void> = [];
  private currentStep = 0;
  currentDigitIndex = this.secondFactor.length - 1;
  _inAttention: null | number = null;
  inMind: null | number = null;
  answer: Array<number> = [];
  mainDigit?: HTMLElement;
  tl: gsap.core.Timeline = gsap.timeline();

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
    if (this.tl.isActive()) return;

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
        if (this._doAfter !== null) {
          console.debug(`before: ${stepCb.name}`)

          this._doAfter();

          this._doAfter = null;
        }

        console.debug(stepCb.name);
        stepCb.bind(this)(args)
      });

      return this;
    };
  }

  afterStep(cb: () => void) {
    this._doAfter = cb;
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

  clone(elem: HTMLElement) {
    const clone = elem.cloneNode(true) as HTMLElement;

    clone.setAttribute('id', 'active-clone');

    const cloneStartPoint = this.getElementPosition(elem);

    clone.style.position = 'absolute';
    clone.style.left = cloneStartPoint.x + 'px';
    clone.style.top = cloneStartPoint.y + 'px';

    this.canvas.insertAdjacentElement('beforeend', clone);

    return clone;
  }

  getRightSibling() {
    if (this.currentDigitIndex + 1 === this.secondFactor.length) {
      return this.factorArea.querySelector<HTMLElement>(RIGHT_ZERO.selector)!;
    } else if (this.currentDigitIndex < 0) {
      return this.factorArea.querySelector<HTMLElement>('#digit-0')!;
    } else {
      return this.factorArea.querySelector<HTMLElement>(`#digit-${this.currentDigitIndex}`)!.nextSibling as HTMLElement;
    }
  }

  get leftSibling() {
    if (this.currentDigitIndex === 0) {
      return this.factorArea.querySelector<HTMLElement>(LEFT_ZERO.selector)!;
    } else {
      return this.factorArea.querySelector<HTMLElement>(`#digit-${this.currentDigitIndex}`)!.previousSibling as HTMLElement;
    }
  }

  cloneTo(elem: Element, where: InsertPosition, container: Element, id?: string | undefined) {
    const clone = elem.cloneNode(true) as Element;

    clone.setAttribute('id', id ? id : clone.getAttribute('id') + '-clone')

    container.insertAdjacentElement(where, clone);

    return clone;
  }

  get _currentDigit() {
    if (this.currentDigitIndex < 0) {
      return this.factorArea.querySelector(LEFT_ZERO.selector) as HTMLElement;
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

  getElementPosition(elem: Element) {
    const { left, top } = elem.getBoundingClientRect();

    return { x: left - this.canvas.offsetLeft, y: top - this.canvas.offsetTop };
  }

  getDistanceBetweenElements(a: Element, b: Element) {
    const aPosition = this.getElementPosition(a);
    const bPosition = this.getElementPosition(b);

    return {
      x: aPosition.x - bPosition.x,
      y: aPosition.y - bPosition.y,
    };
  }

  getDistanceBetweenPoints(a: Point, b: Point) {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
    };
  }

  get leftZero(): [slot: HTMLElement, digit: HTMLElement] {
    const leftZeroSlotElem = document.getElementById(LEFT_ZERO.id);

    if (!leftZeroSlotElem) throw new Error('Отсутствует ячейка крайнего левого нуля');

    const leftZeroDigitElem = leftZeroSlotElem.querySelector<HTMLElement>(`.${styles.digit}`);

    if (!leftZeroDigitElem) throw new Error('Отсутствует элемент цифры крайнего левого нуля');

    return [
      leftZeroSlotElem,
      leftZeroDigitElem,
    ];
  }

  get rightZero(): [slot: HTMLElement, digit: HTMLElement] {
    const rightZeroSlotElem = document.getElementById(RIGHT_ZERO.id);

    if (!rightZeroSlotElem) throw new Error('Отсутствует ячейка крайнего правого нуля');

    const rightZeroDigitElem = rightZeroSlotElem.querySelector<HTMLElement>(`.${styles.digit}`);

    if (!rightZeroDigitElem) throw new Error('Отсутствует элемент цифры крайнего правого нуля');

    return [
      rightZeroSlotElem,
      rightZeroDigitElem,
    ];
  }

  get isLeftZeroFocused() {
    return this.currentDigitIndex < 0;
  }

  get focusedUnit(): [slot: HTMLElement, digit: HTMLElement] {
    if (this.isLeftZeroFocused) return this.leftZero;

    const [ factorUnitsSlots, factorUnitsDigits ] = this.factorUnits;

    return [
      factorUnitsSlots[this.currentDigitIndex],
      factorUnitsDigits[this.currentDigitIndex],
    ];
  }

  get factorUnits(): [slots: NodeListOf<HTMLElement>, digits: NodeListOf<HTMLElement>] {
    const slotsSelector = `#number .${styles.slot}`;
    const factorUnitsSlots = this.factorArea.querySelectorAll<HTMLElement>(slotsSelector);

    if (!factorUnitsSlots.length) throw new Error('Отсутствуют ячейки цифр множителя');

    const digitsSelector = `#number > .${styles.slot} > .${styles.digit}`;
    const factorUnitsDigits = this.factorArea.querySelectorAll<HTMLElement>(digitsSelector);
    console.debug(factorUnitsDigits);

    if (!factorUnitsDigits.length) throw new Error('Отсутствуют элементы цифр множителя')

    return [
      factorUnitsSlots,
      factorUnitsDigits,
    ]
  }

  getFactorUnit(n: number): [slot: HTMLElement, digit: HTMLElement] {
    const factorUnitSlot = this.factorUnits[0][n];
    const factorUnitDigit = this.factorUnits[1][n];

    return [
      factorUnitSlot,
      factorUnitDigit,
    ];
  }

  get isRightSiblingExist() {
    return this.currentDigitIndex + 1 < this.secondFactor.length;
  }

  get rightSibling(): [slot: HTMLElement, digit: HTMLElement] {
    if (!this.isRightSiblingExist) return this.rightZero;

    if (this.isLeftZeroFocused) return this.getFactorUnit(0);

    return this.getFactorUnit(this.currentDigitIndex + 1);
  }

  get unitInMind(): [slot: HTMLElement, digit: HTMLElement] {
    const unitInMindSlot = document.getElementById(STEP_KEEP_IN_MIND);

    if (!unitInMindSlot) throw new Error('Отсутствует ячейка цифры запомненной на предыдущем этапе');

    const unitInMindDigit = unitInMindSlot.querySelector<HTMLElement>(`.${styles.digit}`);

    if (!unitInMindDigit) throw new Error('Отсутствует элемент цифры запоменнной на предыдущем этапе');

    return [unitInMindSlot, unitInMindDigit];
  }

  get stepResult(): [slot: HTMLElement, digit: HTMLElement] {
    const stepResultSlot = document.getElementById(STEP_RESULT);

    if (!stepResultSlot) throw new Error('Отсутствует ячейка цифры результата предыдущего вычисления');

    const stepResultDigit = stepResultSlot.querySelector<HTMLElement>(`.${styles.digit}`);

    if (!stepResultDigit) throw new Error('Отсутствует элемент цифры результата предыдущего вычисления');

    return [stepResultSlot, stepResultDigit];
  }

  get brainIcon(): HTMLElement {
    const brainIconElem = document.getElementById('brain');

    if (!brainIconElem) throw new Error('Отсутствует иконка цифры в памяти');

    return brainIconElem;
  }

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
