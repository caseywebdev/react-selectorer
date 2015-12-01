export default (haystack, needle) => {
  if (haystack.indexOf) return haystack.indexOf(needle);
  for (let i in haystack) if (haystack[i] === needle) return parseInt(i);
  return -1;
};
