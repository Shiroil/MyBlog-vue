<template>
    <div class="Header_blogs">
        <h3>Shiro's blog</h3>
        <div class="block"><el-avatar :size="50" :src="user.avatar"></el-avatar></div>
        <h2>{{user.username}}</h2>
        <div class="Button_division">
            <span><el-link href="/blogs">主页</el-link></span>


            <el-divider direction="vertical"></el-divider>
            <span><el-link v-if="!if_login" href="/login">登录</el-link></span>
            <span><el-link v-if="if_login" href="/blog/add">发表</el-link></span>

            <el-divider direction="vertical"></el-divider>
            <span><el-link type="danger" @click="Blog_Logout">退出</el-link></span>

        </div>
    </div>
</template>

<script>
    import jpg from "../../public/2.jpg"
    export default {
        name: "Header",
        data(){
            return {
                if_login : false,
                user:{
                    username: "",
                    avatar: jpg

                }
            }
        },
        methods:{
            Blog_Logout(){
                console.log(this)
                this.$axios.get("/logout", {
                    headers:{
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    this.$store.commit("REMOVE_INFO")
                    this.$router.push("/login")
                })
            }
        },
        created() {
            if(this.$store.getters.getUser.username){
                console.log(this.$store.getters.getUser)
                this.user.username = this.$store.getters.getUser.username
                this.if_login = true;
            }
            else {
                this.if_login = false;
            }

        }

    }
</script>

<style scoped>
    .Header_blogs{
        text-align: center;
    }
    .Button_division{

    }

</style>