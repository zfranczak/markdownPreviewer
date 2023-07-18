import React, { useState } from 'react';
import Editor from './components/Editor';
import Header from './components/Header';
import Previewer from './components/Previewer';

const App = () => {
  const [text, setText] = useState('');

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <div className='container'>
      <Header />
      <Editor onTextChange={handleTextChange} />
      <Previewer text={text} />
    </div>
  );
};

export default App;
