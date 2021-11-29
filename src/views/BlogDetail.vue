<template>
    <div >
        <Header></Header>
        <div class="detail">
            <div class="title">{{blog.title}}</div>
                <router-link v-show="blog.ownBlog" :to="{name: 'BlogEdit', params:{blogId:blog.id}}">
                    <el-button id="btnEdit" type="primary" icon="el-icon-edit">
                    </el-button>
                </router-link>

                <div v-show="blog.ownBlog" class="deleteBtn"><el-button type="warning" @click="deleteBlog(blog.id)">删除</el-button></div>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="blog.content"></div>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import 'github-markdown-css/github-markdown.css'
    export default {
        name: "",
        components: {Header},
        data(){
            return{
                blog: {
                    title: '123',
                    content: '321',
                    id: '',
                    ownBlog: false
                }
            }
        },
        methods: {
            deleteBlog(blogId){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get('/blog/delete/' + blogId, {
                        headers:{
                            "Authorization": localStorage.getItem("token")
                        }
                    }).then(res => {
                        this.$message({
                            type: 'success',
                            message: res.data.data
                        });
                        this.$alert('操作成功', '提示',{
                            confirmButtonText:'确定',
                            callback: action => {
                                this.$router.push('/blogs')
                            }
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        created() {
            const blogId = this.$route.params.blogId
            this.$axios.get('/blog/' + blogId).then(res => {
                const blog = res.data.data

                this.blog.title = blog.title
                this.blog.content = blog.content
                this.blog.id = blog.id

                var MarkdownIt = require("markdown-it")
                var md = new MarkdownIt()
                var result = md.render(blog.content)

                if(blog.userId === this.$store.getters.getUser.id)
                    this.blog.ownBlog = true

                this.blog.content = result

            })
        }
    }
</script>

<style scoped>
    .detail{
        position: relative;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        max-width: 1300px;
        margin: 0 auto;
        min-height: 1000px;
        padding: 35px 35px;
    }
    .title{
        font-size: 25px;
        font-weight: bold;
    }
    #btnEdit{
        position: relative;
        min-width: 70px;
    }

</style>