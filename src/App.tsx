import React, { Suspense, useState }  from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { StateProvider } from 'src/state';
import LocaleContext from 'src/LocaleContext';
import i18n from './i18n';
import { Views } from './views/Views';

function App() {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on('languageChanged', () => setLocale(i18n.language));

  return (
    <LocaleContext.Provider value={{ locale, setLocale } as { locale: string, setLocale: () => void }}>
      <Suspense fallback={<div>Loading...</div>}>
        <StateProvider>
          <Router>
            <Views />
          </Router>
        </StateProvider>
      </Suspense>
    </LocaleContext.Provider>
  );
}

export default App;
