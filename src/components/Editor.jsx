import React from 'react';
import '../styles/editor.css';

const Editor = ({ onTextChange, text }) => {
  const handleChange = (e) => {
    const newText = e.target.value;
    onTextChange(newText);
  };

  return (
    <div className='container outline'>
      <div className='toolbar'>Editor</div>
      <textarea
        id='editor'
        className='editorTextBox'
        onChange={handleChange}
        value={text}
      />
    </div>
  );
};

export default Editor;
