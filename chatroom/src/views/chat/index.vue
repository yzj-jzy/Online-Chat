<template>

    <div class="chatroom-Container">
        <div>
            <userProfile class="userprofile"> </userProfile>
            <chatList class="chatlist"> </chatList> 
        </div >
        <mainRoom class="mainroom"></mainRoom>
    </div>        
    
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";
import chatList from '../../components/chatList/index.vue';
import userProfile from '../../components/userProfile/index.vue';
import mainRoom from '../../components/mainRoom/index.vue';

export default{
            components:{
                chatList,
                userProfile,
                mainRoom
            }   
}
</script>


<style>

    /* Overview layout*/

    .chatroom-Container{
        width:1200px;
        height:800px;
        /* background-color: rgb(243, 212, 173); */
        background-color: white;
        margin: 0px;
        display: flex;
    }
    .chatlist{
        margin-left: 130px;
    }
    .userprofile{
        padding-top: 40px;
        margin-bottom: 10px;
        margin-left: 120px;
    }
    .mainroom{
        width: 600px;
        height: 470px;
        margin-top: 40px;
    }

      
</style>