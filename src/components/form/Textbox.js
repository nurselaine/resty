import React from 'react';

export default function TextBox({getText}) {
  const text = (e) => {
    getText(e.target.value)
  }

  return (
      <textarea onChange={text} name='Textbox' rows='10' placeholder="Enter pokemon here..."></textarea>
  )
} 