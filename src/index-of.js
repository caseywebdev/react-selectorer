export default (haystack, needle) => {
  if (haystack.indexOf) return haystack.indexOf(needle);
  for (const i in haystack) if (haystack[i] === needle) return parseInt(i);
  return -1;
};
