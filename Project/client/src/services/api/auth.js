import useLocalStorage from "../../hooks/useLocalStorage"

export const StorageName = 'REACT_TOKEN_AUTH_KEY'



export async function Login(username,password){
    const {} = useLocalStorage(StorageName,{})
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username":username,
            "password":password
        }),
    }

    const res = await fetch('api/v1/auth/login', requestOptions)
    .then(res => res.json().then(data =>({status: res.status, body:data}))).then(data=>{
        if(data.status === 200){

        }
        return data
    })
}

export async function logout() {
    await this.delete('/tokens');
    localStorage.removeItem('accessToken');
}