<template>
  <div>
    <Table :columns="columns" :data="showData"></Table>
    <Page :current="2" :total="50" simple class="center"></Page>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'r_manager',
    data () {
      return {
        name: '',
        columns: [
          {
            title: '报表时间',
            key: 'r_date',
          },
          {
            title: '报表类型',
            key: 'r_type'
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [

                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
//                        this.edit(params.index, 1)
                    }
                  }
                }, '下载'),
              ]);
            }
          }
        ],
        showData: [],
        data: [
          {
            r_type: '经营报表',
            r_date: '2015-12',
          },
        ],
      }
    },
    created() {
      this.showData = this.data;
    },
    methods: {
    }
  };
</script>

<style scoped>
  .center{
    margin-top: 10px;
    text-align: center;
  }
</style>
