export default function capitalizeSubject(str) {
  if (!str) return;
  // Capitalize the first letter of each word, handling parentheses
  return str.replace(/\b\w/g, char => char.toUpperCase());
};
