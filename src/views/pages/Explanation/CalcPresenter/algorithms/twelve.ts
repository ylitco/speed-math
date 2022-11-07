import CalcPresenter from '../CalcPresenter';

export const twelve = (calcPresenter: CalcPresenter) => {
  return calcPresenter
    .look()
    .remember()
    .repeat(
      () => {
        calcPresenter
          .focusOnDigit()
          .getDigit()
          .calculate('*', 2)
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
