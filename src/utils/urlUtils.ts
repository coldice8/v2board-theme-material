export const clashInstallConfig = (url: string | undefined) => {
  if (url) window.location.href = 'clash://install-config?url=' + url;
};