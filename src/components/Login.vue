<template>
	<div>
		<vHeader></vHeader>
		<div class="login-bg">
			<div class="lonin-theme">
				<img src="../../static/img/lonin-theme.png" />
			</div>
			<div class="login-box">
				<div class="loginTitle">密码登录</div>
				<table class="loginForm">
					<tr class="login-error">
						<td colspan="2">{{errorMsg}}</td>
					</tr>
					<tr>
						<td colspan="2" class="login-common-td">
							<input class="login-input" type="text" id="user" placeholder="请输入用户名" v-model="username" autofocus="autofocus" @focus="highLightBox('user')" @blur="removeHigh('user',username)" />
						</td>
					</tr>
					<tr>
						<td colspan="2" class="login-common-td">
							<input class="login-input" type="password" id="pw" placeholder="密码" v-model="password" @focus="highLightBox('pw')" @blur="removeHigh('pw',password)" />
						</td>
					</tr>
					<tr>
						<td class="login-common-td">
							<input class="login-verifi" type="text" id="yzm" placeholder="验证码" v-model="veriCode" @focus="highLightBox('yzm')" @blur="removeHigh('yzm',veriCode)" @keyup.enter="userLogin" />
						</td>
						<td class="login-common-td">
							<img alt="验证码" id="captchaImage" :src="this.myGlobal.sendHeader+'/com.cloud.isoft.gis/getCaptcha'" @click="updateYzm" title="看不清？换一张" />
						</td>
					</tr>
				</table>
				<div class="login-btn" @click="userLogin">登&nbsp;录</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { delAllCookies } from '@/assets/js/common'
	import Header from '@/components/commonView/HeadLine'
	import $ from 'jquery'

	export default {
		name: 'login',
		data() {
			return {
				username: 'admin',
				password: 'admin',
				veriCode: '',
				errorMsg: ''
			}
		},
		methods: {
			highLightBox: function(type) {
				var $input = $('#' + type);
				$input.addClass('checked');
			},
			removeHigh: function(type, value) {
				var $input = $('#' + type);
				$input.removeClass('checked');
				if(value !== '' && value !== undefined && value !== null) {
					this.errorMsg = '';
				}
			},
			updateYzm: function() {
				$('#captchaImage').attr("src", this.myGlobal.sendHeader + "/com.cloud.isoft.gis/getCaptcha?timestamp=" + (new Date()).valueOf());
			},
			userLogin: function() {
				var username = this.username;
				var password = this.password;
				var veriCode = this.veriCode;

				if(username == '' || username == undefined || username == null) {
					this.errorMsg = '用户名不能为空。';
					return;
				}
				if(password == '' || password == undefined || password == null) {
					this.errorMsg = '密码不能为空。';
					return;
				}
				if(veriCode == '' || veriCode == undefined || veriCode == null) {
					this.errorMsg = '验证码不能为空。';
					return;
				}
				var patrn = /^[\u4e00-\u9fa5A-Za-z0-9_]*$/;
				if(!patrn.test(username)) {
					this.errorMsg = '用户名不合法。';
					this.initInput();
					this.username = '';
					return false;
				}

				//用户名密码是否正确
				this.$http.post(this.myGlobal.sendHeader + `/com.cloud.isoft.gis/login?username=${username}&password=${password}&vcode=${veriCode}`).then(function(response) {
						if(response.status == 200) {
							this.setCookie('username', username, 1);
							console.log(this.getCookie('username'));
							if(response.body.errcode == 0) {
								this.$router.replace({
									path: '/home'
								});
							} else {
								if(response.body.errcode == 1) {
									this.errorMsg = '验证码错误。';
								} else if(response.body.errcode == 2 ||  response.body.errcode == 3) {
									this.errorMsg = '身份验证信息错误。';
								}  else if(response.body.errcode == 4 ) {
									this.errorMsg = '登录次数过多。';
								} else if(response.body.errcode == 5) {
									this.errorMsg = '系统错误。';
								}
								this.initInput();
							}
						}
					},
					function(error) {
						console.log(error);
					});
				
			},
			initInput: function() {
				this.password = '';
				this.veriCode = '';
				this.updateYzm();
			}
		},
		created:function(){
			delAllCookies(this);
		},
		mounted: function() {
			
		},
		components: {
			'vHeader': Header
		},
	}
</script>