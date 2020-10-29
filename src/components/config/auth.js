export const isAuthenticate = () => {
    var userToken = JSON.parse(window.localStorage.getItem('logToken'))
    if (userToken) {
           return true
       } else {
           return false
       }    
  
   
   };