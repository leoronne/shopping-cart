import React from 'react';
import { DotLoader } from 'react-spinners';

interface DotProps {
  loading?: boolean;
  size?: number;
  color?: string;
  defaultText?: any;
}

const DotLoaderComp: React.FC<DotProps> = ({ loading, size, color, defaultText }) => {
  return (
    <>
     {loading ? (
      <DotLoader
        css={`display: block; margin: 0 auto; border-color: red;`}
        size={size}
        color={color}
      />
    ) : (
      defaultText
    )}
    </>
  );
};

export default DotLoaderComp;
