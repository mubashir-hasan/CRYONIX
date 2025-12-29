import React, { useState, useEffect } from 'react'
import { data,replace,useNavigate } from 'react-router-dom';
import '../admin/LoginPage/Login.css';


function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

    const response = await fetch('http://localhost:5000/api/user/user_login',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify({
            email:email,
            password:password
        })
    });

    const data = await response.json();

    if(data.status){
        localStorage.setItem('accessToken', data.token);
        navigate('/user/products', {replace:true});
    }else{
        localStorage.setItem('accessToken', 'Fucked')
    }

    console.log(data);
    }


  return (
    <div className='login-container mx-auto my-5 rounded-3'>
        <div className='p-5 border rounded shadow p-3 mb-5 bg-body-tertiary rounded-3'>
            <h2 className='text-center mb-4'>Admin Login Screen</h2>

            <form onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email address</label>
                    <input type="email" id="email" required placeholder='example@gmail.com' className="form-control" value={email} onChange={(e) =>setEmail(e.target.value)} />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" required className="form-control" value={password} onChange={(e) =>setPassword(e.target.value)} />
                </div>

                <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-dark text-center w-100 mt-4 w-md-auto">Login</button>
            </form>

        </div>
    </div>
  )
}

export default UserLogin;