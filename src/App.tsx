import React from 'react';

import DefaultLayout from './layouts/DefaultLayout';
import GlobalStyles from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <DefaultLayout />
    </>
  );
};

export default App;
