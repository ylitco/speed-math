import { createRoot, Root } from "react-dom/client";
import cn from 'classnames';

import CalcPresenter from '../CalcPresenter';

import { LEFT_ZERO, RIGHT_ZERO } from './const';
import styles from '../../Tutorial.module.scss';

let root: Root | null = null;
let rootCanvas: HTMLElement | null = null;

export function look (this: CalcPresenter) {
  if (!root || rootCanvas !== this.canvas) {
    root = createRoot(this.canvas);
    rootCanvas = this.canvas;
  }

  root.render(<>
    <div id="factor" className={styles.factor}>
      <div id={LEFT_ZERO.id} className={cn(styles.slot, styles.zero)}>
        <div className={cn(styles.digit, styles.secondary)} data-content={0}>
          0
        </div>
      </div>
      <div id="number" className={styles.number}>
        {this.secondFactor.map((digit, index) => {
          return (
            <div key={index} className={styles.slot} id={`digit-${index}`}>
              <div className={styles.digit} data-content={digit}>
                {digit}
              </div>
            </div>
          );
        })}
      </div>
      <div id={RIGHT_ZERO.id} className={cn(styles.slot, styles.zero)}>
        <div className={cn(styles.digit, styles.secondary)} data-content={0}>
          0
        </div>
      </div>
    </div>
    <div id="doStep" className={cn(styles.doStep, styles.hidden)} />
    <div id="keepInMind" className={cn(styles.keepInMind, styles.hidden)} />
    <div id="result" className={cn(styles.result, styles.hidden)} />
  </>);
}
