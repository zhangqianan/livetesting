import axios from 'axios'

//ES6 Promise的封装
export function request(options) {
  return new Promise((resolve, reject) => {
    //1.创建axios的实例对象
    const instance = axios.create({
      //baseURL: 'http://123.207.32.32:8000',
      // baseURL: 'https://face.yunnanca.net',
      // baseURL: 'http://192.168.1.22:8080',
      baseURL: 'https://192.168.2.103:8443',
      // baseURL: 'https://192.168.2.166:8443',
      // baseURL: 'https://facetest.yunnanca.net:12010',
      timeout: 50000
    })

    //2.过滤器（拦截器）
    instance.interceptors.response.use(res => {
      if (localStorage.getItem('token')) {
        // console.log('********'+localStorage.getItem('token'));
        res.headers.token = localStorage.getItem('token');
      }
      // console.log('&&&&&&&&'+localStorage.getItem('token'));
      // res.headers['Token'] = 'JSESSIONID=F584F80B7C575B648000029C93A709F1'
      // res.headers.token = 'JSESSIONID=F584F80B7C575B648000029C93A709F1'
      return res.data
    }, err => {
      alert(err);
      console.log(err);
    })

    //3.发送真正的网络请求
    instance(options)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}

export function request2(options){
  return new Promise((resolve, reject) => {
    //1.创建axios的实例对象
    const instance = axios.create({
      // baseURL: 'http://123.207.32.32:8000',
      baseURL: 'https://file.chinadatapay.com',
      timeout: 5000
    })

    //2.过滤器（拦截器）
    instance.interceptors.response.use(res => {
      return res.data
    }, err => {
      console.log(err);
    })

    //3.发送真正的网络请求
    instance(options)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}
