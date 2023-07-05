import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import i18n from "../i18n";

type Step = {
  action: string;
};

type Tutorial = {
  current: {
    firstFactor: number;
    secondFactor: number;
    steps: Array<Step>;
  } | null;
};

const initialState: Tutorial = {
  current: null,
};

export const TutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    startTutorial: (
      state,
      {
        payload: { firstFactor, secondFactor },
      }: PayloadAction<{ firstFactor: number; secondFactor: number }>
    ) => {
      state.current = {
        firstFactor,
        secondFactor,
        steps: initSteps(firstFactor, secondFactor),
      };
    },
    finishTutorial: (state: Tutorial) => {
      state.current = null;
    },
  },
});

export const { startTutorial, finishTutorial } = TutorialSlice.actions;

export default TutorialSlice.reducer;

function initSteps(firstFactor: number, secondFactor: number): Array<Step> {
  switch (firstFactor) {
    case 3:
      return [];
    case 4:
      return [];
    case 5:
      return [];
    case 6:
      return [];
    case 7:
      return [];
    case 8:
      return [];
    case 9:
      return [];
    case 11:
      return init11Steps(secondFactor);
    case 12:
      return [];
    default:
      return [];
  }
}

function init11Steps(factor: number): Array<Step> {
  const digits = `${factor}`.split('').reverse();

  const steps: Array<Step> = [{
    action: `Умножаем 11 на ${factor}`,
  }, {
    action: `Запоминаем множитель ${factor}`,
  }];

  for (let i = 0; i < digits.length; i++) {
    const digit = +digits[i];
    const index = i + 1;
    const indexText = i18n.t("key", { count: index, ordinal: true });

    console.debug(i18n.t("key", { count: 3, ordinal: true }));

    steps.push({
      action: `Фокусируемся на ${indexText} цифре справа ${digit}`,
    });

    // if ()
    // steps.push
    // , {
      // action: `Смотрим на соседа ${digit}`,
    // });
  }

  console.debug(steps);

  return steps;
}
