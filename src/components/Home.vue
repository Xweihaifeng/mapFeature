<template>
	<div>
		<vHeader></vHeader>
		<div class="meunlist">
			<!--<div class="meun serverlook">服务预览</div>
				<div class="meun userserver">
					<div>用户服务</div>
					<ul style='display: none;'>
						<li>WMS服务</li>
						<li>WMTS服务</li>
					</ul>
				</div>
				<div class="meun serverapply">服务使用</div>-->
			<div v-for="(meun ,index) in meunlist">
				<div :class="['meun', {meuned:iscur==index}, iscur==index?meun.className+'ed':meun.className]" @click="iscur=index,meunChange(meun)">{{meun.name}}</div>
				<ul v-show="isChildShow">
					<li v-if="meun.children" v-for="(c ,i) in meun.children" :class="{lied:isChildCur==i}" @click="isChildCur=i,childChange(meun.comp,c.type)">{{c.name}}</li>
				</ul>
			</div>
		</div>
		<div class="shrink">
			<img src="../../static/img/hide.png" />
		</div>
		<div class="container" :style="{ width: screenWidth+'px' }">
			<!--<div id="content"><v-igisDownload></v-igisDownload></div>-->
			<component :is="content" v-if="hackReset" :serverType="serverType" :serverData="serverData" @listenToChild="changeComp"></component>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/commonView/HeadLine'
	import IgisShow from '@/components/gisView/IgisShow'
	import ServerShow from '@/components/gisView/ServerShow'
	import ServerList from '@/components/gisView/ServerList'
	import IgisDownload from '@/components/gisView/IgisDownload'
	export default {
		name: "home",
		data() {
			return {
				screenWidth:document.documentElement.clientWidth-250,
				meunlist: [{
					name: '服务预览',
					className: 'serverlook',
					comp: 'vIgisShow'
				}, {
					name: '用户服务',
					className: 'userserver',
					comp: 'vServerList',
					children: [{
						name: 'WMS服务',
						type: 'WMS'
					}, {
						name: 'WMTS服务',
						type: 'WMTS'
					}, {
						name: 'WFS服务',
						type: 'WFS'
					}, {
						name: 'GEO服务',
						type: 'GeoJSON'
					}]
				}, {
					name: '服务使用',
					className: 'serverapply',
					comp: 'vIgisDownload'
				}],
				content: 'vIgisShow',
				hackReset: true,
				iscur: 0,
				isChildCur: -1,
				isChildShow: false,
				serverType: '',
				serverData: null
			}
		},
		methods: {
			meunChange(meun) {
				this.isChildCur = -1; //重置子集菜单
				if(!this.getCookie('username')) {
					this.$router.replace({
						path: '/login'
					});
				}
				if(meun.hasOwnProperty('children')) {
					if(this.isChildShow) {
						this.isChildShow = false;
					} else {
						this.isChildShow = true;
					}
				} else {
					this.isChildShow = false;
					this.content = meun.comp;
				}
			},
			childChange(meunType, serType) {
				this.iscur = -1;
				this.serverType = serType;
				if(this.content !== meunType) {
					this.content = meunType;
				} else {
					this.hackReset = false
					this.$nextTick(() => {
						this.hackReset = true
					})
				}
			},
			changeComp(childData) {
				this.content = childData.meunType;
				this.serverData = childData.rowData;
			}
		},
		components: {
			'vHeader': Header,
			'vIgisShow': IgisShow,
			'vServerList': ServerList,
			'vIgisDownload': IgisDownload,
			'vServerShow': ServerShow
		},
		mounted: function() {
			if(!this.getCookie('username')) {
				this.$router.replace({
					path: '/login'
				});
			}
			// 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
			const that = this;
			window.onresize = function() {
				that.screenWidth = document.documentElement.clientWidth-250;
			};
		}
	}
</script>