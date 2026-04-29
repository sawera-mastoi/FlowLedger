const Dashboard = () => {
  return `<div class="dashboard"><h1>Dashboard</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.dashboard.fetch();
  const handleClick = () => console.log("Dashboard clicked");
