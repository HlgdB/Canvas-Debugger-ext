import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import './popup.css';

const Index = () => {
  const [exist, setExist] = useState(false);

  useEffect(async () => {
    function detect(){
      const canvas_count = document.getElementsByTagName('canvas').length;
      chrome.runtime.sendMessage({canvas_count: canvas_count});
    };
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: detect
    });
    return () => {};
  }, [1]);

  console.log("test source-map!")

  chrome.runtime.onMessage.addListener((message) => {
    const { canvas_count } = message;
    if(canvas_count !== undefined) {
      console.log("message", message);
      if(canvas_count > 0){
        setExist(true);
      }
    }
  });

  return(
    <h3 style={{ color: exist ? '#2ecc71' : '#c0392b' }}>{ exist ? "The canvas element was found on the current page." : "There is no canvas element in the current page." }</h3>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));