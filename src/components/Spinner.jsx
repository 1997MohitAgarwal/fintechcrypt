import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({height}) => {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      <ClipLoader color="#ff6347" size={100} />
    </div>
  );
};

export default Spinner;
