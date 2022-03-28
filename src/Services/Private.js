import { RouteBase } from './BaseUrl'

export async function GetRout(url){
    const response = await fetch(`${RouteBase}/${url}`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      }
    )
    .then(function(data){
        return data.json()
    }).catch(function(data){
        return []
    })
    return response
}

export async function PostRoute(url,form){
    const data = JSON.stringify
                    (
                        {
                            
                            ...form
                        }
                    );    
const response = await fetch(`${RouteBase}/${url}`,
    {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    }
)
.then(function(data) {
    return  data.json()
    }).catch(function(data) {
    
        return [];
    });

    return await response;
}

export async function PostRouteFD(url,form){
        
    form.append('usuario',JSON.parse(localStorage.getItem('authUser')).id);
   const response = await fetch(`${RouteBase}/${url}`,
       {
           method: 'POST',
           mode: 'cors',
           headers: {
               'Access-Control-Allow-Origin' : '*',
               'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authUser')).token}`,
               
           },
           body: form
       }
   ).then(function(data) { 
    return  data.json()
    }).catch(function(data) {
        return [];
    });

    return await response;
}


export default  {
    GetRout,
    PostRoute,
    PostRouteFD
}