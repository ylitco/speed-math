import CalcPresenter from '../CalcPresenter';

export const eleven = (calcPresenter: CalcPresenter) => {
  return calcPresenter
    .look()
    .remember()
    .repeat(
      () => {
        calcPresenter
          .focusOnDigit()
          .getDigit()
          .focusOnSibling()
          .getSibling()
          .addSibling()
          .addFromMind()
          .keepInMind()
          .addInResult()
      },
      calcPresenter.secondFactor.length,
    )
    .giveAnswer();
};
