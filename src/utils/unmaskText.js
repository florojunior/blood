const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,.\\ ]/g;
const re = new RegExp(defaultDelimiters);

export default function unmaskText(text) {
  return text ? String(text).replace(re, '') : text;
}
