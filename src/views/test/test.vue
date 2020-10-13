<template>
    <div>
        <p>{{$attrs.name}}</p>
        <p>{{$attrs.data}}</p>
        <vxe-table
                border
                highlight-hover-row
                :data="tableData">
            <vxe-table-column field="id" title="ID"></vxe-table-column>
            <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10002', value: 10002}, {label: 'id大于10003', value: 10003}]" :filter-method="filterNameMethod"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]" :filter-multiple="false"></vxe-table-column>
            <vxe-table-column field="age" title="Age" sortable :filters="[{data: {vals: [], sVal: '', fMenu: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]" :filter-render="{name: 'FilterExcel'}"></vxe-table-column>
            <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
        </vxe-table>
    </div>

</template>

<script>
  export default {
    data () {
      return {
        val: true,
        tableData: [
          { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
          { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
          { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
        ]
      }
    },
    mounted() {
      console.log(this.$attrs, 'attrs');
    },
    props: ['data'],
    methods: {
      filterNameMethod ({ value, row, column }) {
        console.log(value, row, column, 'value, row, column');
        return row.id >= value
      },
      filterAgeMethod ({ option, row }) {
        return row.age === Number(option.data)
      }
    }
  }
</script>
<style lang="less">
	.scrollTest {
		height: 100%;
		overflow: auto;
		p {
			height: 30px;
		}
	}
    .filter {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
