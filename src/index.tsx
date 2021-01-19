import React from 'react';
import ReactDOM from 'react-dom';

import { LoaderSpinner } from './components';

import AppProvider from './hooks';

import App from './App';

const Application: React.FC = () => (
  <React.Suspense fallback={<LoaderSpinner />}>
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  </React.Suspense>
);

ReactDOM.render(<Application />, document.getElementById('root'));

export default Application;
