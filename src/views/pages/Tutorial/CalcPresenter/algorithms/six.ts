import CalcPresenter from '../CalcPresenter';

export const six = (calcPresenter: CalcPresenter) => {
  return calcPresenter
    .look()
    .remember()
    .repeat(
      () => {
        calcPresenter
          .focusOnDigit()
          .getDigit()
          .checkParity()
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