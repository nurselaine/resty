import React from 'react';
import JSONPretty from 'react-json-pretty';
import './results.scss';

export default function Results(props) {
  let JSONPrettyAcai = require('react-json-pretty/themes/1337.css');
  const render = props.list;
  // console.log(render);

  const options = {
    linksUrls: true,
    indent: 4,
  }

  return (
    <>
      {
        props.data !== {} ?
          <section data-testid='results-testId' id='results'>
            {/* <pre className='pre-headers'>{`Headers: ${JSON.stringify(props.data.headers, undefined, 2)}`}</pre> */}
            {/* <pre className='pre-count'>{`Count: ${JSON.stringify(props.data.count, undefined, 2)}`}</pre> */}
            {/* <pre className='pre-data'>{`Data: ${JSON.stringify(props.data.results, undefined, 2)}`}</pre> */}
            {/* <pre id='account' class='json-container'>{prettyPrintJson.toHtml(props.data, options)}</pre> */}
            {/* <ul>
              {
                render.map((pokemon, index) => (<li>{JSON.stringify({pokemon})}</li>))
              }
            </ul> */}
            <JSONPretty id='json-pretty' data={JSON.stringify(props.data)} theme={JSONPrettyAcai}></JSONPretty>
          </section>
          : ''
      }
    </>
  );
};