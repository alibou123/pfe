const LocalStorageService = () => {
  const _getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  const _setAccessToken = (accessToken) => {
    localStorage.setItem("access_token", accessToken);
  };

  return {
    setAccessToken: _setAccessToken,
    getAccessToken: _getAccessToken,
  };
};
export default LocalStorageService;
