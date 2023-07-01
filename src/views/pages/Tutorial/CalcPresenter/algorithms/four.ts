import CalcPresenter from '../CalcPresenter';

export const four = (calcPresenter: CalcPresenter) => {
  return calcPresenter
    .look()
    .remember()
    .focusOnDigit()
    .getDigit()
    .checkParity()
    .subtractFromTen()
    .addFiveIfOdd()
    .addFromMind()
    .keepInMind()
    .addInResult()
    .repeat(
      () => {
        calcPresenter
          .focusOnDigit()
          .getDigit()
          .checkParity()
          .subtractFromNine()
          .addFiveIfOdd()
          .focusOnSibling()
          .getSibling()
          .addHalfOfSibling()
          .addFromMind()
          .keepInMind()
          .addInResult()
      },
      calcPresenter.secondFactor.length - 2,
    )
    .focusOnDigit()
    .getDigit()
    .checkParity()
    .focusOnSibling()
    .getSibling()
    .addHalfOfSibling()
    .calculate('-', 1)
    .addFromMind()
    .addInResult()
    .giveAnswer();
};