import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './App.scss';
import { CircleLoader } from 'react-spinners';

import Header from './components/header/index';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from './components/history';

export const ACTION = {
  RESPONSE_DATA: 'response-data',
  REQUEST_PARAMS: 'request-params',
  ADD_PAYLOAD: 'add-payload',
  LOADING: 'loading',
  SET_COUNT: 'set-count',
  SET_HISTORY: 'set-history',
  SET_LOCAL_STORAGE_HISTORY: 'set_local_storage_history',
  SHOW_HISTORY: false,
}

export const reduce = (state, action) => {
  switch (action.type){
    case ACTION.RESPONSE_DATA: return action.payload.response_data;
    case ACTION.REQUEST_PARAMS: return action.payload.request_params;
    case ACTION.ADD_PAYLOAD: return action.payload.payload;
    case ACTION.LOADING: return action.payload.loading;
    case ACTION.SET_COUNT: return state + 1;
    case ACTION.SET_HISTORY: {return [...state, ...action.payload.history ]};
    case ACTION.SET_LOCAL_STORAGE_HISTORY: return action.payload.localStorage;
    case ACTION.SHOW_HISTORY: return !state;
    default: return state;
  }
};

export const initalState = {
  response_data: {},
  requestParam: {},
  payload: {},
  loading: false,
  count: 0,
  history: [],
};

export default function App() {
  const [respone_data, responseDataDispatch] = useReducer(reduce, {});
  const [requestParams, requestParamsDispatch] = useReducer(reduce, {});
  const [payload, payloadDispatch] = useReducer(reduce, {});
  const [loading, loadingDispatch] = useReducer(reduce, false);
  const [count, countDispatch] = useReducer(reduce, 0);
  const [history, historyDispatch] = useReducer(reduce, []);
  const [showHistory, showHistoryDispatch] = useReducer(reduce, false);

  const requestMethods = {};

  useEffect(() => {
    if (requestParams.method) {
      const callApi = () => {
        const request = requestMethods[requestParams.method];
        request(requestParams);
        loadingDispatch({type: ACTION.LOADING, payload: { loading: false }});
      };
      callApi();
    }
  }, [requestParams]);

  useEffect(() => {
    if(history.length){
      storeHistory();
    }
  }, [history]);

  useEffect(() => {
    if(localStorage.History){
      retrieveHistory();
    }
    console.log('retrieve local storage')
  }, []);

  const updateData = (requestParams) => {
    console.log(requestParams,'----------------------');
    requestParamsDispatch({type: ACTION.REQUEST_PARAMS, payload: {request_params: requestParams}});
    historyDispatch({type: ACTION.SET_HISTORY, payload: { history: [requestParams] } });
  }

  const getMethod = async (params) => {
    try {
      loadingDispatch({type: ACTION.LOADING, payload: { loading: true }});
      const data = await axios.get(params.url);
      responseDataDispatch({type: ACTION.RESPONSE_DATA, payload: {response_data: data.data}});
      countDispatch({type: ACTION.COUNT})
      let payload = {
        headers: data.headers,
        count: count,
        results: data.data,
      }
      payloadDispatch({type: ACTION.ADD_PAYLOAD, payload: {payload}})
    } catch (e) {
      console.log('ERROR: ', e);
    }
  };
  requestMethods.get = getMethod;

  const postMethod = async (payload) => {
    try {
      const data = await axios.post(payload.endpoint, payload);
      console.log(data);
    } catch (e) {
      console.log('ERROR: ', e);
    }
  };
  requestMethods.post = postMethod;

  const putMethod = async (payload) => {
    try {
      const data = await axios.put(`${payload.url}${payload.id}`, payload.body);
      console.log(data);
    } catch (e) {
      console.log('ERROR: ', e);
    }
  };
  requestMethods.put = putMethod;

  const deleteMethod = async (payload) => {
    try {
      await axios.delete(`${payload.url}/${payload.id}`);
      console.log('Successfully Deleted!');
    } catch (e) {
      console.log(`Error occured while deleting ${e}`);
    }
  };
  requestMethods.delete = deleteMethod;

  const handleHistory = () => {
    showHistoryDispatch({ type: ACTION.SHOW_HISTORY });
  }

  const storeHistory = () => {
    let stringifiedHistory = JSON.stringify(history);
    localStorage.setItem('History', stringifiedHistory);
  };

  const retrieveHistory = () => {
    let prevData = localStorage.getItem('History') || [];
    let parsedData = JSON.parse(prevData);
    historyDispatch({type: ACTION.SET_HISTORY, payload: {history: parsedData}});
  };

  console.log(history);
  return (
    <div id='App'>
      <main>
        <Header />
        <section className='request'>
          <div>Request Method: {JSON.stringify(requestParams.method)}</div>
          <div>URL: {requestParams.url}<span onClick={handleHistory}>v</span></div>
          {
            showHistory ? <History updateData={updateData} history={history} /> : ''
          }
        </section>
        <Form handleApiCall={updateData} />
        {
            loading && respone_data ?
            <CircleLoader
            loading={loading}
            color={'#f5f545'}
            size={150}
            aria-label='Loading spinner'
            className='loading-spinner'
          /> 
          : <Results data={payload} loading={loading}/>
        }
      </main>
      <Footer />
    </div>
  );
}
