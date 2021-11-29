import axios from 'axios'
import router from './router'
import store from './store'
import Element from 'element-ui'

axios.defaults.baseURL="http://192.168.1.3:8081"

//前置拦截
axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(response => {
    const res = response.data
    console.log(res)


    if(res.code === 200){
        return response
    }
    else {
        Element.Message.error('用户名或密码错误', {duration: 3 * 1000})
        return Promise.reject(response.data)
    }
    },
    error => {
        if(error.response.data){
            error.message = error.response.data.msg
        }
        console.log(error)
        if(error.response.status === 401){
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        else {
            console.log(error.message)
            Element.Message.error(error.message, {duration: 3 * 1000})
            return Promise.reject(error)
        }
    }
)