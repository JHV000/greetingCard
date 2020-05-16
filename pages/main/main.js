// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '匿名',
    class: '山东理工大学',
    mes:'',
    tag:'',
    img:'/static/img/teacher.jpg'
  },
  showmessage(res) {
    var that = this
    this.setData({
      mes : res.detail[0],
      tag : res.detail[1],
      
    })
    that.listen()
   
    console.log(that.data.img)
  },
  listen(){
    var that = this
    if(that.data.tag === 'teacher'){
      this.setData({
        img: '/static/img/teacher.jpg'
      })
    }
    if (that.data.tag === 'tutor') {
      this.setData({
        img: '/static/img/tutor.jpg'
      })
    }
    if (that.data.tag === 'myself') {
      this.setData({
        img: '/static/img/myself.jpg'
      })
    }
    if (that.data.tag === 'roommate') {
      this.setData({
        img: '/static/img/roommate.jpg'
      })
    }

    if (that.data.tag === 'lover') {
      this.setData({
        img: '/static/img/lover.jpg'
      })
    }
    if (that.data.tag === 'suguan') {
      this.setData({
        img: '/static/img/aunt.jpg'
      })
    }
    if (that.data.tag === 'driver') {
      this.setData({
        img: '/static/img/driver.jpg'
      })
    }
    if (that.data.tag === 'freshmen') {
      this.setData({
        img: '/static/img/freshmen.jpg'
      })
    }
    that.canvasImg()
  },
  canvasImg() {
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.fillRect(0, 0, 300, 400);
    ctx.drawImage(this.data.img, 0, 0, 300, 400);   //里面的参数无非就是图片放置的位置即图片的横纵坐标，图片的宽高
    ctx.setFillStyle("#000");
    ctx.setFontSize(20);                               //字大小
    ctx.setTextAlign('center');                        //是否居中显示，参考点画布中线
    ctx.fillText(this.data.mes, 150, 280);            //150:canvas画布宽300，取1/2，中间，280：纵向位置
    ctx.draw();
  },
  saveImg() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,                     //画布宽高
      height: 400,
      destWidth: 600,                 //画布宽高*dpr 以iphone6为准
      destHeight: 800,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath) //生成的临时图片路径
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '保存成功',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      name: options.name,
      class: options.class
    })
    this.canvasImg()
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