<template>
	<div class="editShow">
		<header id="header" class="editShowTitle"> 基本信息 </header>
		<!-- /header -->
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="" size="mini">
			<!-- 服务信息 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-bottom:15px'>
				<el-breadcrumb-item><i class="el-icon-caret-right"></i> 服务信息 </el-breadcrumb-item>
			</el-breadcrumb>

			<div class="form_list">
				<el-form-item label="服务名称">
					<el-input v-model="serverInfo.serviceName" style='width:305px' disabled></el-input>
				</el-form-item>

				<el-form-item label="活动类型">
					<el-input v-model="serverInfo.serviceType" disabled></el-input>
				</el-form-item>

				<el-form-item label="背景色">
					<!-- serverInfo.backGroundColor -->
					<el-color-picker v-model="color4" size="mini" color-format="rgba"></el-color-picker>
				</el-form-item>
			</div>

			<div class="form_list">
				<el-form-item label="服务地址">
					<el-input v-model="serverInfo.serviceUrl" style='width:305px' disabled></el-input>
				</el-form-item>

				<el-form-item label="中心点">
					<el-input v-model="serverInfo.centerPoint" disabled></el-input>
				</el-form-item>
			</div>

			<!-- 图层信息 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-bottom:15px'>
				<el-breadcrumb-item><i class="el-icon-caret-right"></i> 图层信息 </el-breadcrumb-item>
			</el-breadcrumb>

			<!-- <div v-for="item in serverInfo.layersInfo"> -->
			<div class="form_list">
				<el-form-item label="图层编号">
					<!-- item.layerId -->
					<el-input v-model="ruleForm.name" style='width:305px'></el-input>
				</el-form-item>

				<el-form-item label="图层名称">
					<!-- item.layerName -->
					<el-input v-model="ruleForm.name" style='width:305px' disabled></el-input>
				</el-form-item>
			</div>

			<div class="form_list">
				<el-form-item label="图层坐标系">
					<!-- item.layerProj -->
					<el-input v-model="ruleForm.name" style='width:305px'></el-input>
				</el-form-item>

				<el-form-item label="数据类型">
					<!-- item.geoType -->
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>

				<el-form-item label="状态">
					<el-switch v-model="ruleForm.value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>{{ruleForm.value2}}
				</el-form-item>
			</div>

			<!-- 图层信息 / 样式表 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-bottom:15px'>
				<el-breadcrumb-item><i class="el-icon-caret-right"></i> 图层信息 / 样式表 </el-breadcrumb-item>
			</el-breadcrumb>

			<div class="form_list">
				<el-form-item label="最小显示级别">
					<div class="block">
						<el-slider v-model="value7" :min="1" :max="5" :step="1" show-tooltip input-size="mini"></el-slider>
					</div>
				</el-form-item>

				<i style="width:20px"></i>
				<el-form-item label="最大显示级别">
					<div class="block">
						<el-slider v-model="value7" :min="1" :max="5" :step="1" show-tooltip input-size="mini"></el-slider>
					</div>
				</el-form-item>
			</div>

			<!-- 图层信息 / 样式表 / 数据条件 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-bottom:15px'>
				<el-breadcrumb-item><i class="el-icon-caret-right"></i> 图层信息 / 样式表 / 数据条件 </el-breadcrumb-item>
			</el-breadcrumb>

			<div class="form_list">
				<el-form-item label="字段类型">
					<el-select v-model="value" placeholder="请选择" style='width:80px'>
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>

					<el-input v-model="ruleForm.name" style='width:65px'></el-input>

					<el-select v-model="value" placeholder="请选择" style='width:80px'>
						<el-option v-for="item in operator" :key="item.value" :value="item.value"></el-option>
					</el-select>

					<el-input v-model="ruleForm.name" style='width:65px'></el-input>

					<el-button type="primary" icon="el-icon-plus" size="mini" circle style="padding:3px"></el-button>
				</el-form-item>
			</div>

			<!-- 图层信息 / 样式表 / 样式 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-bottom:15px'>
				<el-breadcrumb-item><i class="el-icon-caret-right"></i> 图层信息 / 样式表 / 样式 </el-breadcrumb-item>
			</el-breadcrumb>

			<div class="form_list">
				<el-form-item label="图标名称">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>

				<el-form-item label="大小">
					<el-input v-model="ruleForm.name" style='width:65px'></el-input>
				</el-form-item>

				<el-form-item label="宽度">
					<el-input v-model="ruleForm.name" style='width:65px'></el-input>
				</el-form-item>

				<el-form-item label="边线宽度">
					<el-input v-model="ruleForm.name" style='width:65px'></el-input>
				</el-form-item>

				<el-form-item label="旋转角度">
					<el-input v-model="ruleForm.name" style='width:65px'></el-input>
				</el-form-item>
			</div>

			<div class="form_list">
				<el-form-item label="转角样式">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>

				<el-form-item label="间隔显示">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>

				<el-form-item label="间隔距离">
					<el-input v-model="ruleForm.name" style='width:65px'></el-input>
				</el-form-item>

				<el-form-item label="初始位置">
					<el-input v-model="ruleForm.name" style='width:65px'></el-input>
				</el-form-item>
			</div>

			<div class="form_list">
				<el-form-item label="最小显示级别">
					<div class="block">
						<el-slider v-model="value7" :min="1" :max="5" :step="1" show-tooltip input-size="mini"></el-slider>
					</div>
				</el-form-item>

				<i style="width:20px"></i>
				<el-form-item label="最大显示级别">
					<div class="block">
						<el-slider v-model="value7" :min="1" :max="5" :step="1" show-tooltip input-size="mini"></el-slider>
					</div>
				</el-form-item>

				<el-form-item label="颜色">
					<el-color-picker v-model="color4" size="mini" color-format="rgba"></el-color-picker>
				</el-form-item>

				<el-form-item label="背景色">
					<el-color-picker v-model="color4" size="mini" color-format="rgba"></el-color-picker>
				</el-form-item>
			</div>

			<!-- 图层信息 / 样式表 / 标注信息 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-bottom:15px'>
				<el-breadcrumb-item><i class="el-icon-caret-right"></i> 图层信息 / 样式表 / 标注信息 </el-breadcrumb-item>
			</el-breadcrumb>

			<div class="form_list">
				<el-form-item label="字体">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="字号">
					<el-input v-model="ruleForm.name" style='width:65px'></el-input>
				</el-form-item>

				<el-form-item label="颜色">
					<el-color-picker v-model="color4" size="mini" color-format="rgba"></el-color-picker>
				</el-form-item>

				<el-form-item label="最大长度">
					<el-input-number v-model="ruleForm.name" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
				</el-form-item>
			</div>

			<div class="form_list">
				<el-form-item label="位置">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="偏移量">
					<el-input v-model="ruleForm.name" style='width:65px'></el-input>
				</el-form-item>

				<el-form-item label="边框颜色">
					<el-color-picker v-model="color4" size="mini" color-format="rgba"></el-color-picker>
				</el-form-item>
			</div>
			<div class="form_list">
				<el-form-item label="最大长度">
					<el-input-number v-model="ruleForm.name" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
				</el-form-item>

				<el-form-item label="阴影大小">
					<div class="block">
						<el-slider v-model="value8" range :min="1" :max="100" :step="1" input-size="mini"></el-slider>
					</div>
				</el-form-item><i style="width:20px"></i>

				<el-form-item label="最小显示级别">
					<div class="block">
						<el-slider v-model="value7" :min="1" :max="5" :step="1" show-tooltip input-size="mini"></el-slider>
					</div>
				</el-form-item><i style="width:20px"></i>

				<el-form-item label="最大显示级别">
					<div class="block">
						<el-slider v-model="value7" :min="1" :max="5" :step="1" show-tooltip input-size="mini"></el-slider>
					</div>
				</el-form-item>
			</div>
			
			<!-- 图层信息 / 样式表 / 标注信息 / 背景样式 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-bottom:15px'>
				<el-breadcrumb-item><i class="el-icon-caret-right"></i> 图层信息 / 样式表 / 标注信息 / 背景样式 </el-breadcrumb-item>
			</el-breadcrumb>

			<div class="form_list">
				<el-form-item label="颜色">
					<el-color-picker v-model="color4" size="mini" color-format="rgba"></el-color-picker>
				</el-form-item>

				<el-form-item label="背景色">
					<el-color-picker v-model="color4" size="mini" color-format="rgba"></el-color-picker>
				</el-form-item>	
			</div>
			<div class="form_center">
				<el-button type="primary" size="mini"> 提交 </el-button>
				<el-button size="mini"> 重置 </el-button>
			</div>
			<!-- </div> -->
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "edit",
		data() {
			return {
				value7: 0,
				value8: [25,75],
				serverInfo: {},
				hackReset: true,
				color4: '#409EFF',
				ruleForm: {
					name: '123',
					value2: false
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
				},
				value: '',
				options: [{
						value: 'int',
						label: 'int'
					},
					{
						value: 'string',
						label: 'string'
					}
				],
				operator: [{
						value: '>'
					},
					{
						value: '<'
					},
					{
						value: '='
					},
					{
						value: '>='
					},
					{
						value: '<='
					},
					{
						value: '!='
					}
				],
			}
		},
		methods: {
			getEditList() {
				let self = this;

				self.$http.post('http://10.60.84.68:8080/serviceManage/queryServiceInfo', {
					"pageNum": 1,
					"pageSize": 1,
					"condition": {
						"serviceName": "gisserver_wms_shape_boundary_china",
						"serviceType": "WMS"
					}
				}).then(function(response) {
						if(response.status == 200) {
							let data_ = response.body.data;
							self.serverInfo = data_.list[0];
							console.log(data_.list[0]);

							self.$nextTick(() => {
								self.field();
							})
						}
					},
					function(error) {
						console.log(error);
					});
			},

			field() {
				var self = this;
				self.$http.get('http://10.60.84.68:8080/commonGisService/getMapDataField?filePath='+1234)
				.then(res => {
					console.info(res);
				})
			},

			handleChange(value) {
				console.info(value);
			}
		},
		mounted: function() {
			this.getEditList();
		}
	}
</script>

<style scoped>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
	
	.editShow {
		width: 100%;
		height: 100%;
	}
	
	.editShowTitle {
		line-height: 30px;
		padding: 5px 20px;
		text-align: center;
		background-color: #409EFF;
		border-bottom: 1px solid #ccc;
		color: #fff;
	}
	
	.editShow form {
		padding: 25px;
	}
	
	.form_list {
		display: flex;
	}

	.form_center {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 25px 0;
	}
	
	.form_list .block {
		width: 100px;
	}
</style>