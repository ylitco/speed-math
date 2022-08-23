import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { StateProvider } from 'src/state';
import LocaleContext from 'src/LocaleContext';
import i18n from './i18n';
import { Views } from './views/Views';
import { Loader } from 'src/views/components/Loader/Loader';

function App() {
  const [locale, setLocale] = useState(i18n.options.fallbackLng as string);

  i18n.on('languageChanged', () => setLocale(i18n.language.slice(-2)));

  // Apple ignores the declaration of `user-scalable`, `minimum-scale` and `maximum-scale`
  // https://sitebulb.com/hints/mobile-friendly/the-viewport-meta-tag-prevents-the-user-from-scaling
  useEffect(() => {
    document.addEventListener('gesturestart', preventDefault);

    document.addEventListener('gesturechange', preventDefault);

    document.addEventListener('gestureend', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);

      document.removeEventListener('gesturechange', preventDefault);

      document.removeEventListener('gestureend', preventDefault);
    };

    function preventDefault(e: Event) {
      e.preventDefault();
      // special hack to prevent zoom-to-tabs gesture in safari
      // document.body.style.zoom = 0.99;
    }
  })

  return (
    <LocaleContext.Provider value={{ locale, setLocale } as { locale: string, setLocale: () => void }}>
      <Suspense fallback={<Loader />}>
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
