import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../view/home/home.vue'
import Person from '../view/home/person.vue'
import TestingBefore from '@/view/home/testingBefore'
import Result from '@/view/home/result'
import Silent from '@/view/home/silent'
import Camera from '@/view/home/camera'
import NoPass from '@/view/home/noPass'
import NoResponse from '@/view/home/noResponse'
import Agreement from '@/view/home/agreement'
import Personal from '@/view/home/personal'
import RealName from '@/view/home/realName'
import CameraRealName from '@/view/home/cameraRealName'
import Overdue from '@/view/home/overdue'
import { judgeToken } from '@/network/home'
// import { defineComponent, getCurrentInstance, onMounted } from "vue"
//const Home = () => import('@/view/home/home.vue')

// 获取当前组件实例

// console.log(appContext);
// console.log(defineComponent);

const router = createRouter({
  history: createWebHashHistory(),
  base: '/my_app/',
  routes: [
  	{
  		path: '/',
      name: 'person',
  		redirect: '/person'
  	},
    {
    	path: '/person',
    	component: Person
    },
  	{
  		path: '/home',
  		component: Home
  	},
    {
      path: '/testingBefore',
      name:'testingBefore',
      component: TestingBefore
    },
    {
      path: '/result',
      name:'result',
      component: Result
    },
    {
      path: '/silent',
      name:'silent',
      component: Silent
    },
    {
      path: '/camera',
      name:'camera',
      component: Camera
    },
    {
      path: '/noPass',
      name:'noPass',
      component: NoPass
    },
    {
      path: '/noResponse',
      name:'noResponse',
      component: NoResponse
    },
    {
      path: '/agreement',
      name:'agreement',
      component: Agreement
    },
    {
      path: '/personal',
      name:'personal',
      component: Personal
    },
    {
      path: '/realName',
      name:'realName',
      component: RealName
    },
    {
      path: '/cameraRealName',
      name:'cameraRealName',
      component: CameraRealName
    },
    {
      path: '/overdue',
      name:'overdue',
      component: Overdue
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // console.log(next);
  if(to.path === '/person'){
    console.log(to.query.token);
    const token = to.query.token;
    judgeToken(token).then((res) => {
      console.log(res);
      if(res.code === 200){
        to.params.name = res.name;
        to.params.idcard = res.idcard;
        to.params.tokenId = res.tokenId;
        to.params.token = true;
        next();
      }else{
        to.params.token = false;
        next();
      }
    });
  }else if(to.path === '/personal' || to.path === '/home'){
    const token = to.query.token;
    judgeToken(token).then((res) => {
      console.log(res);
      if(res.code === 200){
        to.params.name = res.name;
        to.params.idcard = res.idcard;
        to.params.tokenId = res.tokenId;
        to.params.checkWay = res.checkWay;
        if(res.checkWay === 'M3'){
          to.params.mobile = res.mobile;
        }else if(res.checkWay === 'BC4'){
          to.params.mobile = res.mobile;
          to.params.cardNo = res.cardNo;
        }
        to.params.token = true;
        next();
      }else{
        to.params.token = false;
        next();
      }
    });
  }else{
    next();
  }
})

export default router;
