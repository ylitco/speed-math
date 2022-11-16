import CalcPresenter from '../CalcPresenter';

export function focusOnDigit(this: CalcPresenter) {
  const [, leftZeroDigit] = this.leftZero;
  const [, focusedUnitDigit] = this.focusedUnit;
  const [, factorUnitsDigits] = this.factorUnits;

  if (this.isLeftZeroFocused) {
    this.tl
      .fromTo(leftZeroDigit, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 })
      .to(factorUnitsDigits, { opacity: .25 })
      .to(leftZeroDigit, { color: '#7920d0' })
  } else {
    this.tl
      .to(factorUnitsDigits, { opacity: .25 })
      .to(focusedUnitDigit, { opacity: 1 })
  }
}