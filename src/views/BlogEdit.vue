<template>
    <div>
        <Header></Header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="name">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="name">
                <el-input v-model="ruleForm.description"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <mavon-editor v-model="ruleForm.content"></mavon-editor>
            </el-form-item>
            <el-form-item class="btnConfirm">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name:"",
        components:{Header},
        data() {
            return {
                ruleForm: {
                    title: '',
                    description: '',
                    content: '',
                    id:''
                },
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入摘要', trigger: 'blur' },
                        { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/blog/edit', this.ruleForm, {
                            headers:{
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then(res => {
                            console.log(res)
                            this.$alert('操作成功', '提示',{
                                confirmButtonText:'确定',
                                callback: action => {
                                    this.$router.push('/blogs')
                                }
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            const blogId = this.$route.params.blogId
            if(blogId){
                this.$axios.get('/blog/' + blogId).then(res => {
                    const blog = res.data.data
                    console.log(res)
                    this.ruleForm.title = blog.title
                    this.ruleForm.description = blog.description
                    this.ruleForm.content = blog.content
                    this.ruleForm.id = blog.id
                })
            }
        }
    }
</script>

<style scoped>
    .btnConfirm{
        text-align: center;
    }
</style>