const NotificationCenter = () => {
  return `<div class="notificationcenter"><h1>NotificationCenter</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.notificationcenter.fetch();
