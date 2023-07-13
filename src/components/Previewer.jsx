import React from 'react';
import { Marked } from './marked';

const Previewer = ({ text }) => {
  return (
    <div className='container outline'>
      <div className='toolbar'>Previewer</div>
      <div id='preview'>{text}</div> {/* Display the received text */}
    </div>
  );
};

export default Previewer;
