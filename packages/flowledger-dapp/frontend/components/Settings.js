const Settings = () => {
  return `<div class="settings"><h1>Settings</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.settings.fetch();
  const handleClick = () => console.log("Settings clicked");
// Settings is fully ARIA compliant
