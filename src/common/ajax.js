import axios from 'axios'
import common from './common'
import qs from 'qs'
//请求拦截器
// axios.interceptors.request.use(function (config) {
//     // let apiauth = localStorage.getItem('apiauth')
//     let apiauth = common.getStorage('user_token')
//     console.log(apiauth)
//     // config.headers.apiauth = apiauth
//     // console.log(apiauth)
//     config.headers.apiauth = '607a8adb7102d3fb8a1a3e3476d0d1fb'
//     console.log(config.headers.apiauth)
//     config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
//     return config
// }), function (error) {
//     return Promise.reject(error)
// }

//响应拦截器
// axios.interceptors.response.use((response) => {
//         //响应成功关闭加载框
//         //Toast.clear()
//         // console.log(response.data)
//         return response
//     }, (error) => {
//         // Toast.fail('网络请求失败')
//         return Promise.reject(error)
//     }
// )

export default function ajax (url, data = {}, type = 'GET') {
    return new Promise(function (resolve, reject) {
        // 执行异步ajax请求
        let lang = 'zh-cn'
        let promise
        if (type == 'GET') {
            //get请求
            let dataStr = ''
            Object.keys(data).forEach(key => {
                if (JSON.stringify(data) !== '{}') {
                    dataStr += key + '=' + data[key] + '&'
                }

            })
            if (dataStr !== '') {
                // let lang =  common.getStorage('language')
                // let lang =  'zh-cn';
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr + '&languages=' + lang
            }else {
                let lang = common.getStorage('language')
                url = url + '?languages=' + lang
            }
            // console.log('get请求:' + url)
            let apiauth = common.getStorage('user_token')
            promise = axios.get(url,{
            headers:{'apiauth':apiauth},
            params:{'_t':Date.parse(new Date())/1000}
            })
        }
        if (type == 'POST') {
            //post请求
            // console.log('POST请求:' + url)
            let apiauth = common.getStorage('user_token')
            let lang = common.getStorage('language')
            data['languages'] = lang
            promise = axios.post(url, qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'apiauth':apiauth
                }
            })
        }
        promise.then(function (response) {
            // 成功了调用resolve()
            resolve(response.data)
        }).catch(function (error) {
            //失败了调用reject()
            reject(error)
        })
    })
}
