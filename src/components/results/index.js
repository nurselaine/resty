import React from 'react';
import './results.scss';

export default function Results(props) {
    return (
      <section className='results'>
        <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
      </section>
    );
}