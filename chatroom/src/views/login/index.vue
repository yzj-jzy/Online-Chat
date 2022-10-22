<template>
    <div class="container">
      <div class="main">
          <!-- 整个注册盒子 -->
        <div class="loginbox">
            <!-- 左侧的注册盒子 -->
            <div class="loginbox-in">

                <div class="userbox"> 
                    <span class="user_iconfont"> <img src="../../recoures/user.png"> </span> 
                    <input  class="user" id="user"  v-model="name" placeholder="User name...">
                </div>

                <div class="emailbox"> 
                    <span class="user_iconfont"> <img src="../../recoures/email.png"> </span> 
                    <input  class="user" id="user"  v-model="email" placeholder="Email...">
                </div>
            <br>
                <div class="pwdbox">
                <span class="pwd_iconfont"> <img src="../../recoures/password.png"> </span>
                <input  class="pwd"  id="password" v-model="pwd" type="password"  placeholder="password...">
                </div>
            <br>
            <el-button class="loginBtn" @click="login()"> login </el-button>
            <router-link :to="{ path: '/register' }" class="register_btn" > Register</router-link>
            <br>
            
       </div>
   
          <!-- 右侧的注册盒子 -->
           <div class="publicity">
              <div class="title"> Welcome to Login page</div>
          </div>
  
        </div>
      </div>
    </div>
  </template>

<script>
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import store from '../../store';
export default {
    data() {
        return {
            credential: { name: '', email: '', pwd: '' }
    };
    },
    methods: {
        register(){
            this.$router.push({path: '/register'});
        },
        login(){
            // Create user in firebase
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email,this.pwd).then((userCredential) => {
                store.dispatch('ChangeCurrentUser',this.name);
                this.$router.push({ path:'/chat'});
                alert("successful login");
            }).catch((error) => { alert(error.message) });
            }
        }
}
</script>

<style>
    .loginbox{
        display:flex;
        position:absolute;
        width:800px;
        height:400px;
        top:40%;
        left:50%;
        transform:translate(-50%,-50%);
        box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;
    }
    .loginbox .loginbox-in{
         background-color:#89AB9E;
         width:240px;
    }
    .loginbox .userbox{
        margin-top:120px ;
        height:30px;
         width:230px;
         display: flex;
         margin-left:25px;
    }
    .loginbox .emailbox{
        margin-top:20px ;
        height:30px;
         width:230px;
         display: flex;
         margin-left:25px;
    }
    .loginbox .pwdbox{ 
        height:30px;
        width:225px;
        display: flex;
        margin-left:25px;
    }
    .loginbox .loginBtn{
        margin-left: 20px;
    }
    
    .loginbox .background{
        width:570px;

        background-size:cover;
        font-family:sans-serif;
    }
    .loginbox .title{
        margin-top:120px;
        margin-left: 120px;
        font-weight:bold;
        font-size:25px;
        color:rgb(0, 0, 0);
    }
    .loginbox .title:hover{
         font-size:30px;
         transition: all 0.4s ease-in-out;
         cursor: pointer;
    }
    .loginbox .uesr-text{
         position:left;
    }
    .loginbox input{
        outline-style: none ;
        border: 0;
        border-bottom:1px solid #E9E9E9;
        background-color:transparent;
        height:20px;
         font-family:sans-serif;
        font-size:15px;
        color:#445b53;
        font-weight:bold;
    }
     /* input::-webkit-input-placeholder{
        color:#E9E9E9;
     } */
     .loginbox input:focus{
        border-bottom:2px solid #445b53;
        background-color:transparent;
         transition: all 0.2s ease-in;
         font-family:sans-serif;
        font-size:15px;
         color:#445b53;
         font-weight:bold;
         
    }
    .loginbox input:hover{
        border-bottom:2px solid #445b53;
        background-color:transparent;
         transition: all 0.2s ease-in;
         font-family:sans-serif;
        font-size:15px;
         color:#445b53;
         font-weight:bold;
         
    }
     
    .loginbox input:-webkit-autofill {
      /* 修改默认背景框的颜色 */
     box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
     /* 修改默认字体的颜色 */
     -webkit-text-fill-color: #445b53;
    } 
    
    .loginbox input:-webkit-autofill::first-line {
      /* 修改默认字体的大小 */
     font-size: 15px;
     /* 修改默认字体的样式 */
     font-weight:bold;
     }
     .loginbox .log-box{
        font-size:12px;
        display: flex;
        justify-content: space-between ;
        width:190px;
        margin-left:30px;
        color:#4E655D;
        margin-top:-5px;
        align-items: center;
       
    }
    .loginbox .log-box-text{
        color:#4E655D;
        font-size:12px;
          text-decoration:underline;
        }
    .loginbox .login_btn{
        background-color: #5f8276; /* Green */
        border: none;
        color: #FAFAFA;
        padding: 5px 22px;
        text-align: center;
        text-decoration: none;
        font-size: 13px;
        border-radius: 20px;
        outline:none;
    }
    .loginbox .login_btn:hover{
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        cursor: pointer;
         background-color: #0b5137;
          transition: all 0.2s ease-in;
    }
    
    .loginbox .warn{
        margin-top:60px;
        /* margin-right:120px; */
        margin-left:-120px;
        margin-bottom: 5px;
         font-weight:bold;
        font-size:17px;
    }
    
    .loginbox .register_btn{
        background-color: transparent; /* Green */
        border: none;
        text-decoration: none;
        font-size: 12px;
        /* border-radius: 20px;   */
         color:#4E655D;
        font-size:12px;
        text-decoration:underline;
        display: flex;
        margin-left:25px;
        outline:none;
    }
    .loginbox .register_btn:hover{
        font-weight:bold;
        cursor: pointer;
    }
    
    .loginbox .user_iconfont img {
        width: 20px;
        height: 20px;
        background-color: #cccccc;
    }

    .loginbox .pwd_iconfont img {
        width: 20px;
        height: 20px;
        background-color: #cccccc;
    }
    
    .loginbox .icon-key:before {
        content: "e775";
    }
    
    .loginbox .icon-account:before {
        content: "e817";
    }
    .loginbox .publicity{
        width: 560px;
        background: url("../../recoures/library.png");
    }



</style>