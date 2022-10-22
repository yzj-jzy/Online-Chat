<template>
        <div class="container">

            <div class="profile">

                <div class="avatar">
                    <div class="avatarUpload" v-if="editMode">
                        {{selectedImage}}
                        <input  class="avatarDefault" type="file" @change="onChangeFile" name="file" />
                    </div>
                    <div v-else>
                        <img class="avatarView" :src="imageUrl" height="200" alt="Image preview" />
                    </div>
                </div>

                <div class="chat">
                    
                    <!-- name -->
                    <div class="sinature">   
                        <el-input class="name" v-if='editMode'  type="text" v-model="name" size="mini"></el-input>
                        <p class="name" v-else><span>{{name}}</span></p>
                    </div>

                    <!-- signature -->
                    <div class="sinature">   
                        <el-input class="signatureEdit" v-if='editMode'  type="text" v-model="signature" size="mini"></el-input>
                        <p class="signature" v-else><span>{{signature}}</span></p>
                    </div>
                    
                    <!-- Edit Button -->
                    <el-button  class="savebtn" v-if="editMode" @click='save()'  type="success" icon="el-icon-check" circle></el-button>
                    <el-button  class="editbtn" v-else @click='edit()' type="primary" icon="el-icon-edit" circle></el-button>
                </div>

            </div>
            
        </div>
        

</template>

<script>
    import axios from "axios";
    import store from '../../store';
    export default{
        name: 'userProfile',
        data(){
            return{
                name:  store.state.userProfile.name,
                signature: store.state.userProfile.signature,
                editMode:0,
                imageUrl: require("../../recoures/海上.png"),
                selectedImage: '上传头像'
            }
        },
        methods:{
            edit(){
                this.editMode = 1;
            },
            save(){
                this.editMode =  0;
                store.state.userProfile.name = this.name;
            },
            onChangeFile(event) {
                console.log('update:modelValue', event.target.files[0])
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    // convert image file to base64 string
                    this.imageUrl = reader.result;
                }, false);
                if (file) {
                    reader.readAsDataURL(file);
                }
                this.selectedImage = file.name;
            }



        }
    }

</script>

<style>

    .profile{
        display: flex;
        border: 3px solid #79bff9;
        width:  290px;
        height: 150px;
    }
    /* avatar */
    .profile .avatar {
        width: 100px;
        height: 150px;
        display: block;
        padding-top: 10px;
    }
    .profile .avatarView{
        width:130px;
        height: 120px;
        border: 2px solid #0c0303;
        border-radius: 100%;
        display: block;
    }
    .profile .avatarUpload{
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        width:80px;
        margin-left: 30px;
        margin-top: 30px;
    }
    .profile .avatarDefault{
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .profile .avatarDefault{
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    /* name and signature*/
    .profile .chat{
        padding-left: 60px;
        padding-top: 10px ;
        width:200px;
    }
    .chat .name{
        font-size: 23px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .chat .signature{
        width:80px;
        margin-bottom: 10px;
        margin-top: 10px;
        font-size: 13px;
    }

    .editbtn, .savebtn { 
        width: 2px;
        height: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

  

  



  

</style>