<template>
  <div>
    <Row :gutter="16">
      <Col span="12">
        <div class="plan">
          <div class="title">服务计划</div>
          <Timeline>
            <TimelineItem>
              <p class="time">2017-08-12</p>
              <p class="content">项目A</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2017-08-18</p>
              <p class="content">项目A</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2017-08-23</p>
              <p class="content">项目A</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2017-08-28</p>
              <p class="content">项目A</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2017-09-12</p>
              <p class="content">项目A</p>
            </TimelineItem>
          </Timeline>
        </div>
      </Col>
      <Col span="12">
        <div class="active">
          <div class="title">实际情况</div>
          <Timeline>
            <TimelineItem>
              <p class="time">2017-08-12</p>
              <p class="content">项目A</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2017-08-18</p>
              <p class="content">项目A</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2017-08-23</p>
              <p class="content">项目A</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2017-08-28</p>
              <p class="content">项目A</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2017-09-12</p>
              <p class="content">项目A</p>
            </TimelineItem>
          </Timeline>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_plan',
  };
</script>

<style scoped>
  .plan .active{
    overflow: auto;
    margin: 10px;
  }
  .time{
    font-size: 14px;
    font-weight: bold;
  }
  .content{
    padding-left: 5px;
  }
  .title{
    margin: 6px 0 18px 0;
    font-size: 18px;
  }
</style>
