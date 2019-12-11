
export const appKey = "kid_rJEkKEZpS";
export const appSecret = "e20207bfd1c34e4fae7d49aa6eae2fda";

function saveData(key, value) {
  localStorage.setItem(key+appKey, JSON.stringify(value));
}
//userInfo взима данните на юзъра
export function getData(key){
  return localStorage.getItem(key+appKey);
}

export function saveUser(data){
  saveData("userInfo",data);
  saveData("authToken", data._kmd.authtoken);
}

export function removeUser(){
  localStorage.clear();
}