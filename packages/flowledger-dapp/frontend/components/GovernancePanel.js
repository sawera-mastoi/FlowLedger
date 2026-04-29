const GovernancePanel = () => {
  return `<div class="governancepanel"><h1>GovernancePanel</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.governancepanel.fetch();
