import React, { useState } from 'react';
import Editor from './components/Editor';
import Header from './components/Header';
import Previewer from './components/Previewer';

const App = () => {
  const initialText = `# Markdown Previewer

  ## Sub Header
  
  This is a [link](https://www.example.com).
  
  Inline code: \`const message = 'Hello, World!';\`
  
  \`\`\`
  // Code block
  function add(a, b) {
    return a + b;
  }
  \`\`\`
  
  - List item 1
  - List item 2
  
  > This is a blockquote.
  
  ![Image](https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg)  
  
  **Bolded text**
  `;

  const [text, setText] = useState(initialText);

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
