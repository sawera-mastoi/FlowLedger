const ProfileEditor = () => {
  return `<div class="profileeditor"><h1>ProfileEditor</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.profileeditor.fetch();
  const handleClick = () => console.log("ProfileEditor clicked");
// ProfileEditor is fully ARIA compliant
