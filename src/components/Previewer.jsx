import React from 'react';
import { marked } from 'marked'; // Import the 'marked' library

marked.setOptions({
  breaks: true,
  mangle: false,
  headerIds: false,
});

const Previewer = ({ text }) => {
  const html = marked(text);

  return (
    <div className='container outline'>
      <div className='toolbar'>Previewer</div>
      <div id='preview' dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};
// testing revert

export default Previewer;
