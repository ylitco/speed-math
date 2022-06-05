import React from 'react';

const defaultValue = {
  locale: 'ru',
  setLocale: () => {},
};

export default React.createContext(defaultValue);
