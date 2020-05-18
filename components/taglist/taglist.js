Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
  },
  data: {
    color: '',
    tag: '',
    mes:'',
    id:0,
    // 这里是一些组件内部数据
    ColorList: [{
        title: '致老师',
        name: 'olive',
        tag: 'teacher',
        id:0
        // color: '#e54d42'
      },
      {
        title: '致导员',
        name: 'orange',
        tag: 'tutor',
        id: 1
        // color: '#f37b1d'
      },
    
      {
        title: '致自己',
        name: 'cyan',
        tag: 'myself',
        id: 2
        // color: '#1cbbb4'
      },
      {
        title: '致舍友',
        name: 'yellow',
        tag: 'roommate',
        id: 3
        // color: '#fbbd08'
      },
      {
        title: '致爱的Ta',
        name: 'red',
        tag: 'lover',
        id:4
        // color: '#39b54a'
      },
      {
        title: '致宿管',
        name: 'purple',
        tag: 'suguan',
        id:5
        // color: '#6739b6'
      },
      {
        title: '致小绿龙师傅',
        name: 'green',
        tag: 'driver',
        id: 6
        // color: '#8dc63f'
      },
      {
        title: '致学弟学妹',
        name: 'blue',
        tag: 'freshmen',
        id:7
        // color: '#0081ff'
      },
      {
        title: '致同班同学',
        name: 'qing',
        tag: 'classmates',
        id: 8
        // color: '#0081ff'
      },
      {
        title: '致朋友',
        name: 'zong',
        tag: 'friends',
        id: 9
        // color: '#0081ff'
      },
      {
        title: '致食堂阿姨',
        name: 'cheng',
        tag: 'cook',
        id: 10
        // color: '#0081ff'
      },
      {
        title: '致外卖小哥',
        name: 'hong',
        tag: 'waimai',
        id: 11
        // color: '#0081ff'
      },
      {
        title: '致班委',
        name: 'zi',
        tag: 'leader',
        id: 12
        // color: '#0081ff'
      },
      {
        title: '致门卫大爷',
        name: 'xing',
        tag: 'baoan',
        id: 13
        // color: '#0081ff'
      },
    ]
  },

  methods: {
    // 这里是一个自定义方法
    getNew(){
      var tag = this.data.tag
      var id = this.data.id
      var that = this
      wx.request({
        method: "POST",
        url: 'https://honghong520.xyz/heka/heka.php',
        data: {
          op: "request",
          tag
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          that.triggerEvent('showmessage', [res.data, tag,id])
        },
        fail(res){
          wx.showToast({
            title: '请求失败',
          })
        }
    })
      
    },  
    getTag(e) {
      var tag = e.currentTarget.dataset.tag
      var id = e.currentTarget.dataset.id
      var that = this
      // var op
      this.setData({
        color: e.currentTarget.dataset.color,
        tag:tag,
        id:id
      })
      wx.request({
        method: "POST",
        url: 'https://honghong520.xyz/heka/heka.php',
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
          that.triggerEvent('showmessage', [res.data,tag,id])
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