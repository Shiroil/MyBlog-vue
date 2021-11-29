<template>
    <div>
        <el-container>
            <el-header>
                <img class="logo" src="../../public/1.png" alt="">
            </el-header>
            <el-main class="frameLogin">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register('ruleForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>

        <vue-particles
                color="#dedede"
                :particleOpacity="0.7"
                :particlesNumber="80"
                shapeType="star"
                :particleSize="4"
                linesColor="#FFFFFF"
                :linesWidth="2"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
                class="cash"
        >
        </vue-particles>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid'
    export default {
        name: "",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    id: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ],

                }
            };
        },
        methods: {
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.id = nanoid()
                        this.$axios.post('/register', this.ruleForm).then(res => {
                            this.$router.push("/login")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .logo{
        height: 100%;
    }
    .demo-ruleForm{
        max-width: 600px;
        margin: 0 auto;
    }
    .frameLogin{
        position: relative;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        max-width: 1300px;
        margin: 0 auto;
        padding: 35px 35px;
        top: 10px;
    }
    .el-button--primary {
        background: #42b983;
        font-size: 10px;
        width: 100px;
        size: 10px;
        top: 10px;

    }
</style>