import React from 'react';
import App from './App';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Views/Start',
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const Default = Template.bind({});
