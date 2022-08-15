export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('usuario'));

    if(user && user.accessToken){


        console.log(user);
        return { Authorization: `Bearer ${user.accessToken}`};

        // {headers : {"Authorization": `Bearer ${token}`}
        

    }else {
        return {};
    }

   
    


}