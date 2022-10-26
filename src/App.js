import React, { useState } from 'react';
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

  const requestMethods = {};

  const callApi = (requestParams) => {
    console.log('call api function', requestParams);
    setloading(true);
    const request = requestMethods[requestParams.method];
    request();
    setRequestParams(requestParams);
    setloading(false);
  };

  const getMethod = async () => {
    try {
      let newCount = 1 + count;
      const data = await axios.get(requestParams.url);
      setData(data);
      setCount(newCount);
      setPayload({
        results: data,
        count: newCount,
        headers: data.headers,
      });
    } catch (e) {
      console.log('ERROR: ', e);
    }
  };
  requestMethods.get = getMethod;

  // const postMethod = async (payload) => {
  //   try {
  //     const data = await axios.post(payload.endpoint, payload);
  //     console.log(data);
  //     setloading(false);
  //   } catch (e) {
  //     console.log('ERROR: ', e);
  //   }
  // };
  // requestMethods.post = postMethod;

  // const putMethod = async (payload) => {
  //   try {
  //     const data = await axios.put(payload.endpoint, payload);
  //     console.log(data);
  //   } catch (e) {
  //     console.log('ERROR: ', e);
  //   }
  // };
  // requestMethods.put = putMethod;

    return (
      <React.Fragment>
        <Header />
        <section className='request'>
          <div>Request Method: {JSON.stringify(requestParams.method).toUpperCase()}</div>
          <div>URL: {requestParams.url}</div>
        </section>
        <Form handleApiCall={callApi} />
        {
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
        <Footer />
      </React.Fragment>
    );
}
