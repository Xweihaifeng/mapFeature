<template>
	<div id="app">
		<router-view v-wechat-title="$route.meta.title"/>
	</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'PingFang';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
