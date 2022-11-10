import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import { Digit } from '../../Digit/Digit';
import CalcPresenter from '../CalcPresenter';

import styles from '../../Explanation.module.scss';
import digitStyles from '../../Digit/Digit.module.scss';

export function look (this: CalcPresenter) {
  ReactDOM.render(
    <>
      <div id="factor" className={styles.factor}>
        <Digit id="left-zero" className={cn(digitStyles.brained, digitStyles.hidden)}>0</Digit>
        <div id="number" className={styles.number}>
          {this.secondFactor.map((digit, index) => {
            return (
              <Digit id={`digit-${index}`} key={`digit-${index}`} className={cn(digitStyles.focused)}>{digit}</Digit>
            );
          })}
        </div>
        <Digit id='right' className={cn(digitStyles.brained, digitStyles.hidden)}>0</Digit>
      </div>
      <div id="doStep" className={cn(styles.doStep, styles.hidden)} />
      <div id="keepInMind" className={cn(styles.keepInMind, styles.hidden)} />
      <div id="result" className={cn(styles.result, styles.hidden)} />
    </>,
    this.canvas,
  );
}
