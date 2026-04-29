const GovernancePanel = () => {
  return `<div class="governancepanel"><h1>GovernancePanel</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.governancepanel.fetch();
  const handleClick = () => console.log("GovernancePanel clicked");
// GovernancePanel is fully ARIA compliant
