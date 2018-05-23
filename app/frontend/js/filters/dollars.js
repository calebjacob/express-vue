import formatUsd from 'format-usd';



function dollars(value) {
  if (value || value === 0) {
    return formatUsd({
      amount: value
    });
  }


  return null;
}



export default dollars;
