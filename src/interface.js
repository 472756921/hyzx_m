/**
 * Created by Benson on 2017/11/29.
 */

const host = 'http://116.62.201.135:8080';

export const login = function () {
  const URL = '/app/api/user/login';
  const API = host + URL;
  return API;
};

export const logout = function () {
  const URL = '/app/api/user/logout';
  const API = host + URL;
  return API;
}

//----------------------------------------------------------------------------------------
//员工列表
export const e_list = function () {
  const URL = '/app/api/user/findUserList';
  const API = host + URL;
  return API;
};
//员工列表
export const e_Alllist = function () {
  const URL = '/app/api/user/findAllUser';
  const API = host + URL;
  return API;
};
//根据Id查询员工
export const e_list_byID = function () {
  const URL = '/app/api/user/findById';
  const API = host + URL;
  return API;
};
//编辑员工
export const e_edit = function () {
  const URL = '/app/api/user/edit';
  const API = host + URL;
  return API;
};
//新增员工
export const e_save = function () {
  const URL = '/app/api/user/save';
  const API = host + URL;
  return API;
};
//离职员工
export const e_outList = function () {
  const URL = '/app/api/user/findQuitList';
  const API = host + URL;
  return API;
};
//离职员工
export const e_out = function () {
  const URL = '/app/api/user/quit';
  const API = host + URL;
  return API;
};
//获取岗位
export const e_postList = function(){
  const URL = '/app/api/post/findPostList';
  const API = host + URL;
  return API;
}
//----------------------------------------------------------------------------------------
//顾客列表
export const u_list = function () {
  const URL = '/app/api/customer/findCustomerList';
  const API = host + URL;
  return API;
};
//顾客列表
export const u_Alllist = function () {
  const URL = '/app/api/customer/findAllCustomer';
  const API = host + URL;
  return API;
};
//新增顾客
export const u_new = function () {
  const URL = '/app/api/customer/save';
  const API = host + URL;
  return API;
};
//修改顾客
export const u_edit = function () {
  const URL = '/app/api/customer/edit';
  const API = host + URL;
  return API;
};
//用户ID查询消费
export const ser_Bill = function () {
  const URL = '/app/api/customer/findBillById';
  const API = host + URL;
  return API;
};
//用户现有卡情况
export const ser_cardList = function () {
  const URL = '/app/api/customer/findOwningCardById';
  const API = host + URL;
  return API;
};
//用户现有卡情况
export const ser_findById = function () {
  const URL = '/app/api/customer/findById';
  const API = host + URL;
  return API;
};
//新增卡
export const card_save = function(){
  const URL = '/app/api/customer/addCard';
  const API = host + URL;
  return API;
}
//各类问题描述
export const ser_Problem = function () {
  const URL = '/app/api/customer/findAllProblem';
  const API = host + URL;
  return API;
};
//获取用户的问题
export const ser_UserProblem = function () {
  const URL = '/app/api/customer/findMyProblem';
  const API = host + URL;
  return API;
};
//获取全部问题
export const problemList = function(){
  const URL = '/app/api/problem/findProblemList';
  const API = host + URL;
  return API;
}
//保存用户的问题
export const ser_ProblemSave = function () {
  const URL = '/app/api/customer/problemSave';
  const API = host + URL;
  return API;
};
//获取解决方案
export const ser_findPlan = function () {
  const URL = '/app/api/customer/findPlan';
  const API = host + URL;
  return API;
};
//保存方案
export const ser_problemBegin = function () {
  const URL = '/app/api/customer/problemBegin';
  const API = host + URL;
  return API;
};
//----------------------------------------------------------------------------------------
//服务单列表
export const ser_list = function () {
  const URL = '/app/api/service/findServiceOrder';
  const API = host + URL;
  return API;
};
//获取用户卡项等信息
export const getUserCard = function () {
  const URL = '/app/api/customer/findOwningCardById';
  const API = host + URL;
  return API;
}
//保存服务单
export const ser_save = function () {
  const URL = '/app/api/service/save';
  const API = host + URL;
  return API;
};
//编辑服务单
export const ser_edit = function () {
  const URL = '/app/api/service/edit';
  const API = host + URL;
  return API;
}

