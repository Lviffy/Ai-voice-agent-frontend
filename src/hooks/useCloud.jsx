export function useCloud() {
  const generateToken = async () => {
    throw new Error("Cloud mode not implemented");
  };
  const wsUrl = "";

  return { generateToken, wsUrl };
}
