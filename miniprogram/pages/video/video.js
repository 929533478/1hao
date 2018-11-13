// miniprogram/pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
    playIndex: null,
    videolist:[],
    pageSize:2
  },
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videol()
  },
  videol:function(){
    var num = this.data.pageSize += 1
    const db=wx.cloud.database();
    db.collection('myvideo').limit(num).get({
      success:res=>{
     this.setData({
       videolist:res.data
     })
      }
    })
  },
  videoPlay: function (e) {
    console.log(12)
    var length = this.data.videolist.length
    var id = e.currentTarget.id
    var that = this
    that.setData({
      playIndex: id
    })

    setTimeout(fnPlay, 500)

    function fnPlay() {
      var videoContext = wx.createVideoContext('index' + that.data.playIndex)
      videoContext.play()
    }
  },
  
  like:function(e){
    var index = e.currentTarget.dataset['index'];
    var zanshu = this.data.videolist[index].zanshu;
    var hasChange = this.data.videolist[index].hasChange;
    if(hasChange==false){
      this.data.videolist[index].zanshu=(zanshu++)
      this.data.videolist[index].hasChange=true
      //console.log(this.data.videolist[index].zanshu,hasChange)
    }else{
      this.data.videolist[index].zanshu = (zanshu--)
      this.data.videolist[index].hasChange = false
      console.log(this.data.videolist[index].zanshu,hasChange)
    }
    var carts = this.data.videolist;
    carts[index].zanshu = zanshu;
   
    //console.log(carts)
    var that = this 
    that.setData({
      videolist: carts,
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
    this.videol()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})