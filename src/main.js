// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

//设置cookie
Vue.prototype.setCookie = (c_name, value, expireHour) => {
	var exdate = new Date();　　　　
	exdate.setHours(exdate.getHours() + expireHour);　　　　
	document.cookie = c_name + "=" + escape(value) + ((expireHour == null) ? "" : ";expires=" + exdate.toGMTString());
}
//获取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return(arr[2]);
	else
		return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
function delCookie (name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
Vue.prototype.delCookie = delCookie;

Vue.prototype.myGlobal = {
	sendHeader:'/api',
	serverHeader:'/server'
//	sendHeader:'',
//	serverHeader:''
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
