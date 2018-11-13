// miniprogram/pages/dainwei/dinwei.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');//地图插件
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentCity: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    
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

                  } })  } }
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


  geo:function(){
    var that = this
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'PLXBZ-GPLHV-RNWPL-UMDPM-XEG7Q-XWF5F' // 必填
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },

          success: function (addressRes) {
            console.log(addressRes.result.address_component.province)
            var address = addressRes.result.formatted_addresses.recommend;

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

    //调用定位方法

    _this.getUserLocation();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})