import { useEffect, useState } from "react";
import './User.css';
import { useSelector, useDispatch } from "react-redux";
import { setislogin } from "./reducers/IsLogin";
const User = () => {
    
    //redux
    const IsLogin=useSelector((state)=>state.isLogin.isLogin);
    const dispatch=useDispatch();

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const [signup,setSignUp]=useState(false);


    useEffect(()=>{
        fetch('http://localhost:3000/api/v1/profile',{
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                dispatch(setislogin(true));
            }
            else{
                dispatch(setislogin(false));
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        const user={name, email,password };
        
        fetch('http://localhost:3000/api/v1/login',{ 
            method:'POST',
            headers: { 'Content-Type': 'application/json',
                        'Accept':'application/json, text/plain, */* ' },
            body:JSON.stringify(user),
        })
        .then((res)=>{
            if(res.status===200){
                dispatch(setislogin(true));
            }
            else{
                window.alert('登入失敗');
            }
        })
        .catch((err)=>{
            console.log(err.message);
            window.alert("系統錯誤，請洽客服");
        })
    }
    const handlelogout=()=>{

        fetch('http://localhost:3000/api/v1/logout',{
            method:'GET'
        })
        .then((res)=>{
            setName('');
            setEmail('');
            setPassword('');
            dispatch(setislogin(false));
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const handelSignup=(e)=>{
        e.preventDefault();
        const user={name, email,password };
        fetch('http://localhost:3000/api/v1/signup',{ 
            method:'POST',
            headers: { 'Content-Type': 'application/json',
                        'Accept':'application/json, text/plain, */* ' },
            body:JSON.stringify(user),
        })
        .then((res)=>{
            if(res.status===200){
                window.alert('註冊成功，請登入');
            }
            else{
                window.alert('登入失敗');
            }
        })
        .catch((err)=>{
            console.log(err.message);
            window.alert("系統錯誤，請洽客服");
        })
    }
    return (
        <div className="loginPage_wrapper">
            {IsLogin && <div className="loginPage_title">會員中心</div>}
            {!(IsLogin) && ((signup)? <div className="loginPage_title" onClick={()=>setSignUp(~signup)} >會員註冊</div> : <div className="loginPage_title" onClick={()=>setSignUp(~signup)}>會員登入</div>)}
            {IsLogin && <button className="loginPage_logoutbtn" onClick={handlelogout}>登出</button>}
            {!(IsLogin) && ((signup)? 
            <form onSubmit={ handelSignup } className="loginPage_form">
                <label>Name</label>
                <input className="loginPage_form-input" type="text" required value={name} onChange={(e)=>setName(e.target.value)}/><br/>
                <label>Email</label>
                <input className="loginPage_form-input" type="text" required value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
                <label>Password</label>
                <input className="loginPage_form-input--password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/><br/>
                <button className="loginPage_form-loginbtn">註冊</button>
            </form>
            :
            <form onSubmit={ handleSubmit } className="loginPage_form">
                <label>Name</label>
                <input className="loginPage_form-input" type="text" required value={name} onChange={(e)=>setName(e.target.value)}/><br/>
                <label>Email</label>
                <input className="loginPage_form-input" type="text" required value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
                <label>Password</label>
                <input className="loginPage_form-input--password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/><br/>
                <button className="loginPage_form-loginbtn">登入</button>
            </form> )}
        </div>
    );
}
 
export default User;