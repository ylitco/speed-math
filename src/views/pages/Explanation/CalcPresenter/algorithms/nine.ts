import CalcPresenter from '../CalcPresenter';

export const nine = (calcPresenter: CalcPresenter) => {
  return calcPresenter
    .look()
    .remember()
    .focusOnDigit()
    .getDigit()
    .subtractFromTen()
    .addInResult()
    .repeat(
      () => {
        calcPresenter
          .focusOnDigit()
          .getDigit()
          .subtractFromNine()
          .focusOnSibling()
          .getSibling()
          .addSibling()
          .addFromMind()
          .keepInMind()
          .addInResult()
      },
      calcPresenter.secondFactor.length - 2,
    )
    .focusOnDigit()
    .getDigit()
    .focusOnSibling()
    .getSibling()
    .useSibling()
    .calculate('-', 1)
    .addFromMind()
    .addInResult()
    .giveAnswer();
};
