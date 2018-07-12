<template>
    <div>
        <el-table :data="tableData" border >
            <el-table-column prop="serviceId" label="服务ID" width="70"></el-table-column>
            <el-table-column prop="serviceName" label="服务名称" width="280"></el-table-column>
            <el-table-column prop="serviceUrl" label="服务地址"></el-table-column>
            <el-table-column prop="dataFormat" label="数据格式" width="100"></el-table-column>
            <el-table-column prop="srid" label="坐标系" width="70"></el-table-column>
            <el-table-column prop="centerPoint" label="中心点" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleClick(scope.row)">预览</el-button>
                    <el-button type="text" size="small" @click="editClick()"> 编辑 </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" background layout="total, prev, pager, next" :total="total"></el-pagination>

        <div class="serverEditView" v-if="isEdit">
        	<sup class="model-close" @click="editClick">×</sup>
			<div class="model-layer">
				<vEdit></vEdit>
			</div>
        </div>
    </div>
</template>

<script>
    import Edit from '@/components/serverEditView/editShow'

    export default {
        name: "ServerList",
        data() {
            return {
            	isEdit: false,
                currentPage: 1,
                pageSize: 18,
                total: 0,
                tableData: []
            }
        },

        components: {
            'vEdit': Edit,
        },

        props: {
            serverType: {
                type: String,
                required: true
            }
        },

        created: function() {
            console.log(this.serverType);
        },

        methods: {
            getServerList() {
                let this_ = this;
                this.$http.post(this.myGlobal.serverHeader + /*/com.cloud.isoft.wxs.service*/'/com.cloud.isoft.wxs.service/serviceManage/queryServiceInfo', {
                    "pageNum": this.currentPage,
                    "pageSize": this.pageSize,
                    "condition": {
                        "serviceType": this.serverType
                    }
                }).then(function(response) {
                        if(response.status == 200) {
                            let data_ = response.body.data;
                            this_.total = data_.total
                            this_.tableData = data_.list;
                        }
                    },
                    function(error) {
                        console.log(error);
                    });
            },
            handleClick(row){
                this.$emit('listenToChild',{meunType:'vServerShow',rowData:row});
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getServerList();
            },
            editClick() {
            	this.isEdit ? this.isEdit = false : this.isEdit = true;
            }
        },

        mounted: function() {
            this.getServerList();
        }
    }
</script>
<style>
	::-webkit-scrollbar { width: 0; height: 0; }

    .el-table td,
    .el-table th {
        padding: 5px 0;
    }

    .serverEditView {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background-color: rgba(0,0,0,.5);
    }

    .model-close {
    	position: absolute;
    	top: 0;
    	right: 0;
	    width: 32px;
	    height: 32px;
	    color: #fff;
	    background: #f00;
	    display: flex;
	    /*align-items: center;*/
	    line-height: 30px;
	    justify-content: center;
	    font-size: 20px;
	    cursor: pointer;
    }

    .model-layer {
    	position: absolute;
    	left: 0;
    	right: 0;
    	width: 1000px;
    	height: 96%;
    	margin: 2% auto;
    	/*padding: 25px 15px;*/
    	background-color: #fff;
		overflow: hidden;
		overflow-y: auto;
    }
</style>