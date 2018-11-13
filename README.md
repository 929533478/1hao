# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档
 腾讯地图key : PLXBZ-GPLHV-RNWPL-UMDPM-XEG7Q-XWF5F
 小程序的id wx30d054fab34d3314
 百度地图的key u70A5pnNrRT1xAgwM5jl2YIVj1Gv97
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

视频操作

if (!this.data.playIndex)当没有视频播放的时候
var that = this获取this



    videoPlay: function (e) {    
    var length = this.data.list.length
    var id = e.currentTarget.id   //获取当前组件的id 
    log(this.data.playIndex, id) // 当前播放与当前点击
    if (!this.data.playIndex) { // 没有播放时播放视频
      this.setData({
        playIndex: id          //给原本为null的playindex赋值当前点击组件的id
      })      var videoContext = wx.createVideoContext('index'+id)//创建视频对象
      videoContext.play()//播放当前视频
    } else {                    // 有播放时先将prev暂停到0s，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext('index' +this.data.playIndex)//创建视频对象
      videoContextPrev.seek(0)//跳到0s
      videoContextPrev.pause()//暂停播放
      this.setData({
        playIndex: id  //把当前id的值给playindex
      })     
      var videoContextCurrent = wx.createVideoContext('index' +this.data.playIndex)//创建视频对象
      videoContextCurrent.play()//播放当前视频
    }
  },


点赞

<view class="container">
  <view class="list" wx:for="{{list}}" wx:key="key" wx:for-item="item" wx:for-index="index">
    <view class="praise {{item.hasChange? 'changed': ''}}" hover-class="hover_praise" bindtap="praiseThis" data-curIndex="{{index}}">{{item.praise}}</view>
    <view class="author">{{item.author}}</view>
    <view class="info">{{item.info}}</view>
  </view>
</view>



praiseThis: function (e) {
    var index = e.currentTarget.dataset.curindex;
    if (this.list[index]) {
      var hasChange = this.list[index].hasChange;
      if (hasChange !== undefined) {
        var onum = this.list[index].praise;
        if (hasChange) {
          this.list[index].praise = (onum - 1);
          this.list[index].hasChange = false;
        } else {
          this.list[index].praise = (onum + 1);
          this.list[index].hasChange = true;
        }
        this.setData({
          list: this.list
        })
      }
    }
  }

  var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
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
              currentCity:address
            })
          }
        })
      }
    })
  },
  // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面

        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权

        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
点赞
    like:function(e){
    var index = e.currentTarget.dataset['index'];
    var zanshu = this.data.videolist[index].zanshu;

    zanshu++;
    var carts = this.data.videolist;
    carts[index].zanshu = zanshu;
    //console.log(carts)
    var that = this
    that.setData({
      videolist: carts
    })

  },

  