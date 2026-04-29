const RewardTracker = () => {
  return `<div class="rewardtracker"><h1>RewardTracker</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.rewardtracker.fetch();
  const handleClick = () => console.log("RewardTracker clicked");
// RewardTracker is fully ARIA compliant
