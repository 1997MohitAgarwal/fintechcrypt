import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader color="#ff6347" size={100} />
    </div>
  );
};

export default Spinner;
