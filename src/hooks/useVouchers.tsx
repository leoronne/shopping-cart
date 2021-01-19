import React, { createContext, useEffect, useState, useCallback, useContext } from 'react';

import { vouchers as mockVouchers } from '../__mocks__';

import api from '../services/api';

interface VouchersContextProps {
  loadingVouc?: boolean;
  errorVouc?: boolean;
  vouchers?: Array<VouchersProps>;
}

const VouchersContext = createContext<VouchersContextProps>({} as VouchersContextProps);

const VouchersProvider: React.FC<VouchersContextProps> = ({ children }) => {
  const [loadingVouc, setLoadingVouc] = useState(false);
  const [errorVouc, setErrorVouc] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  const loadVouchers = useCallback(async () => {
    try {
      setErrorVouc(false);
      setLoadingVouc(true);
      const response = process.env.NODE_ENV === 'test' ? { data: { vouchers: mockVouchers } } : await api.get('vouchers.json');
      setVouchers(response?.data?.vouchers);
    } catch (err) {
      setErrorVouc(true);
    } finally {
      setLoadingVouc(false);
    }
  }, []);

  useEffect(() => {
    loadVouchers();
  }, [loadVouchers]);

  return (
    <VouchersContext.Provider
      value={{
        vouchers,
        loadingVouc,
        errorVouc,
      }}
    >
      {children}
    </VouchersContext.Provider>
  );
};

const useVouchers = (): VouchersContextProps => {
  const context = useContext(VouchersContext);

  if (!context) {
    throw new Error('useVouchers must be used within an VouchersProvider');
  }

  return context;
};

export { VouchersProvider, useVouchers };
