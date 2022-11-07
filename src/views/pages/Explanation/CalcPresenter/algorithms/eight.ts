import CalcPresenter from '../CalcPresenter';

export const eight = (calcPresenter: CalcPresenter) => {
  return calcPresenter
    .look()
    .remember()
    .focusOnDigit()
    .getDigit()
    .subtractFromTen()
    .calculate('*', 2)
    .keepInMind()
    .addInResult()
    .repeat(
      () => {
        calcPresenter
          .focusOnDigit()
          .getDigit()
          .subtractFromNine()
          .calculate('*', 2)
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
    .calculate('-', 2)
    .addFromMind()
    .addInResult()
    .giveAnswer();
};
