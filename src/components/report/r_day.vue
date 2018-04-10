<template>
  <div style="min-height: 300px">
    <DatePicker :value="date" format="yyyy-MM-dd" type="date" placeholder="选择日期" @on-change="getDate"></DatePicker>
    <Button class="hy_btn" @click="getList">查询</Button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { re_day } from '../../interface';

  export default {
    name: 'r_day',
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
                }, '详情'),
              ]);
            }
          }
        ],
        showData: [],
        date: '',
        data: [
          {
            r_type: '经营报表',
            r_date: '2015-12-12',
          },
        ],
      }
    },
    created() {
      this.showData = this.data;
    },
    methods: {
      getDate(date) {
        this.date = date;
      },
      getList() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: re_day() +"?reportTime=" + this.date,
        }).then((res) => {
//          this.questionList = res.data;
        }).catch((error) => {
        });
      }
    }
  };
</script>

<style scoped>
  .center{
    margin-top: 10px;
    text-align: center;
  }
</style>
