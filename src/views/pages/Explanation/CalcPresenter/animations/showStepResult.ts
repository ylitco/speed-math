import CalcPresenter from "../CalcPresenter";
import {createSlot, createTwoDigitSlot, STEP_RESULT} from "./const";
import {gsap} from "gsap";

export function showResult(this: CalcPresenter) {
  const isFromTwoDigits = this.inAttention > 9;
  const stepResult = isFromTwoDigits ?
    createTwoDigitSlot({ number: this.inAttention, slotId: STEP_RESULT }) :
    createSlot({ symbol: this.inAttention, slotId: STEP_RESULT });

  this.stepInstructionsArea.insertAdjacentElement('afterbegin', stepResult);

  const tl = gsap.timeline();

  tl.from(`#${STEP_RESULT}`, { opacity: 0 });

  this.tl.add(tl);
}
