
export const appKey = "";
export const appSecret = "";

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