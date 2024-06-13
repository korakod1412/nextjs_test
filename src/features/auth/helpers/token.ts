export const generateRefreshToken = () => {
  return {
    refreshToken: crypto.randomUUID(),
    refreshTokenExpires: 60 * 60 * 24 * 90,
  };
};
