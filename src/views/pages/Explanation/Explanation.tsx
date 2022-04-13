import React, {
  FC,
  RefObject,
  useContext,
  useEffect,
  useRef,
  memo,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { BackButton } from 'src/views/components/BackButton';
import { StateContext } from 'src/state';
import { getRandom } from 'src/utils';
import styles from './Explanation.module.scss';

function useExample(factor: number | undefined) {
  const example = useRef(!factor ? getRandom(100, 999) : factor);

  return example.current;
}

export const Explanation: FC = memo(() => {
  const navigate = useNavigate();
  const { workout } = useContext(StateContext);
  const exercise = useParams().exercise;
  if (!exercise) throw new Error('Clarification factor not specified'); // @todo customize error object
  const example = useExample(workout?.secondFactor);
  const canvas = useRef<HTMLDivElement>(null);
  const explanation = useRef<Clarification | null>(null);
  const handleClick = useCallback(() => {
    if (explanation.current === null) return;
    explanation.current.nextStep();
  }, []);

  useEffect(() => {
    explanation.current = Clarification.create(+exercise, example, canvas, { onFinish: () => { navigate(-1) } });
    explanation.current.start();
  }, [example, exercise, navigate]);

  return (
    <>
      <Header renderMinorAction={BackButton}>×{exercise}</Header>
      <Content>
        <div className={styles.explanation} onClick={handleClick} ref={canvas} />
      </Content>
    </>
  );
});

interface IClarificationHandlers {
  onFinish?: () => void;
}

class Clarification {
  private steps: Array<() => void> = [];
  private currentStep = 0;
  private currentDigitIndex = this.secondFactor.length - 1;
  private _inAttention: null | number = null;
  private inMind: null | number = null;
  private answer: Array<number> = [];

  constructor(
    private readonly _secondFactor: number,
    private readonly _canvas: RefObject<HTMLDivElement>,
    private readonly handlers: IClarificationHandlers,
  ) {}

  get secondFactor() {
    return this._secondFactor.toString().split('').map(n => +n);
  }

  get canvas(): HTMLDivElement {
    if (this._canvas.current === null) throw new Error('Canvas element is not specified');

    return this._canvas.current;
  }

  static create(
    firstFactor: number, secondFactor: number, canvas: RefObject<HTMLDivElement>, handlers: IClarificationHandlers,
  ) {
    const clarification = new Clarification(secondFactor, canvas, handlers);
    switch (firstFactor) {
      case 3: {
        return clarification
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
              clarification
                .focusOnDigit()
                .getDigit()
                .checkParity()
                .subtractFromNine()
                .calculate('*', 2)
                .addHalfOfSibling()
                .addFiveIfOdd()
                .addFromMind()
                .keepInMind()
                .addInResult()
            },
            clarification.secondFactor.length - 2,
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
      }
      case 4: {
        return clarification
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
              clarification
                .focusOnDigit()
                .getDigit()
                .checkParity()
                .subtractFromNine()
                .addFiveIfOdd()
                .addHalfOfSibling()
                .addFromMind()
                .keepInMind()
                .addInResult()
            },
            clarification.secondFactor.length - 2,
          )
          .focusOnDigit()
          .getDigit()
          .checkParity()
          .addHalfOfSibling()
          .calculate('-', 1)
          .addFromMind()
          .addInResult()
          .giveAnswer();
      }
      case 5: {
        return clarification
          .look()
          .remember()
          .repeat(
            () => {
              clarification
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
            clarification.secondFactor.length,
          )
          .giveAnswer();
      }
      case 6: {
        return clarification
          .look()
          .remember()
          .repeat(
            () => {
              clarification
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
            clarification.secondFactor.length,
          )
          .giveAnswer();
      }
      case 7: {
        return clarification
          .look()
          .remember()
          .repeat(
            () => {
              clarification
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
            clarification.secondFactor.length,
          )
          .giveAnswer();
      }
      case 8: {
        return clarification
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
              clarification
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
            clarification.secondFactor.length - 2,
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
      }
      case 9: {
        return clarification
          .look()
          .remember()
          .focusOnDigit()
          .getDigit()
          .subtractFromTen()
          .addInResult()
          .repeat(
            () => {
              clarification
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
            clarification.secondFactor.length - 2,
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
      }
      case 11: {
        return clarification
          .look()
          .remember()
          .repeat(
            () => {
              clarification
                .focusOnDigit()
                .getDigit()
                .focusOnSibling()
                .getSibling()
                .addSibling()
                .addFromMind()
                .keepInMind()
                .addInResult()
            },
            clarification.secondFactor.length,
          )
          .giveAnswer();
      }
      case 12: {
        return clarification
          .look()
          .remember()
          .repeat(
            () => {
              clarification
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
            clarification.secondFactor.length,
          )
          .giveAnswer();
      }
      default: {
        return clarification;
      }
    }
  }

  public start = () => {
    if (!this.steps.length) {
      if (this.handlers.onFinish) {
        this.handlers.onFinish();
      }

      return;
    }

    this.steps[0]();
  }

  public nextStep = () => {
    if (this.steps.length - 1 === this.currentStep) {
      if (this.handlers.onFinish) {
        this.handlers.onFinish();
      }

      return;
    }

    this.currentStep = this.currentStep + 1;
    this.steps[this.currentStep]();
  }

  private createStep(stepCb: (...args: any) => void) {
    return (...args: any) => {
      this.steps.push(() => stepCb(args));

      return this;
    };
  }

  private skip() {
    this.nextStep();
  }

  get digit() {
    if (this.currentDigitIndex < 0) {
      return 0;
    } else {
      return this.secondFactor[this.currentDigitIndex];
    }
  }

  get sibling() {
    return this.secondFactor[this.currentDigitIndex + 1] || 0;
  }

  get inAttention() {
    if (this._inAttention === null) throw new Error('нет промежуточного вычисления');

    return this._inAttention;
  }

  set inAttention(number: number) {
    this._inAttention = number;
  }

  get description() {
    return this.canvas.querySelector('#description') as HTMLDivElement;
  }

  get result() {
    return this.canvas.querySelector('#result') as HTMLDivElement;
  }

  look = this.createStep(() => {
    ReactDOM.render(
      <>
        <div className={styles.factor}>
          {this.secondFactor.map((digit, index) => {
            return (
              <div id={`digit-${index}`} key={`digit-${index}`} className={styles.digit}>
                {digit}
              </div>
            );
          })}
        </div>
        <div id="description" className={styles.desc} />
        <div id="result" className={styles.result} />
      </>,
      this.canvas,
    );
  });

  remember = this.createStep(() => {
    const factor = this.canvas.querySelector(`.${styles.factor}`) as HTMLDivElement;

    factor.style.top = '20%';
  });

  focusOnDigit = this.createStep(() => {
    let msg;
    if (this.currentDigitIndex < 0) {
      msg = `Слева представляем ${this.digit} и фокусируемся на нём`;
      console.log(msg);
    } else {
      msg = `Фокусирумеся на ${this.digit}`;
      console.log(msg);
    }
    this.description.innerHTML = msg;
  });

  getDigit = this.createStep(() => {
    const msg = `Берём ${this.digit} во внимание`;
    console.log(msg);
    this.description.innerHTML = msg;
    this.inAttention = this.digit;
  });

  calculate = this.createStep(([operator, number]) => {
    const result = eval(this.inAttention + operator + number);
    const msg = `Вычисляем ${this.inAttention} ${operator} ${number} = ${result}`;

    console.log(msg);
    this.description.innerHTML = msg;

    this.inAttention = result;
  });

  focusOnSibling = this.createStep(() => {
    let msg;
    if (this.secondFactor[this.currentDigitIndex + 1] === undefined) {
      msg = `Справа представляем ${this.sibling} и фокусируемся на нём`;
      console.log(msg);
    } else {
      msg = `Дополнительно фокусируемся на соседе - ${this.sibling}`;
      console.log(msg);
    }
    this.description.innerHTML = msg;
  });

  getSibling = this.createStep(() => {
    const msg = `Берём ${this.sibling} во внимание`;
    console.log(msg);
    this.description.innerHTML = msg;
  });

  addSibling = this.createStep(() => {
    const msg = `Добавляем соседа: ${this.inAttention} + ${this.sibling} = ${this.inAttention + this.sibling}`;
    console.log(msg);
    this.description.innerHTML = msg;
    this.inAttention += this.sibling;
  });

  addInResult = this.createStep(() => {
    const msg = `Добавляем в результат ${this.inAttention}`;
    console.log(msg);
    this.answer.unshift(this.inAttention);
    this._inAttention = null;
    this.currentDigitIndex -= 1;
    this.description.innerHTML = msg;
    this.result.innerHTML = this.answer.join('');
  });

  addFromMind = this.createStep(() => {
    if (this.inMind) {
      const msg = `Добавляю цифру в уме - ${this.inAttention} + ${this.inMind} = ${this.inAttention + this.inMind}`;
      console.log(msg);
      this.description.innerHTML = msg;
      this.inAttention = this.inAttention + this.inMind;
      this.inMind = null;
    } else {
      this.skip();
    }
  });

  keepInMind = this.createStep(() => {
    if (this.inAttention > 9) {
      const number = this.inAttention.toString().split('') as Array<string>;
      this.inMind = +(number.shift() as string);
      this.inAttention = +number.join();
      const msg = `Запоминаю ${this.inMind}`;
      console.log(msg)
      this.description.innerHTML = msg;
    } else {
      this.skip();
    }
  });

  giveAnswer = this.createStep(() => {
    console.log(`Показываем результат - ${this.answer.join('')}`);
    this.description.innerHTML = this.answer.join('');
    this.result.innerHTML = '';
  });

  useSibling = this.createStep(() => {
    const msg = `Забываем про ${this.inAttention} и дальше работаем с соседом ${this.sibling}`;
    console.log(msg);
    this.inAttention = this.sibling;
    this.description.innerHTML = msg;
  });

  getHalf = this.createStep(() => {
    const msg = `Находим половину от ${this.inAttention}: ${Math.floor(this.inAttention / 2)}`;
    console.log(msg)
    this.inAttention = Math.floor(this.inAttention / 2);
    this.description.innerHTML = msg;
  });

  parity: null | 'even' | 'odd' = null;

  checkParity = this.createStep(() => {
    let msg;
    if (this.inAttention % 2 === 0) {
      msg = `Отмечаем что число ${this.inAttention} чётное`;
      console.log(msg);
      this.parity = 'even';
    } else {
      msg = `Отмечаем что число ${this.inAttention} нечётное, нужно будет добавить 5`;
      console.log(msg);
      this.parity = 'odd';
    }
    this.description.innerHTML = msg;
  });

  addFiveIfOdd = this.createStep(() => {
    if (this.parity === 'even') {
      this.skip();

      return;
    }

    const msg = `Нечётное число, прибавляем 5: ${this.inAttention} + 5 = ${this.inAttention + 5}`;
    console.log(msg)
    this.description.innerHTML = msg;

    this.inAttention += 5;
  });

  subtractFromTen = this.createStep(() => {
    const msg = `Вычитаем ${this.inAttention} из 10: 10 - ${this.inAttention} = ${10 - this.inAttention}`;
    console.log(msg);
    this.description.innerHTML = msg;

    this.inAttention = 10 - this.inAttention;
  });

  subtractFromNine = this.createStep(() => {
    const msg = `Вычитаем ${this.inAttention} из 9: 9 - ${this.inAttention} = ${9 - this.inAttention}`;
    console.log(msg);
    this.description.innerHTML = msg;

    this.inAttention = 9 - this.inAttention;
  });

  addHalfOfSibling = this.createStep(() => {
    const msg = `Прибавляем половину соседа: ${this.inAttention} + ${Math.floor(this.sibling / 2)} = ${this.inAttention + Math.floor(this.sibling / 2)}`;
    console.log(msg);
    this.inAttention += Math.floor(this.sibling / 2);
    this.description.innerHTML = msg;
  });

  public repeat = (addSteps: (iteration: number) => void, count: number) => {
    while (count >= 0) {
      addSteps(count);
      count -= 1;
    }

    return this;
  };
}
