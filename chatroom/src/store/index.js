
import Vue from 'vue';
import Vuex from 'vuex';
import { getDatabase, ref, set, get,child, onvalue } from "firebase/database";
Vue.use(Vuex);

const state ={
    userProfile:{
        name:"joe",
        signature:"上课别睡觉",
        editMode:0,
        imageUrl: require("../recoures/iphone11.png"),
        selectedImage: '上传头像'
    },
    mainRoom:{
        currentChat:{
            name: '',
            signature: "It's my birthday",
            msgNum: 0
        }
    }

};
const actions ={
    ChangeCurrentChat(ministore,user){
        ministore.commit('CHANGECURRENTCHAT',user);
    },
    ChangeCurrentUser(ministore,userName){
        console.log('hi,I am there1');
        ministore.commit('CHANGECURRENTUSER',userName);
        console.log('hi,I am there2');
    },
    typeNewMsg(ministore,msg){
        ministore.commit('TYPENEWMSG',msg);
        console.log('typeNewMsg is committed'+msg);
    }
};
const mutations ={
    CHANGECURRENTCHAT(state,user){
        state.mainRoom.currentChat.name = user.name;
        console.log(state.mainRoom.currentChat.name);
    },
    CHANGECURRENTUSER(state,userName){
        state.userProfile.name = userName;
    },
    TYPENEWMSG(state,msg){
        state.mainRoom.currentChat.msgNum += 1;
        state.mainRoom.msg = msg;
        // read the number of messages and write msg in db
        const db = getDatabase()
        const dbRef = ref(db);
        get(child(dbRef,'Root/' + state.userProfile.name + '/friendList/' + state.mainRoom.currentChat.name)).then((snapshot) => {
        if (snapshot.exists()) {
            const msgNum = Object.keys(snapshot.val()).length + 1;
            set(ref(db,'Root/' + state.userProfile.name + '/friendList/' + state.mainRoom.currentChat.name + '/ms'+msgNum ), {
                sender: true,
                content: state.mainRoom.msg
            });
            set(ref(db, 'Root/' +state.mainRoom.currentChat.name + '/friendList/' + state.userProfile.name + '/ms'+msgNum ), {
                sender: false,
                content: state.mainRoom.msg
            });
        } else {
            set(ref(db, 'Root/' +state.userProfile.name + '/friendList/' + state.mainRoom.currentChat.name + '/ms1' ), {
                sender: true,
                content: state.mainRoom.msg
            });
            set(ref(db,'Root/' + state.mainRoom.currentChat.name + '/friendList/' + state.userProfile.name + '/ms1' ), {
                sender: false,
                content: state.mainRoom.msg
            });
        }
        }).catch((error) => {
        console.error(error);
        });
        // Insert msg into messages to update current mainroom view
        let newMsg = {sender:state.userProfile.name,recipient:state.mainRoom.currentChat.name,message:msg};
        state.mainRoom.messages.push(newMsg);

    }
};

const getters = {

}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
});

export default store;
