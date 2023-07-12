import React from 'react';
import Editor from './components/Editor';
import Header from './components/Header';
import Previewer from './components/Previewer';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <Editor />
      <Previewer />
    </div>
  );
};

export default App;
