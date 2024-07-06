export const setCurrentStaffID = (id)=>{
    window.localStorage.setItem('current_staff_id',id);
   }
export const getCurrentStaffID = ()=>{
       try{
       return window.localStorage.getItem('current_staff_id');
       }
       catch(err){
           console.log(err);
       }
   }