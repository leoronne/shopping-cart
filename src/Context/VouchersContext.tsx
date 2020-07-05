import React, { createContext, useEffect, useState } from 'react';

import api from '../services/api';
import notify from '../services/toast';

interface VouchersProps {
  id?: number;
  code?: string;
  type?: string;
  amount?: number;
  minValue?: number;
}

interface ContextProps {
  loadingVouc?: boolean;
  errorVouc?: boolean;
  vouchers?: Array<VouchersProps>;
}

const Context = createContext<Partial<ContextProps>>({});

const VouchersProvider: React.FC<ContextProps> = ({ children }) => {
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
    if (process.env.NODE_ENV === 'test')
      return setVouchers([
        { id: 1, code: '#30OFF', type: 'percentual', amount: 30.0 },
        { id: 2, code: '#100DOLLARS', type: 'fixed', amount: 100.0 },
        { id: 3, code: '#SHIPIT', type: 'shipping', amount: 0, minValue: 300.5 },
      ]);
    loadVouchers();
  }, []);

  return (
    <Context.Provider
      value={{
        vouchers,
        loadingVouc,
        errorVouc,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, VouchersProvider };
