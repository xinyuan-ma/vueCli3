<!--说明： 方法一：常规的用法； 方法二：灵活，可以控制导出的具体那几列的数据-->
<template>
	<div class="download_excel">
		<el-table
			id="downTable"
			:data="tableData"
			style="width: 100%">
			<el-table-column
				prop="date"
				label="日期"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="姓名"
				width="180">
			</el-table-column>
			<el-table-column
				prop="address"
				label="地址">
			</el-table-column>
		</el-table>
		<button @click="download1">下载方式1</button>
		<button style="margin-left: 50px" @click="download2">下载方式2</button>
	</div>
</template>

<script>
import { export_json_to_excel } from './Export2Excel.js' // eslint-disable-line

export default {
	data () {
		return {
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
		}
	},
	methods: {
		download1 () {
			Promise.all([import('file-saver'), import('xlsx')]).then((
				[FileSaver, XLSX]) => {
				// 获取table的dom
				var wb = XLSX.utils.table_to_book(document.querySelector('#downTable'))
				/* get binary string as output */
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
				try {
					FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '下载文档1.xlsx') // 设置导出excel的名称
				} catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
				return wbout
			})
		},
		download2 () {
			const tHeader = [
				'日期', '姓名', '地址']
			const filterVal = [
				'date',
				'name',
				'address']
			const list = this.tableData
			const data = this.formatJson(filterVal, list)
			console.log(data, 123)
			export_json_to_excel({
				header: tHeader,
				data,
				filename: this.filename,
				autoWidth: this.autoWidth,
				bookType: this.bookType
			})
		},
		formatJson (filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => {
				if (j === 'hotelRightUseFlag') {
					return this.hotelRightUseFlagFilter(v[j])
				} else {
					return v[j]
				}
			}))
		},
		hotelRightUseFlagFilter (status) {
			const statusMap = {
				true: '已使用',
				false: '未使用'
			}
			return statusMap[status]
		}
	}
}
</script>
<style lang="less">
	.download_excel {
		text-align: left;
	}
</style>
