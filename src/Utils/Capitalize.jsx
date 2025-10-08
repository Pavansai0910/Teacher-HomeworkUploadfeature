export default function capitalize(str) {
  if (!str) return;
  // Capitalize the first letter of each word, handling parentheses
  return str.replace(/\b\w/g, char => char.toUpperCase());
};
