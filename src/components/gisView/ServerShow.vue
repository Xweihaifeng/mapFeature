<template>
	<div class="igisshow">
		<div id="serverMap" class="igis"></div>
	</div>
</template>

<script>
	import { serverMap } from '@/assets/js/gisCommon'
	export default {
		name: "serverShow",
		data() {
			return {
				//				adminType: true
			}
		},
		props: {
			serverData: {
				type: Object
			}
		},
		methods: {},
		mounted: function() {
			let param = this.serverData;
			param.divId = 'serverMap'; 
			serverMap(param);
		}
	}
</script>