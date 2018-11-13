// miniprogram/pages/home/home.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;
let goodsList = [
  { actEndTime: '2018-12-5 10:00:43' }
  
] 
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCity: '',//定位数据
    degsum:0,/*旋转图片*/
    pageSize: 0,
    /*上拉图片数据*/ 
    shopimg:[],
    /*倒计时数据*/
    countDownList: [],
    actEndTimeList: [],
    titlelist: [{ "img_url":"https://m.360buyimg.com/mobilecms/s450x450_jfs/t26440/250/883498708/52720/e0cf45fc/5bbc1c49Ne116db3d.jpg","tname":"东北大米","price":"35","oprice":"55"},
      { "img_url": "https://m.360buyimg.com/n12/s220x220_jfs/t15727/272/2533668723/346655/8b5e3154/5ab0e619N2221106f.jpg", "tname": "牛奶蛋糕", "price": "18", "oprice": "20" },
      { "img_url": "https://m.360buyimg.com/mobilecms/s220x220_jfs/t19339/55/759661382/91186/a32036b9/5aa77e11Na27afa82.jpg", "tname": "特仑苏", "price": "35", "oprice": "55" },
      { "img_url": "https://m.360buyimg.com/mobilecms/s220x220_jfs/t21337/199/2462561068/186093/c91cda5a/5b592e23N148c3117.jpg", "tname": "三只松鼠", "price": "35", "oprice": "55" },
      { "img_url": "https://m.360buyimg.com/mobilecms/s450x450_jfs/t26440/250/883498708/52720/e0cf45fc/5bbc1c49Ne116db3d.jpg", "tname": "东北大米", "price": "35", "oprice": "55" },
      { "img_url": "https://m.360buyimg.com/mobilecms/s450x450_jfs/t26440/250/883498708/52720/e0cf45fc/5bbc1c49Ne116db3d.jpg", "tname": "东北大米", "price": "35", "oprice": "55" },
      { "img_url": "https://m.360buyimg.com/mobilecms/s450x450_jfs/t26440/250/883498708/52720/e0cf45fc/5bbc1c49Ne116db3d.jpg", "tname": "东北大米", "price": "35", "oprice": "55" },
      { "img_url": "https://m.360buyimg.com/mobilecms/s450x450_jfs/t26440/250/883498708/52720/e0cf45fc/5bbc1c49Ne116db3d.jpg", "tname": "东北大米", "price": "35", "oprice": "55" },
    
    ],
    host:"1",
    queryResult:"",
    floorimg:[
      { "img_url":"https://6170-appsjop-18c083-1257902140.tcb.qcloud.la/image/carousel/7f1e64ffc2091d5a.jpg?sign=d7f08a3e4b0eb8a6080e4dea3468fcbe&t=1540631761"},
    { "img_url":"https://6170-appsjop-18c083-1257902140.tcb.qcloud.la/image/carousel/c2570063cf2c126a.jpg?sign=d6ae122f9a8471569f0846b6e666605f&t=1540631866"},
      { "img_url":"https://6170-appsjop-18c083-1257902140.tcb.qcloud.la/image/carousel/db95fddcbc1e630b.jpg?sign=958ee01d6a1d973c6df9d0c21513a8d7&t=1540631932"}
    ],
    imagelist: [
      { "img_url":"https://6170-appsjop-18c083-1257902140.tcb.qcloud.la/image/carousel/1999da6845d56124.jpg?sign=4f5ee10cfb8da2a82fcc4d94f2ab94ca&t=1540630770"},
      { "img_url":"https://6170-appsjop-18c083-1257902140.tcb.qcloud.la/image/carousel/1999da6845d56124.jpg?sign=2c813a4c8ad17de55d59a3b673bf0807&t=1540630909"},
      { "img_url":"https://6170-appsjop-18c083-1257902140.tcb.qcloud.la/image/carousel/93572ad45e21ec0b.jpg?sign=f4e1dc734d56ff5e13616744d94802c7&t=1540631188"},
      { "img_url":"https://6170-appsjop-18c083-1257902140.tcb.qcloud.la/image/carousel/93a699b139980bc6.jpg?sign=4e6909110f7363c3fdba722133ed48d4&t=1540631211"},
      { "img_url":"https://6170-appsjop-18c083-1257902140.tcb.qcloud.la/image/carousel/bcf3845535a9ec97.jpg?sign=ddcdb7ab2a3ef93e2c871fcd856b5cf6&t=1540631232"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //地图
    

   // console.log(this)
    this.more()//执行
    let endTimeList = [];
    // 将活动的结束时间参数提成一个单独的数组，方便操作
    goodsList.forEach(o => { endTimeList.push(o.actEndTime) })
    this.setData({ actEndTimeList: endTimeList });
    // 执行倒计时函数
    this.countDown();

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    //查询图片签到,抽奖
    const db = wx.cloud.database();
    db.collection('touch').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: res.data
        })
        //console.log(this.data.queryResult)
      },
    })
  

//1号热点
    var thiss = this
    var redain = 0
    setInterval(function () {
      redain += -1;
      
      thiss.setData({
        host: redain
      });
      if (redain == -40) { redain = 0 }
    },100)

    /*旋转图片*/
    var deg = this
    var sum = 0
    setInterval(function () {
      sum += 2;
      deg.setData({
        degsum: sum
      })
      // console.log(sum)
      if (sum == 342) {
        sum = 0;
      }
    }, 50)
    
  },
  //跳转
  myjump(){
    wx.navigateTo({
   url: '../price/price' 
       
  })
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() {//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({ countDownList: countDownArr })
    setTimeout(this.countDown, 1000);
  },

  

  more:function(){
    //查询商品上拉数据
    
    var num = this.data.pageSize += 5
        
    //console.log(this.data.pageSize)
    const db = wx.cloud.database();
    db.collection('shopimg').limit(num).get({
      success: res => {
        this.setData({
          shopimg: res.data
        })
        //console.log(this.data.shopimg)
      }
    })

  },
  //地图
  getUserLocation: function () {

    var _this = this;

    wx.getSetting({

      success: (res) => {



        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {

          //未授权

          wx.showModal({

            title: '请求授权当前位置',

            content: '需要获取您的地理位置，请确认授权',

            success: function (res) {

              if (res.cancel) {

                //取消授权

                wx.showToast({

                  title: '拒绝授权',

                  icon: 'none',

                  duration: 1000

                })

              } else if (res.confirm) {

                //确定授权，通过wx.openSetting发起授权请求

                wx.openSetting({

                  success: function (res) {

                    if (res.authSetting["scope.userLocation"] == true) {

                      wx.showToast({

                        title: '授权成功',

                        icon: 'success',

                        duration: 1000

                      })

                      //再次授权，调用wx.getLocation的API

                      _this.geo();

                    } else {

                      wx.showToast({

                        title: '授权失败',

                        icon: 'none',

                        duration: 1000

                      })

                    }

                  }
                })
              }
            }
          })

        } else if (res.authSetting['scope.userLocation'] == undefined) {

          //用户首次进入页面,调用wx.getLocation的API

          _this.geo();

        }

        else {

          //console.log('授权成功')

          //调用wx.getLocation的API

          _this.geo();

        }

      }

    })



  },  
  geo: function () {
    var that = this
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'PLXBZ-GPLHV-RNWPL-UMDPM-XEG7Q-XWF5F' // 必填
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
       // console.log(res)
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },

          success: function (addressRes) {
            //console.log(addressRes.result.address_component.province)
            var address = addressRes.result.address_component.province;

            that.setData({
              currentCity: address
            })
          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
     _this.getUserLocation();//调用定位方法
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.more()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})