//用户ID查询服务单
export const ser_OverByUserID = function () {
  const URL = '/app/api/service/findByCustomerId';
  const API = host + URL;
  return API;
};
//服务单结算
export const ser_Over = function () {
  const URL = '/app/api/service/settlement';
  const API = host + URL;
  return API;
};
//获取技师排列规则
export const getRule = function () {
  const URL = '/app/api/store/findStoreById';
  const API = host + URL;
  return API;
}
//----------------------------------------------------------------------------------------
//投诉列表
export const c_list = function () {
  const URL = '/app/api/complaints/findComplaintsList';
  const API = host + URL;
  return API;
};
//新增投诉
export const c_save = function () {
  const URL = '/app/api/complaints/save';
  const API = host + URL;
  return API;
};
//投诉处理
export const c_handle = function () {
  const URL = '/app/api/complaints/handle';
  const API = host + URL;
  return API;
};
//----------------------------------------------------------------------------------------
//库存盘点
export const s_List = function () {
  const URL = '/app/api/warehousing/findList';
  const API = host + URL;
  return API;
};
//库存盘点
export const s_AllList = function () {
  const URL = '/app/api/warehousing/findAllList';
  const API = host + URL;
  return API;
};
//入库记录
export const s_inStock = function () {
  const URL = '/app/api/warehousing/findWarehousingList';
  const API = host + URL;
  return API;
};
//出库记录
export const s_outStock = function () {
  const URL = '/app/api/warehousing/findWarehousinOutgList';
  const API = host + URL;
  return API;
};
//新增库存
export const s_save = function () {
  const URL = '/app/api/warehousing/save';
  const API = host + URL;
  return API;
};
//出库
export const s_out = function () {
  const URL = '/app/api/warehousing/warehousingOut';
  const API = host + URL;
  return API;
};
//----------------------------------------------------------------------------------------
//产品列表
export const p_list = function () {
  const URL = '/app/api/project/findProjectList';
  const API = host + URL;
  return API;
};
//产品列表
export const p_Alllist = function () {
  const URL = '/app/api/project/findAllProject';
  const API = host + URL;
  return API;
};
//问题列表
export const pro_list = function() {
  const URL = '/app/api/problem/findProblemList';
  const API = host + URL;
  return API;
}
//解决方案列表
export const solu_list = function () {
  const URL = '/app/api/problem/solution/findSolutionList';
  const API = host + URL;
  return API;
}
//------------------------------------------------------------------------
//房间列表
export const r_list = function () {
  const URL = '/app/api/room/findRoomList';
  const API = host + URL;
  return API;
};
//所有房间列表
export const r_Alllist = function () {
  const URL = '/app/api/room/findAllRoom';
  const API = host + URL;
  return API;
};
//新增房间
export const r_save = function(){
  const URL = '/app/api/room/save';
  const API = host + URL;
  return API;
};
//编辑房间
export const r_edit = function(){
  const URL = '/app/api/room/edit';
  const API = host + URL;
  return API;
};
//删除房间
export const r_delete = function(){
  const URL = '/app/api/room/delete';
  const API = host + URL;
  return API;
};
//搜索房间
export const r_search = function(){
  const URL ='/app/api/room/findById';
  const API = host + URL;
  return API;
}


//------------------------------------------------------------------------
//预约查询
export const re_Alllist = function () {
  const URL = '/app/api/schedule/findScheduleList';
  const API = host + URL;
  return API;
};
//新增预约
export const re_save = function () {
  const URL = '/app/api/schedule/save';
  const API = host + URL;
  return API;
};
//预约转服务单
export const re_toOrder = function () {
  const URL = '/app/api/schedule/toServiceOrder';
  const API = host + URL;
  return API;
};
// -----------------------------------------------------------------------------
//日报表
export const re_day = function () {
  const URL = '/app/api/report/findDayList';
  const API = host + URL;
  return API;
};
//月报表
export const re_mouth = function () {
  const URL = '/app/api/report/findMouthList';
  const API = host + URL;
  return API;
};
//-------------------------------------------------------------------------------
//会员卡列表
export const mer_Card = function(){
  const URL ='/app/api/membership/findMembership';
  const API = host + URL;
  return API;
}
//拓客卡列表
export const ext_Card = function(){
  const URL = '/app/api/extension/findExtension';
  const API = host + URL;
  return API;
}
//活动卡列表
export const act_Card = function(){
  const URL = '/app/api/activity/findactivity';
  const API = host + URL;
  return API;
}
//疗程组合卡
export const tre_Card = function(){
  const URL = '/app/api/treatment/findTreatment';
  const API = host + URL;
  return API;
}
//产品卡
export const pro_Card = function(){
  const URL = '/app/api/productCard/findproductCard';
  const API = host + URL;
  return API;
}


