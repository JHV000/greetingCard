Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
  },
  data: {
    color: '',
    tag: '',
    mes:'',
    // 这里是一些组件内部数据
    ColorList: [{
        title: '致老师',
        name: 'olive',
        tag: 'teacher'
        // color: '#e54d42'
      },
      {
        title: '致导员',
        name: 'orange',
        tag: 'tutor'
        // color: '#f37b1d'
      },
    
      {
        title: '致自己',
        name: 'cyan',
        tag: 'myself'
        // color: '#1cbbb4'
      },
      {
        title: '致舍友',
        name: 'yellow',
        tag: 'roommate'
        // color: '#fbbd08'
      },
      {
        title: '致爱的Ta',
        name: 'red',
        tag: 'lover'
        // color: '#39b54a'
      },
      {
        title: '致宿管',
        name: 'purple',
        tag: 'suguan'
        // color: '#6739b6'
      },
      {
        title: '致小绿龙师傅',
        name: 'green',
        tag: 'driver'
        // color: '#8dc63f'
      },

      {
        title: '致学弟学妹',
        name: 'blue',
        tag: 'freshmen'
        // color: '#0081ff'
      },

    ]
  },

  methods: {
    // 这里是一个自定义方法
    getTag(e) {
      var tag = e.currentTarget.dataset.tag
      var that = this
      // var op
      this.setData({
        color: e.currentTarget.dataset.color
      })
      wx.request({
        method: "POST",
        url: 'http://119.29.106.231:84/num.php',
        data: {
          op: "request",
          tag
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          // that.setData({
          //   mes : res.data
          // })
          that.triggerEvent('showmessage', res.data)
          // console.log(mes)
          // console.log(tag)
        }
      })

      // console.log(e.currentTarget.dataset)
    },
    showMessage(){
      
    }
  }
})