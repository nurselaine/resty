import React, { useState } from 'react';
import TextBox from './Textbox';

import './form.scss';

export default function Form(props){

  const [method, setMethod] = useState('get');
  const [newObj, setNewObj] = useState({});
  const [active, setActive] = useState(false);
  const [url, setUrl] = useState('');
  const [id, setId] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      body: newObj,
      id: id,
    };
    props.handleApiCall(formData);
    e.target.reset();
    setActive(false);
  };

  const getUrl = (e) => {
    setUrl(e.target.value);
    // props.history(e.target.value);
  }

  const getText = (newTextObj) => {
    setNewObj(newTextObj);
  }

  const getId = (e) => {
    setId(e.target.value);
  }

    return (
      <>
        <form data-testid='form' onSubmit={handleSubmit}>
          <label >
            <span>URL: </span>
            <input onChange={getUrl} name='url' type='text' />
            {
              method === 'put' || method === 'delete' ?
              <input onChange={getId} name='id' type='number'/>
              : ''
            }
            <button type="submit">GO!</button>
          </label>
          { 
            method === 'put' || method === 'post' ? 
            <TextBox getText={getText}/>
            : ''
          }
          <label className="methods">
            <span id="get" onClick={() => {setActive(true); setMethod('get')}} className={method === 'get' ? 'active' : ''}>GET</span>
            <span id="post" onClick={() => {setActive(true); setMethod('post')}} className={method === 'post'  ? 'active' : ''}>POST</span>
            <span id="put" onClick={() => {setActive(true); setMethod('put')}} className={method === 'put'  ? 'active' : ''}>PUT</span>
            <span id="delete" onClick={() => {setActive(true); setMethod('delete')}} className={method === 'delete'  ? 'active' : ''}>DELETE</span>
          </label>
        </form>
      </>
    );
}