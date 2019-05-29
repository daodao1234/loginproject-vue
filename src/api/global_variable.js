let BASE_URL = "";
if (window.location.href.includes("wise-paas")) {
  if (window.location.href.includes("0-0")) {
    BASE_URL = 'https://login-admin-acniotsense-0-0-1-srppractice.wise-paas.cn';
  } else {
    BASE_URL = 'https://login-admin-acniotsense-srppractice.wise-paas.cn';
  }
} else {
  BASE_URL = 'http://localhost:8080';
}
export default {
  BASE_URL
}