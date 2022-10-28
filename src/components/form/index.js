import React, { useState, useReducer } from 'react';
import TextBox from './Textbox';

import './form.scss';

const ACTION = {
  ADD_METHOD: 'add-method',
  ADD_PAYLOAD: 'add-payload',
  ADD_URL: 'add-url',
  ADD_ID: 'add-id',
};

function reduce(state, action){
  switch (action.type){
    case ACTION.ADD_METHOD : return action.payload.method;
    case ACTION.ADD_PAYLOAD : return action.payload.requestBody;
    case ACTION.ADD_URL : return action.payload.url;
    case ACTION.ADD_ID : return action.payload.id;
    default: return state;
  }
}

export default function Form(props){
  const [method, methodDispatch] = useReducer(reduce, 'get');
  const [url, urlDispatch] = useReducer(reduce, '');
  const [requestBody, requestBodyDispatch] = useReducer(reduce, {});
  const [id, idDispatch] = useReducer(reduce, 0);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      body: requestBody,
      id: id,
    };
    props.handleApiCall(formData);
    e.target.reset();
  };

  const getUrl = (e) => {
    urlDispatch({type: ACTION.ADD_URL, payload: {url: e.target.value}})
  }

  const getText = (newTextObj) => {
    requestBodyDispatch({type: ACTION.ADD_PAYLOAD, payload: {requestBody: newTextObj}});
  }

  const getId = (e) => {
    idDispatch({type: ACTION.ADD_ID, payload: { id: e.target.value }});
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
            <span id="get" onClick={() => { methodDispatch({type: ACTION.ADD_METHOD, payload: {method: 'get'}})}} className={method === 'get' ? 'active' : ''}>GET</span>
            <span id="post" onClick={() => { methodDispatch({type: ACTION.ADD_METHOD, payload: {method: 'post'}})}} className={method === 'post'  ? 'active' : ''}>POST</span>
            <span id="put" onClick={() => { methodDispatch({type: ACTION.ADD_METHOD, payload: {method: 'put'}})}} className={method === 'put'  ? 'active' : ''}>PUT</span>
            <span id="delete" onClick={() => { methodDispatch({type: ACTION.ADD_METHOD, payload: {method: 'delete'}})}} className={method === 'delete'  ? 'active' : ''}>DELETE</span>
          </label>
        </form>
      </>
    );
}