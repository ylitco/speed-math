import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import digitStyles from '../../Digit/Digit.module.scss';

export function focusOnDigit(this: CalcPresenter) {
  let msg;

  if (!this.factorArea) throw new Error('There are no factor element');

  this.factorArea.childNodes.forEach((childNode, i, childNodes) => {
    if (i === 0 || i + 1 === childNodes.length) return;
    if (i === this.currentDigitIndex) {
      (childNode as HTMLElement).classList.add('active');
      (childNode as HTMLElement).classList.remove('inactive');
    } else {
      (childNode as HTMLElement).classList.add('inactive');
      (childNode as HTMLElement).classList.remove('active');
    }
  });

  const tl = gsap.timeline();

  if (this.currentDigitIndex < 0) {
    msg = `Слева представляем ${this.digit} и фокусируемся на нём`;
    const leftDigit = this.canvas.querySelector('#left') as HTMLElement;

    tl.fromTo(leftDigit, { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: 1 });
    tl.to('.inactive', {
      opacity: 0.25,
      onComplete: () => {
        leftDigit.classList.remove(digitStyles.brained);
        leftDigit.classList.add(digitStyles.focused);
      },
    });
  } else {
    msg = `Фокусирумеся на ${this.digit}`;

    this.factorArea.childNodes.forEach((childNode, i, childNodes) => {
      if (i + 1 === childNodes.length || i === 0) return;

      if (i === this.currentDigitIndex + 1) {
        gsap.to(childNode, { opacity: 1 })
      } else {
        gsap.to(childNode, { opacity: 0.25 })
      }
    });
  }
}