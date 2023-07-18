import React from 'react';
import { marked } from 'marked';

const Previewer = ({ text }) => {
  return (
    <div className='container outline'>
      <div className='toolbar'>Previewer</div>
      <div
        id='preview'
        dangerouslySetInnerHTML={{ __html: marked(text) }}
      ></div>
    </div>
  );
};

export default Previewer;
