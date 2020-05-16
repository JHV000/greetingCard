// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    uclass: '',
    mes: '',
    tag: '',
    img: '/static/img/teacher.jpg'
  },
  getNew(){
    this.selectComponent('#tag').getNew()
  },
  showmessage(res) {
    var that = this
    this.setData({
      mes: res.detail[0],
      tag: res.detail[1],

    })
    that.listen()
    // console.log(that.data.mes)
  },
  listen() {
    var that = this
    if (that.data.tag === 'teacher') {
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
    // this.getWh()
    // console.log("调用地方为"+this.data.width)
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.fillRect(0, 0, 300, 500);
    ctx.drawImage(this.data.img, 0, 0, 300, 500);   //里面的参数无非就是图片放置的位置即图片的横纵坐标，图片的宽高
    var text = this.data.mes;
    var chr = text.split("");//这个方法是将一个字符串分割成字符串数组
    var temp = "";
    var row = [];
    ctx.setFillStyle("#000");
    ctx.setFontSize(20);                               //字大小
    ctx.setTextAlign('left');
    for (var a = 0; a < chr.length; a++) {
      if (ctx.measureText(temp).width < 250) {
        temp += chr[a];
      }
      else {
        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp);
    if (row.length > 10) {
      var rowCut = row.slice(0, 2);
      var rowPart = rowCut[1];
      var test = "";
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (ctx.measureText(test).width < 220) {
          test += rowPart[a];
        }
        else {
          break;
        }
      }
      empty.push(test);
      var group = empty[0] + "..."//这里只显示两行，超出的用...表示
      rowCut.splice(1, 1, group);
      row = rowCut;
    }
    for (var b = 0; b < row.length; b++) {
      ctx.fillText(row[b], 50, 310 + b * 30, 205);
    }
    ctx.fillText(this.data.name, 150, 430, 205);
    ctx.fillText(this.data.uclass, 150, 460, 205);
    ctx.draw();
  },
  saveImg() {
    console.log(this.data.tag)
    var tag = this.data.tag
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,                     //画布宽高
      height: 500,
      destWidth: 900,                 //画布宽高*dpr 以iphone6为准
      destHeight: 1500,
      canvasId: 'myCanvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            // console.log(res);
           
            wx.showToast({
              title: '保存成功！'
            })
          }
        })
        

        wx.request({
          method: "POST",
          url: 'https://honghong520.xyz/heka/heka.php',
          data: {
            op: "query",
            tag
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
      this.setData({
        name: options.name,
        uclass: options.uclass
      })
    
    
    // console.log(options)
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