import CalcPresenter from '../CalcPresenter';

export const seven = (calcPresenter: CalcPresenter) => {
  return calcPresenter
    .look()
    .remember()
    .repeat(
      () => {
        calcPresenter
          .focusOnDigit()
          .getDigit()
          .checkParity()
          .calculate('*', 2)
          .addFiveIfOdd()
          .focusOnSibling()
          .getSibling()
          .addHalfOfSibling()
          .addFromMind()
          .keepInMind()
          .addInResult()
      },
      calcPresenter.secondFactor.length,
    )
    .giveAnswer();
};