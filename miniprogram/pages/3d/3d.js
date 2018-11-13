// miniprogram/pages/3d/3d.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    degsum:0,

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var deg=this
    var sum=0
    setInterval(function (){
      sum+=2;
      deg.setData({
        degsum:sum
      })
     // console.log(sum)
      if(sum==342){
        sum=0;
      }
    },50)
    
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})