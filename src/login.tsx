import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
export default function Login() {
  const [role, setRole] = useState('employee');
  const [id, setId] = useState('');
  const[key,setKey]=useState('');
  // const [adminId, setAdminId] = useState('');
  const router=useRouter();
  const handleRoleChange = (e:any) => {
    setRole(e.target.value);
    
  };
  const handleEmployeeIdChange = (e:any) => {
    // setEmployeeId(e.target.value);
    const value = e.target.value;
    if (value.length <= 4 && /^[0-9]*$/.test(value)) {
        setId(value);
      }
  };
  const handleAdminIdChange = (e:any) => {
    // setAdminId(e.target.value);
    const value = e.target.value;
    if (value.length <= 4 && /^[0-9]*$/.test(value)) {
      setId(value);
    }
  };
  const handleAdminKeyChange=(e:any)=>{
    const value=e.target.value;
    if(value.length<=4&&/^[0-9]*$/.test(value)){
      setKey(value)
    }
  }
  const handleLogin = () => {
    console.log(id)
    // axios.post('/api/login',{id,role:role})
    // .then((val)=>{
    //     if(val.data.valid){
    //       role==='employee'&&router.push({pathname:'/home',query:{id:id}},'/home')
    //       role==='admin'&& (key==='6789'&&(router.push('/admin')))
    //     }else{
    //         alert('Invalid id')
    //     }
    // })
  axios.post('.netlify/functions/loginApi',{id,role})
    .then(response=>{console.log(response.data,role)
                if(response.data.valid===true){
                  role==='employee'&&router.push('/home')
                  role==='admin'&& (key==='6789'&&(router.push('/admin')))
                }else{
                  alert('Invalid id')
                }
              })
    .catch(k=>console.log('error'))
    axios.post('.netlify/functions/menu',['rice','book'])
    .then(reponse=>console.log(reponse.data))

  axios.get(`.netlify/functions/employee?id=${id}`)
  .then(response=>console.log(response.data))
  
  axios.post(`.netlify/functions/employee?id=${id}`,{val:"yes"})
  .then(response=>console.log(response.data))
  axios.get(`.netlify/functions/employee?id=${id}&role=admin`)
  .then(response=>console.log(response.data))
  axios.get('.netlify/functions/supabase')
  .then(response=>console.log(response.data))
  // auth
  axios.post('.netlify/functions/auth',{id,role})
  .then(response=>{
    const headers = response.headers;
     // Access a specific header value (e.g., Authorization)
const authorizationHeader=headers.authorization
console.log('post',authorizationHeader)
localStorage.setItem('token',authorizationHeader)
  }
    )
    console.log(localStorage.getItem('token'))
    // set header in server<<<<<<<<<<<<<<<<<<<<<<<<<<
    if(localStorage.getItem('token')){
      const x=localStorage.getItem('token')
      console.log('get',x)
    axios.get('https://netlify-code--transcendent-toffee-89a6b6.netlify.app/.netlify/functions/auth',
    {
      headers:{
        'Authorization':`Bearer ${x}`,
      }
    }).then(response=>console.log(response.data))
    }

       };
  const isLoginDisabled =
   (id === '' || id.length !== 4)
  return (
    <>
      <div className="h-screen flex justify-center items-center w-full bg-blue-200">
        <div className="h-[550px] sm:h-[500px] w-full mx-7 sm:w-[800px]  rounded-2xl shadow-xl flex justify-center items-center overflow-hidden">
          <div className="hidden min-h-full sm:flex justify-center items-center w-[50%] bg-blue-400">
            <img src='/images/sdetLogo.png'/>
          </div>
          <div className="flex items-center justify-center w-full sm:w-[50%] h-full bg-slate-200">
            <div className="px-4">
              <div className="mb-2 font-bold">Login as:</div>
              <select
                value={role}
                onChange={handleRoleChange}
                className="block w-full p-2 border rounded mb-4"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
              {role === 'employee' && (
                <>
                  <input
                    type="number"
                    placeholder="Enter your Employee ID"
                    className="block w-full p-2 border rounded mb-4"
                    value={id}
                    onChange={handleEmployeeIdChange}
                  />
                </>
              )}
              {role === 'admin' && (
                <>
                  <input
                    type="number"
                    placeholder="Enter your Admin ID"
                    className="block w-full p-2 border rounded mb-4"
                    value={id}
                    onChange={handleAdminIdChange}
                  />
                  <input
                    type='number'
                    placeholder='Enter key'
                    className="block w-full p-2 border rounded mb-4"
                    value={key}
                    onChange={handleAdminKeyChange}
                    />
                </>
              )}
              <button
                onClick={handleLogin}
                disabled={isLoginDisabled}
                className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded ${
                    isLoginDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



