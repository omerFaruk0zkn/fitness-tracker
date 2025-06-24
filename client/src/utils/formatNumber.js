export const formatNumber = (value) => {
  if (value == null) return "";

  const str = String(value);
  const parts = str.split(".");

  if (parts[1]?.startsWith("0")) {
    return parts[0];
  }

  return Number.isInteger(value) ? value : value.toFixed(1);
};
