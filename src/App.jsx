import React, { useState } from 'react';
import Editor from './components/Editor';
import Header from './components/Header';
import Previewer from './components/Previewer';

const App = () => {
  const initialText = `# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here\'s some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == \'\`\`\`\' && lastLine == \'\`\`\`\') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There\'s also [links](https://www.zacharyfranczak.com), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![Doggo](https://images.pexels.com/photos/3487734/pexels-photo-3487734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)
  
  `;

  const [text, setText] = useState(initialText);

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <div className='container'>
      <Header />
      <Editor onTextChange={handleTextChange} text={text} />
      <Previewer text={text} />
    </div>
  );
};

export default App;
