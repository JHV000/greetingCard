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
    id:0,
    img: '/static/img/teacher.jpg',
    imgArr:[
      {
        imgUrl: '/static/img/teacher.jpg',
        id:0
      },
      {
        imgUrl: '/static/img/tutor.jpg',
        id: 1
      },
      {
        imgUrl: '/static/img/myself.jpg',
        id: 2
      },
      {
        imgUrl: '/static/img/roommate.jpg',
        id: 3
      },
      {
        imgUrl: '/static/img/lover.jpg',
        id: 4
      },
      {
        imgUrl: '/static/img/aunt.jpg',
        id: 5
      },
      {
        imgUrl: '/static/img/driver.jpg',
        id: 6
      },
      {
        imgUrl: '/static/img/freshmen.jpg',
        id: 7
      },
      {
        imgUrl: '/static/img/classmates.jpg',
        id: 8
      },
      {
        imgUrl: '/static/img/friends.jpg',
        id: 9
      },
      {
        imgUrl: '/static/img/cook.jpg',
        id: 10
      },
      {
        imgUrl: '/static/img/waimai.jpg',
        id: 11
      },
      {
        imgUrl: '/static/img/leader.jpg',
        id: 12
      },
      {
        imgUrl: '/static/img/baoan.jpg',
        id: 13
      },
    ]
  },
  getNew(){
    this.selectComponent('#tag').getNew()
  },
  showmessage(res) {
    var that = this
    this.setData({
      mes: res.detail[0],
      tag: res.detail[1],
      id: res.detail[2]
    })
    that.listen()
    // console.log(that.data.mes)
  },
  listen() {
    var id = this.data.id
    this.setData({
      img :this.data.imgArr[id].imgUrl
    })
  //  console.log(this.data.img)
    this.canvasImg()
  },
  canvasImg() {
    wx.showLoading({
      title: '处理中...请稍后',
    })
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
    wx.hideLoading();
  },
  saveImg() {
    // console.log(this.data.tag)
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
      }
      
    })
    this.count()
  },
  count(){
    wx.request({
      method: "POST",
      url: 'https://youthapi.sdut.edu.cn/api/graduationgreetingcard',
      data: {
        op: "add",
        tag:this.data.tag
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res){
        // console.log(res)
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
  onShareAppMessage: function (options) {
    return {
      title:'毕业贺卡',
      desc:'一起来送上你的祝福吧',
      imageUrl:'/static/img/share.jpg'
    }
  }
})