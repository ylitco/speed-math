import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import digitStyles from '../../Digit/Digit.module.scss';

export function focusOnSibling(this: CalcPresenter) {
  let msg;
  if (this.secondFactor[this.currentDigitIndex + 1] === undefined) {
    const rightDigit = this.canvas.querySelector('#right') as HTMLElement;
    const tl = gsap.timeline();

    tl.fromTo(
      rightDigit,
      {
        xPercent: 100,
        opacity: 0,
      },
      {
        xPercent: 0,
        opacity: 1,
        onComplete: () => {
          rightDigit.classList.remove(digitStyles.brained);
          rightDigit.classList.add(digitStyles.sibling);
          gsap.to(rightDigit, { xPercent: 100, opacity: 0, delay: 0.5 });
        },
      },
    );
    msg = `Справа представляем ${this.sibling} и фокусируемся на нём`;
    console.log(msg);
  } else {
    const currentDigit = this._currentDigit;

    gsap.to(currentDigit.nextSibling, { opacity: 0.6 });
    console.log(currentDigit);
    msg = `Дополнительно фокусируемся на соседе - ${this.sibling}`;
    console.log(msg);
  }
}