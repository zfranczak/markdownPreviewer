import React from 'react';

const Previewer = ({ text }) => {
  return (
    <div className='container outline'>
      <div className='toolbar'>Previewer</div>
      <div id='previewer'>{text}</div> {/* Display the received text */}
    </div>
  );
};

export default Previewer;
