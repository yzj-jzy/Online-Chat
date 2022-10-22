<template>
    <div>

        <el-tabs type="border-card">
            <el-tab-pane > 
              <span slot="label"> <img src="../../recoures/chat.png"></span>
                <el-scrollbar class="" v-if="isChat">
                    <ul >
                        <p class="title">好友列表</p>
            
                        <li v-for="f in friends" class="chatbox">
                            <div>
                                <img class='avatar' src="../../recoures/海上.png">
                            </div>
                            <div class="chat">
                                <p class="name">  {{f.id}}</p> 
                                <p class="rctMessage"> {{f.rctMessage}} </p>
                            </div>
            
                            <div class="status">
                                <div v-if="f.viewed" class="viewed"> 
                                    <div class="tick"></div>
                                </div>
            
                                <div v-else="f.viewed" class="notViewed"> 
                                </div>
                                
                                <div>
                                    <p class="time"> {{f.time}} </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </el-scrollbar>
            </el-tab-pane>

            <el-tab-pane >
                <span slot="label"> <img src="../../recoures/request.png"></span>
                <div class="search">
                    <input type="text" placeholder="好友查找..." v-model="search"  />
                    <button v-on:click="fsearch()"><i>查找</i></button>
                </div>
    
                <ul >
                    <p class="title">好友添加</p>
                    <li v-for="f in fadds" class="chatbox">
                        <div>
                            <img class='avatar' src="../../recoures/海上.png">
                        </div>
                        <div class="chat">
                            <p class="name">  {{f.name}}</p> 
                        </div>
        
                        <div class="status">                 
                            <div>
                                <p class="time"> {{f.time}} </p>
                            </div>
                        </div>
                        <el-button type="success" plain size="mini" @click="fadd"> {{addConfirm}}</el-button>
                    </li>
                    
                </ul>
            </el-tab-pane>

            <el-tab-pane>
                <span slot="label"> 
                    <el-badge v-bind:is-dot="isdot" class="item">
                        <img src="../../recoures/request.png">
                    </el-badge>
                </span>
                <ul >
                    <p class="title">好友请求</p>
                    <li v-for="f in frequest" class="chatbox">
                        <div>
                            <img class='avatar' src="../../recoures/海上.png">
                        </div>
                        <div class="chat">
                            <p class="name">  {{f.name}}</p> 
                        </div>
        
                        <div class="status">                 
                            <div>
                                <p class="time"> {{f.time}} </p>
                            </div>
                        </div>
                        <el-button type="success" plain size="mini" @click="fadd"> {{addConfirm}}</el-button>
                    </li>
                    
                </ul>
            </el-tab-pane>

        </el-tabs>

        
    </div>

    

</template>

<script>
import store from "@/store";
import { getDatabase, ref, child, get, push, set, onChildAdded, onChildChanged, onChildRemoved ,onValue} from "firebase/database";
import { onMounted } from "vue";
export default{
            // 3.定义变量
            data(){
                return{
                    friends:[
                        {id:'jack',rctMessage:'I am jack',time:'12:00' ,viewed:1, avatar: '../../recoures/海上.png'},
                        {id:'joe',rctMessage:'I am joe',time:'13:00',viewed:0},
                        {id:'victor',rctMessage:'I am victor',time:'14:00',viewed:1}
                    ],
                    avatar:'./recoures/iphone11',
                    isChat: true ,
                    search: '',
                    fadds:[],
                    addConfirm:"添加好友",
                    nrequest:1,
                    isdot:false,
                    frequest:[]
                }
                
            },
            
            mounted(){
                    const db = getDatabase();
                    console.log('users/'+store.state.userProfile.name + '/frequest');
                    const starCountRef = ref(db, 'users/'+store.state.userProfile.name + '/frequest' );
                    onValue(starCountRef, (snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();
                        const f = {name:childData.name};
                        console.log(f)
                        this.frequest.push(f);
                    });
                    });
            } ,
            methods:{
                ChangeCurrentChat(name,signature){
                    const user = {name:name, signature:signature};
                    store.dispatch('ChangeCurrentChat',user);
                },
                fsearch(){
                    const dbRef = ref(getDatabase());
                    get(child(dbRef, `users/${this.search}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const f = {name:this.search, email:snapshot.val().email}
                        this.fadds.push(f);
                    } else {
                        console.log("No data available");
                    }
                    }).catch((error) => {
                    console.error(error);
                    });
                },
                fadd(){
                    this.addConfirm = "等待添加";
                    const db = getDatabase();
                    const usersRef = ref(db, 'users/'+ this.search + '/frequest' );
                    const newusersRef = push(usersRef);
                    set(newusersRef, {
                       name: store.state.userProfile.name
                    });
                }
            }
}
</script>


<style>
    /* friend list */

    .el-scrollbar{
        height: 280px;
        width: 360px;
        margin:0px;
    }
    
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }  
    ul {
        position: relative;
        width: 280px;
        padding:0px;
    }
    .search input{
        width: 240px;
    }
    .chatbox{
        display: flex;
        border: 1px solid #090909;
        width: 280px;
        border-bottom: none ;
        background-color: white;
    }
    .chatbox:hover{
        background: #69a5eaaf;
    }
    .chatbox .avatar{
        width:60px;
        height: 50px;
        border: 2px solid #0c0303;
        border-radius: 100%;
        display: block;
        margin-top: 10px;
    }
    .chatbox .chat{
        margin-left: 20px;
        width:200px;
    }
    .chatbox .name{
        font-size: 16px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .chatbox .rctMessage{
        font-size: 11px;
    }

    .chatbox .status .viewed{
        margin:28px 0px 28px 0px;
        border-radius: 100%;
        border: 2px solid #0c0303;
        width: 20px;
        height: 20px;
        background-color: #07ff34;
        margin-top: 10px;
        margin-bottom: 0px;
    }
    .chatbox .status .notViewed{
        margin:28px 0px 28px 0px;
        border-radius: 100%;
        border: 2px solid #0c0303;
        width: 20px;
        height: 20px;
        background-color: white;
        margin-top: 10px;
        margin-bottom: 0px;
    }

    .chatbox .status .tick{
        width: 6px;
        height: 11px;
        border-right:2px solid #060907;
        border-bottom:2px solid #060907;
        transform: rotate(40deg);
        margin-left: 5px;
    }
    .chatbox .time{
        margin-top: 0px;
        padding-right: 20px;
    }
    .chatbox:last-child{
        display: flex;
        border: 1px solid #090909;
        width: 280px;
    }
    .frequest div{
        display: inline;
        margin-right: 20px;
    }
    .frequest img{
        height: 30px;
        width:  30px;
    }
    .el-tabs img{
        width:20px;
        height: 20px;
    }
    .el-tabs .el-button{
        
        height: 24px;
        font-size: 12px;
        margin-top: 20px;
        margin-right: 5px;
    }

      
</style>