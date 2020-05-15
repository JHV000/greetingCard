Page({
  data: {
    img: "/static/img/tutor.jpg"
  },
  onLoad: function (options) {
   this.canvasImg()
  },
  canvasImg() {
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.fillRect(0, 0, 300, 400);
    ctx.drawImage(this.data.img, 0, 0, 300, 400);   //里面的参数无非就是图片放置的位置即图片的横纵坐标，图片的宽高
    ctx.setFillStyle("#000");
    ctx.setFontSize(20);                               //字大小
    ctx.setTextAlign('center');                        //是否居中显示，参考点画布中线
    ctx.fillText('今天天气好晴朗', 150, 280);            //150:canvas画布宽300，取1/2，中间，280：纵向位置
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
  }
})