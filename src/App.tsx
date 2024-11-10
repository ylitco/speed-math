import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import './i18n';
import { Views } from './views/Views';
import { Loader } from '~/views/components/Loader/Loader';

function App() {
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
    <Suspense fallback={<Loader />}>
      <Router>
        <Views />
      </Router>
    </Suspense>
  );
}

export default App;
