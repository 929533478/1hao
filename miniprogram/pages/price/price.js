// miniprogram/pages/price/price.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pnum:0,
    cx:false,
    jiaru:false,
    imagelist:[{
"img_url":"https://img11.360buyimg.com/n1/jfs/t3313/167/1704661422/268137/e55d221/583152f9N6660f774.jpg"
    }, { "img_url":"https://img11.360buyimg.com/n1/jfs/t3778/2/1731259055/268137/e55d221/583152edN9de7ec18.jpg"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('details').where({
      _id:"W - q6Ftx_Lia3NQnk"
    }).get({
      success: res => {
        this.setData({
          queryResult: res.data
        })
        console.log(this.data.queryResult)
      },
    })
  },
  jiaru:function(){
    var pd = this.data.jiaru
    if (pd == false) {
      pd = true
    } else {
      pd = false
    }

    console.log(pd)

    this.setData({
      jiaru: pd

    })

  },
  jia:function(){
    var pnum = this.data.pnum
    pnum++
    this.setData({
      pnum: pnum
    })
  },
  jian: function () {
    var pnum = this.data.pnum
    pnum--
    if(pnum<=0){
       pnum=0
    }
    this.setData({
      pnum: pnum
    })
  },
  
  cuxiao:function(){
   
    var pd = this.data.cx
    if (pd==false){
       pd=true
    }else{
      pd = false
    }
   
    console.log(pd)
   
    
    this.setData({
        cx:pd
     
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})