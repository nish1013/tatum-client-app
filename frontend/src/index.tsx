import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { Home } from './pages/Home/index';
import { Check } from './pages/Check/index';
import { HowItWorks } from './pages/HowItWorks/index';
import { NotFound } from './pages/_404';
import '../index.css';

export function App() {
  return (
    <LocationProvider>
      <SiteHeader />
      <main class="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
        <Router>
          <Route path="/" component={Home} />
          <Route path="/check" component={Check} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route default component={NotFound} />
        </Router>
      </main>
      <SiteFooter />
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app'));
