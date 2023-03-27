export const getJwt = (): string | null => {
  const token = localStorage.getItem("jwt");
  return token ? token : null;
};
