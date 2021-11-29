<template>
    <div>
        <Header></Header>
        <body background="../../public/2.jpg">
            <div class="block">
                <el-timeline v-for="blog in blogs" >
                    <el-timeline-item :timestamp="blog.created" placement="top" >
                        <el-card>
                            <h4>
                                <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                                    {{ blog.title }}
                                </router-link>
                            </h4>
                            <p>{{ blog.description }}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </body>

        <el-pagination class="page"
                        background
                        layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change=page
                        >
        </el-pagination>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "",
        data(){
          return{
              blogs: {},
              currentPage: 1,
              total: 0,
              pageSize: 5
          }
        },
        components: {Header},
        methods:{
            page(currentPage){
                this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
                    this.blogs = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.total = res.data.data.total
                    this.pageSize = res.data.data.size
                    console.log(res)
                })
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>
    .page{
        margin: 0 auto;
        text-align: center;
    }
</style>