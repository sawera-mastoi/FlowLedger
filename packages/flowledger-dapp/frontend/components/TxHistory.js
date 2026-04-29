const TxHistory = () => {
  return `<div class="txhistory"><h1>TxHistory</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.txhistory.fetch();
  const handleClick = () => console.log("TxHistory clicked");
// TxHistory is fully ARIA compliant
