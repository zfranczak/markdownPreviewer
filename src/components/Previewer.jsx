import React from 'react';
import { marked } from './Marked';

const Previewer = ({ text }) => {
  marked.use({
    async: true,
    pedantic: false,
    gfm: true,
  });
  return (
    <div className='container outline'>
      <div className='toolbar'>Previewer</div>
      <div id='preview'>{text}</div> {/* Display the received text */}
    </div>
  );
};

export default Previewer;
