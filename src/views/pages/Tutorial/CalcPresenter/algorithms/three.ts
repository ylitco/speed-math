import CalcPresenter from '../CalcPresenter';

export const three = (calcPresenter: CalcPresenter) => {
  return calcPresenter
    .look()
    .remember()
    .focusOnDigit()
    .getDigit()
    .checkParity()
    .subtractFromTen()
    .calculate('*', 2)
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
          .calculate('*', 2)
          .focusOnSibling()
          .getSibling()
          .addHalfOfSibling()
          .addFiveIfOdd()
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
    .calculate('-', 2)
    .addFromMind()
    .addInResult()
    .giveAnswer();
};
