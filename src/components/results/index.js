import React from 'react';
import './results.scss';

export default function Results(props) {

  return (
    <section id='results'>
      <pre>{`Headers: ${JSON.stringify(props.data.headers, undefined, 2)}`}</pre>
      <pre>{`Count: ${JSON.stringify(props.data.count, undefined, 2)}`}</pre>
      <pre>{`Data: ${JSON.stringify(props.data, undefined, 2)}`}</pre>
    </section>
  );
};