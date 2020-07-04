import React, { createContext, useEffect, useState } from 'react';

import api from '../services/api';
import notify from '../services/toast';

const Context = createContext();

const VouchersProvider = ({ children }) => {
  const [loadingVouc, setLoadingVouc] = useState(false);
  const [errorVouc, setErrorVouc] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    async function loadVouchers() {
      try {
        setErrorVouc(false);
        setLoadingVouc(true);
        const response = await api.get('vouchers.json');
        setVouchers(response.data.vouchers);
      } catch (err) {
        setErrorVouc(true);
        notify(err.message, 'error');
      } finally {
        setLoadingVouc(false);
      }
    }
    loadVouchers();
  }, []);

  return (
    <Context.Provider
      value={{
        vouchers,
        loadingVouc,
        setVouchers,
        errorVouc,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, VouchersProvider };
