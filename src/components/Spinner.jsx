import React from 'react';
import { BeatLoader } from 'react-spinners';

const Spinner = ({height}) => {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      <BeatLoader color="#ff6347" size={50} />
    </div>
  );
};

export default Spinner;
