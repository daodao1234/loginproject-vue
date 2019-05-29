// get cookie
export function getCookie(param) {
  let c_param = '';
  if (document.cookie.length > 0) {
    let arr = document.cookie.split('; '); 
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].split('='); 
      if (arr2[0] == param) {
        c_param = arr2[1];
      }
    }
    return c_param;
  }
};


export function compareTime(cookieTime){
    let date = new Date();
    let localTime = date.getTime().toString().slice(0,date.getTime().toString().length-3);
    if(cookieTime > localTime){
      return true;
    }else{
      return false;
    }
}
