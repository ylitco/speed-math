import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';
import { Settings as SettingsIcon } from 'src/icons/Settings/Settings';
import { Back as BackIcon } from 'src/icons/Back/Back';
import { Info as InfoIcon } from 'src/icons/Info/Info';
import { Close as CloseIcon } from 'src/icons/Close/Close';
import { BUTTON_TYPE } from 'src/components/Button/types';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => {
  return <Button {...args}>{children}</Button>;
}

export const Settings = Template.bind({});
Settings.args = {
  children: <SettingsIcon />,
};

export const Back = Template.bind({});
Back.args = {
  children: <BackIcon />,
}

export const Info = Template.bind({});
Info.args = {
  children: <InfoIcon />,
  type: BUTTON_TYPE.CIRCLE,
};

export const Close = Template.bind({});
Close.args = {
  children: <CloseIcon />,
  type: BUTTON_TYPE.LIMPID,
};
