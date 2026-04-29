const SecurityAudit = () => {
  return `<div class="securityaudit"><h1>SecurityAudit</h1></div>`;
};
  let state = { loading: false };
  const data = await sdk.securityaudit.fetch();
