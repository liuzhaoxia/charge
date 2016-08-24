/**
 * Created by 123 on 2016/8/8.
 */
import { handleActions } from 'redux-actions'
import detailActions  from '../actions/detailActions'
const initialState = {
    thridPlug:false,
    detailData: [{
        "carBrand": ["3"],//汽车品牌
        "pid": 74609018,// 充电桩/站的永久ID
        "name": "星源国际电动汽车充电站",
        "kindCode": "1",//类型(1,充电站)
        "state": 0,//是否可用，0可用5不可用
        "location": {
            "latitude": 40.008456800067,
            "longitude": 116.47474416608
        },//经纬度
        "socker_num": {
            "sDCquick_num": 0,
            "sACquick_num": 0,
            "sACslow_num": 8,
            "sDCslow_num": 0},//插孔数量（直流快充，交流快充，交流慢充，交流慢充）
        "address": "望京西园222",//地址
        "distance": 2,//距离
        "payment": ["现金","信用卡"], //支付方式（参数pid时，返回）
        "plotPic": ['https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024','https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024'],//图片信息（参数pid时，返回）
        "telephone": '',//电话
        "servicePro": "0",//服务提供商
        "open24H": 2,//是否24小时开放1为是，2为否（参数pid时，返回）
        "parking_fee": 0,//停车费（参数pid时，返回）
        "sockerParams": [{
            "chargingplot_num": [null], //插口所在桩编号
            "acdc": "0",//交直流0（交流）、1（直流）
            "plugType": "1",//插口类型取值：0（交流3孔家用）、1（国标交流7孔插槽） 2（国标直流9孔插槽）、3（美式交流5孔插槽）、4（美式直流Combo插槽）、5（欧式交流7孔插槽）、6（欧式直流Combo插槽）、7（日式直流CHAdeMO插槽）、8（特斯拉专用插槽）、9（其它插槽，默认）、10（无法采集）
            "mode": "0",//快充/慢充0（慢速充电）、1（快速充电）
            "chargingplot_count": 8,//该类型插口数量
        }], //插口详情（参数pid时，返回）
        "charge_fee": "",//充电费用（参数pid时，返回）
        "owner": "null",//个人充电桩所有者（参数pid时，返回）
        "openHour": "00:00-23:59",//营业时间（参数pid时，返回）
        plotKind:0, //整数	0：公共，1：私人，默认null	除了固定充电桩和私人充电桩为：1，其他在转入时均为0


}]
};

const detailReducer = handleActions({
    [detailActions.changeThridModalStatus]:(state,action)=>{
        state = Object.assign({}, state);
        state.thridPlug=action.payload;
        return state;
    },
    [detailActions.setDetailData]: (state, action) => {
        state = Object.assign({}, state);
        let data=action.payload;
        //服务提供商
        if(data[0].servicePro==='0'){
            data[0].servicePro='其它';
        }else if(data[0].servicePro==='1'){
            data[0].servicePro='国家电网';
        }else if(data[0].servicePro==='2'){
            data[0].servicePro='南方电网';
        }else if(data[0].servicePro==='3'){
            data[0].servicePro='中石油';
        }else if(data[0].servicePro==='4'){
            data[0].servicePro='中石化';
        }else if(data[0].servicePro==='5'){
            data[0].servicePro='中海油';
        }else if(data[0].servicePro==='6'){
            data[0].servicePro='中国普天';
        }else if(data[0].servicePro==='7'){
            data[0].servicePro='特来电';
        }else if(data[0].servicePro==='8'){
            data[0].servicePro='循道新能源';
        }else if(data[0].servicePro==='9'){
            data[0].servicePro='富电科技';
        }else if(data[0].servicePro==='10'){
            data[0].servicePro='华商三优';
        }else if(data[0].servicePro==='12'){
            data[0].servicePro='港灯';
        }else if(data[0].servicePro==='13'){
            data[0].servicePro='澳电';
        }else if(data[0].servicePro==='11'){
            data[0].servicePro='中电';
        }
        //支付方式
        for(let i in data[0].payment){
            if(data[0].payment[i]==='0'){
                data[0].payment[i]='其他';
            }else if(data[0].payment[i]==='1'){
                data[0].payment[i]='现金';
            }else if(data[0].payment[i]==='2'){
                data[0].payment[i]='信用卡';
            }else if(data[0].payment[i]==='3'){
                data[0].payment[i]='借记卡';
            }else if(data[0].payment[i]==='4'){
                data[0].payment[i]='特制充值卡';
            }else if(data[0].payment[i]==='5'){
                data[0].payment[i]='APP';
            }
        }
        state.detailData = data;
        return state;
    }
}, initialState);

export default detailReducer;