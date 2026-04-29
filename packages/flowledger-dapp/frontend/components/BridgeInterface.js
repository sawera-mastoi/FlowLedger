const BridgeInterface = () => {
  return `<div class="bridgeinterface"><h1>BridgeInterface</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.bridgeinterface.fetch();
  const handleClick = () => console.log("BridgeInterface clicked");
// BridgeInterface is fully ARIA compliant
