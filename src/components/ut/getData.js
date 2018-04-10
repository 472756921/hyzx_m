/**
 * Created by Benson on 2017/12/1.
 */

import {u_Alllist, e_Alllist, s_AllList, p_Alllist, r_Alllist} from '../../interface';

export const getAllClient = (type, _this, callBack)=>{
  let URL = '';
  if(type == 'u_Alllist') {
    URL = u_Alllist();
  }
  if(type == 'e_Alllist') {
    URL = e_Alllist();
  }
  if(type == 's_AllList') {
    URL = s_AllList();
  }
  if(type == 'p_Alllist') {
      URL = p_Alllist()+'?id='+JSON.parse(sessionStorage.getItem('userInfo')).storeId;
  }
  if(type == 'r_Alllist') {
    URL = r_Alllist();
  }

  _this.$ajax({
    method: 'GET',
    dataType: 'JSON',
    contentType: 'application/json;charset=UTF-8',
    headers: {
      "authToken": sessionStorage.getItem('authToken')
    },
    url: URL,
  }).then((res) => {
    callBack(res.data, type);
  }).catch((error) => {
  });
}
