'use strict';

export default function History({history, updateData}){

  const handleClick = (e) => {
    updateData(e.target.value);
  };

  return (
    <ul>
      {
        history.map((requestBody, i) => {
          return (
            <li key={`url-${i}`} value={requestBody} onClick={() => updateData(requestBody)} >{requestBody.url}</li>
          )
        })
      }
    </ul>
  )
}