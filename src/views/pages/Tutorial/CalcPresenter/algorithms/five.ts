import CalcPresenter from '../CalcPresenter';

export const five = (calcPresenter: CalcPresenter) => {
  return calcPresenter
    .look()
    .remember()
    .repeat(
      () => {
        calcPresenter
          .focusOnDigit()
          .getDigit()
          .checkParity()
          .focusOnSibling()
          .getSibling()
          .useSibling()
          .getHalf()
          .addFiveIfOdd()
          .addFromMind()
          .keepInMind()
          .addInResult()
      },
      calcPresenter.secondFactor.length,
    )
    .giveAnswer();
};