import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import VueWechatTitle from 'vue-wechat-title'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'

import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router) //路由
Vue.use(VueResource) //ajax
Vue.use(ElementUI) //ElementUI
Vue.use(VueWechatTitle) //title

export default new Router({
	base: '/iGisPortal/',
	routes: [{
			path: '/',
			name: 'login',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				title: '用户登录'
			}
		}, {
			path: '/home',
			name: 'home',
			component: Home,
			meta: {
				title: 'IGIS企业服务平台'
			}
		}
	]
})