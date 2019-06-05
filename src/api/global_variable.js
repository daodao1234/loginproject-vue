let BASE_URL = "";
if (window.location.href.includes("paas")) {
  if (window.location.href.includes("0-0")) {
    BASE_URL = 'https://';
  } else {
    BASE_URL = 'https://';
  }
} else {
  BASE_URL = 'http://localhost:8080';
}
export default {
  BASE_URL
}