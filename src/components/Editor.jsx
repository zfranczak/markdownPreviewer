import React from 'react';
import '../styles/editor.css';

const Editor = ({ onTextChange }) => {
  const handleChange = (event) => {
    const newText = event.target.value;
    onTextChange(newText);
  };

  return (
    <div className='container outline'>
      <div className='toolbar'>Editor</div>
      <textarea id='editor' className='editorTextBox' onChange={handleChange} />
    </div>
  );
};

export default Editor;
