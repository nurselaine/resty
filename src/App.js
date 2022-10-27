import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import { CircleLoader } from 'react-spinners';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header/index';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

export default function App() {

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [payload, setPayload] = useState({});
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  // const [history, setHistory] = useState([]);

  const requestMethods = {};
  // const [preventDoubleRequest, setpreventDoubleRequest] = useRef(false);

  // const updateHistory = (url) => {
  //   // let stack = history.push(url);
  //   setHistory(url);
  // }

  useEffect(() => {
    if (requestParams.method) {
      const callApi = () => {
        const request = requestMethods[requestParams.method];
        request(requestParams);
        setloading(false);
      };
      callApi();
    }
  }, [requestParams]);

  const updateData = (requestParams) => {
    console.log(requestParams);
    setRequestParams(requestParams);
  }

  const getMethod = async (params) => {
    try {
      setloading(true);
      let newCount = 1 + count;
      const data = await axios.get(params.url);
      console.log('new data', data);
      setData(() => data.data);
      setCount(() => newCount);
      setPayload({
        headers: data.headers,
        count: newCount,
        results: data.data,
      });
    } catch (e) {
      console.log('ERROR: ', e);
    }
  };
  requestMethods.get = getMethod;

  const postMethod = async (payload) => {
    try {
      const data = await axios.post(payload.endpoint, payload);
      console.log(data);
      setloading(false);
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

  console.log(requestParams);
  return (
    <div id='App'>
      <main>
        <Header />
        <section className='request'>
          <div>Request Method: {JSON.stringify(requestParams.method)}</div>
          <div>URL: {requestParams.url}</div>
        </section>
        <Form handleApiCall={updateData} />
        {
          // data && <Results data={payload} loading={loading} />
            loading && data ?
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
