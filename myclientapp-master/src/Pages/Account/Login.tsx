import React, { useState } from 'react'
import { useSignInMutation } from '../../Api/accountApi'
import { apiResponse } from '../../Interfaces/apiResponse';
import { useDispatch } from 'react-redux';
import userModel from '../../Interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import { setLoggedInUser } from '../../Storage/Redux/authenticationSlice';
import {useNavigate} from "react-router-dom"
import { ToastrNotify } from '../../Helper';
function Login() {

    const [userData,setUserDataState] = useState({
        userName:"",
        password:"",
    })
    const navigate = useNavigate();
    const [userSignInMutation] = useSignInMutation();
    const Dispatch = useDispatch();


    const handleLoginSubmit = async () => {
            const response : apiResponse = await userSignInMutation({
                userName:userData.userName,
                password:userData.password
            })

            if (response.data?.isSuccess) {
                const token = response.data.result.token;
                localStorage.setItem("token",token);
                const {nameid,email,role,fullName} : userModel = jwtDecode(token);
                Dispatch(setLoggedInUser({
                    nameid,email,role,fullName
                }))

                navigate("/");
                ToastrNotify("Giriş Başarılı","success");

              }
    }



    return (
        <section>
       <div className="container">
         
         <div className="alert alert-warning text-center my-4">
           GALERİM
         </div>
         
         <div className="row justify-content-center">
           <div className="col-12 col-md-8 col-lg-8 col-xl-6">
             <div className="row">
               <div className="col text-center">
                 <h1>Giriş Yap</h1>
                 <p className="text-h3">Birbirinden Farklı Lüks Spor Arabaları Keşfet, Dilediğin Fiyata Al </p>
               </div>
             </div>
             <div className="row align-items-center">
               <div className="col mt-4">
                 <input type="text" className="form-control" placeholder="UserName" onChange={(e) => setUserDataState((prevState) => {return{...prevState,userName:e.target.value}})}/>
               </div>
             </div>
           
             <div className="row align-items-center mt-4">
               <div className="col">
                 <input type="password" className="form-control" placeholder="Password" onChange={(e) => setUserDataState((prevState) => {return{...prevState,password:e.target.value}})} />
               </div>
    
             </div>
             <div className="row justify-content-start mt-4">
               <div className="col">
                 <button onClick={()=>handleLoginSubmit()} className="btn btn-primary mt-4">Giris Yap</button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
     )
}

export default Login
