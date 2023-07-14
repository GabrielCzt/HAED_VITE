import Cookies from "universal-cookie";

const cookie = new Cookies();

const cambio =(action)=>{
    if(action==="switch"){
        if(cookie.get("theme")!=="light"){
            root.style.setProperty('--black','#0E0E0E');
            root.style.setProperty('--white','#ffffff');
            root.style.setProperty('--non-black-haed','#16161a');
            root.style.setProperty('--non-white-haed','#f5f5f5');
            root.style.setProperty('--titulos','#104141');
            root.style.setProperty('--haed','#006d77');
            root.style.setProperty('--blue','#A6E3E9AF');

            cookie.set("theme","light",{path:"/"})
      
          }
          else{
            root.style.setProperty('--haed','#02383D');
              root.style.setProperty('--white','#000000');
              root.style.setProperty('--black','#B1AFAF');
              root.style.setProperty('--non-black-haed','#A8A8A8');
              root.style.setProperty('--non-white-haed','#0D0D0E');
              root.style.setProperty('--titulos','#04AFAF');
              root.style.setProperty('--blue','#005057AF');  
              cookie.set("theme","dark",{path:"/"});
          }
    }
    else{
        if(cookie.get("theme")==="light"){
            root.style.setProperty('--black','#0E0E0E');
            root.style.setProperty('--white','#ffffff');
            root.style.setProperty('--non-black-haed','#16161a');
            root.style.setProperty('--non-white-haed','#f5f5f5');
            root.style.setProperty('--titulos','#104141');    
            root.style.setProperty('--haed','#006d77');
            root.style.setProperty('--blue','#A6E3E9AF');  
          }
          else{
              root.style.setProperty('--white','#0E0E0E');
              root.style.setProperty('--black','#ffffff');
              root.style.setProperty('--non-black-haed','#f5f5f5');
              root.style.setProperty('--non-white-haed','#16161a');
              root.style.setProperty('--titulos','#018d8d');
              root.style.setProperty('--haed','#034b52');
              root.style.setProperty('--blue','#A6E3E9AF');  
              root.style.setProperty('--blue','#003338AF');  
          }
    }
    
    
}


export default cambio