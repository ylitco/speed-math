import React, { useCallback, useState } from 'react';
import { Wheel } from 'src/components/Wheel/Wheel';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IEventMetaObject } from 'src/types';

export default {
  title: 'Components/Wheel',
  component: Wheel,
} as ComponentMeta<typeof Wheel>;

const Template: ComponentStory<typeof Wheel> = (_args) => {
  const { value, onSelect, ...args } = _args;
  const [_value, _setValue] = useState(value);
  const handleSelect = useCallback(_handleSelect, []);

  return (
    <Wheel value={_value} onSelect={handleSelect} {...args} />
  );

  function _handleSelect(e: IEventMetaObject<string>) {
    _setValue(e.value);
  }
};

export const Default = Template.bind({});
Default.args = {
  options: {
    overview: 'Overview',
    about: 'About',
    gameSettings: 'Take Exercise',
  },
  value: 'overview',
};

export const Minutes = Template.bind({});
Minutes.args = {
  options: Object.fromEntries(Array.from(Array(61).keys()).map((m, i) => [i, `${i}`])),
  value: '0',
};

export const Seconds = Template.bind({});
Seconds.args = {
  options: Object.fromEntries(Array.from(Array(61).keys()).map((m, i) => [i, `${i}`])),
  value: '0',
};

export const Count = Template.bind({});
Count.args = {
  options: Object.fromEntries(Array.from(Array(20).keys()).map((m, i) => [i + 1, `${i + 1}`])),
  value: '20',
};
