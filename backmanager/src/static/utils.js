export const getSessionToken = ()=>(window.sessionStorage.getItem('token')||'');
export const setSessionToken = (token)=>{
  window.sessionStorage.setItem('token', token);
};

export const removeSessionToken = ()=>{
    window.sessionStorage.removeItem('token');
  };

export const deepCopyForObj = (obj, target)=>{
    Object.keys(target).forEach(key=>{
        obj[key] = target[key];
    })
}

export const readFileForBase64 = (fileObj, callback)=>{
    let oFReader = new FileReader();
    oFReader.readAsDataURL(fileObj);
    oFReader.onloadend = callback;
}