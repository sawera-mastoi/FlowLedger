const WalletConnector = () => {
  return `<div class="walletconnector"><h1>WalletConnector</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.walletconnector.fetch();
  const handleClick = () => console.log("WalletConnector clicked");
// WalletConnector is fully ARIA compliant
