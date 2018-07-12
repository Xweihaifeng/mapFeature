<template>
	<div class="common-title">
		<div class="title-logo">
			<img src="../../../static/img/logo.png" />
			<span class="title-logo-text">IGIS企业服务平台</span>
		</div>
		<div v-if="this.getCookie('username')" class="title-user">
			<img src="../../../static/img/superAdminIcon.png" /> 你好，
			<span>{{this.getCookie('username')}}</span>
			<span class="title-logoff" @click="logOff"><img src="../../../static/img/logoff.png" />退出</span>
		</div>
	</div>
</template>

<script>
	import { delAllCookies } from '@/assets/js/common'
	export default {
		name: "home",
		data() {
			return {
				adminType: true
			}
		},
		methods: {
			logOff: function() {
				delAllCookies(this);
				this.$router.replace({
					path: '/login'
				});
			}
		},
		mounted: function() {
		}
	}
</script>