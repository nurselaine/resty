import React, { useState } from 'react';
import TextBox from './Textbox';

import './form.scss';
import { act } from 'react-dom/test-utils';

export default function Form(props){

  const [method, setMethod] = useState('GET');
  const [newObj, setNewObj] = useState({});
  const [active, setActive] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method: method,
      url: 'https://pokeapi.co/api/v2/pokemon',
    };
    props.handleApiCall(formData);
    e.target.reset();
    setActive(false);
  };

  const handleMethod = (e) => {
    setMethod(e.target.id);
  };

  const getText = (newTextObj) => {
    setNewObj(newTextObj);
  }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' />
            <button type="submit">GO!</button>
          </label>
          { 
            method === 'put' || method === 'post' ? 
            <TextBox getText={getText}/>
            : ''
          }
          <label onClick={handleMethod} className="methods">
            <span id="get" onClick={() => setActive(true)} className={active && method.toLowerCase() === 'get' ? 'active' : ''}>GET</span>
            <span id="post" onClick={() => setActive(true)} className={active&& method.toLowerCase() === 'post'  ? 'active' : ''}>POST</span>
            <span id="put" onClick={() => setActive(true)} className={active && method.toLowerCase() === 'put'  ? 'active' : ''}>PUT</span>
            <span id="delete" onClick={() => setActive(true)} className={active && method.toLowerCase() === 'delete'  ? 'active' : ''}>DELETE</span>
          </label>
        </form>
      </>
    );
}