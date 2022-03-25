import React from 'react';
import { Start } from './Start';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Views/Start',
  component: Start,
} as ComponentMeta<typeof Start>;

const Template: ComponentStory<typeof Start> = (args) => <Start {...args} />;

export const Default = Template.bind({});
Default.args = {};
