<template>
	<div class="igisshow">
		<div id="igis" class="igis"></div>
		<div class="mapTools">
			<input type="checkbox" name="service" :checked="service1" @click="wmsServer" /> 停车场图层
			
		</div>
	</div>
</template>

<script>
	import { initMap, addWms, removeWms } from '@/assets/js/gisCommon'
	export default {
		name: "igisShow",
		data() {
			return {
				service1:false
			}
		},
		methods: {
			wmsServer(){
				if(this.service1){
					this.service1 = false;
					removeWms();
				}else{
					this.service1 = true;
					addWms();
				}
				
			}
		},
		mounted: function() {
			initMap('igis');
			
		}
	}
</script>