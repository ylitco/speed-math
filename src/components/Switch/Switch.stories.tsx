import React, { useCallback, useState } from 'react';
import { Switch } from './Switch';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TimerIcon } from 'src/icons/Timer/Timer';
import { QuantityIcon } from 'src/icons/Quantity/Quantity';
import { InfinityIcon } from 'src/icons/Infinity/Infinity';
import { IEventMetaObject } from 'src/types';

export default {
  title: 'Components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (_args) => {
  const { value: _value, onChange, ...args } = _args
  const [value, setValue] = useState(_value);
  const handleChange = useCallback(_handleChange, []);

  return (
    <Switch value={value} onChange={handleChange} {...args} />
  );

  function _handleChange(e: IEventMetaObject<string>) {
    setValue(e.value)
  }
}

export const VerificationMode = Template.bind({});
VerificationMode.args = {
  options: {
    hand: 'Manual',
    auto: 'Automatic',
  },
  value: 'auto',
};

export const InputMode = Template.bind({});
InputMode.args = {
  options: {
    ltr: 'From left to right',
    rtl: 'From right to left',
  },
  value: 'rtl',
};

export const GameMode = Template.bind({});
GameMode.args = {
  options: {
    time: <TimerIcon />,
    quantity: <QuantityIcon />,
    unlimited: <InfinityIcon />,
  },
  value: 'time',
};
