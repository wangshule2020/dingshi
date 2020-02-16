// miniprogram/pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   //loginOK: false,
    type:[],
    time:[],
    hour:[],
    min:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time1=wx.getStorageSync('type');
    this.setData({
          type: time1,
        })
    const that = this;
    // wx.request({
    //   url: 'http://106.15.185.25:8088/getTypeList',
    //   success(res) {
    //     const type = res.data.Data;
    //     that.setData({
    //       type: type,
    //     })
    var time=[];
        for (var i = 0; i < time1.length; i++) {
            time[i]={
            data:{
              hour: (time1[i].SendTime).split(":")[0],
              min: (time1[i].SendTime).split(":")[1],
              Id: time1[i].Id,
              TypeName: time1[i].TypeName,
            } 
          };
        }
        that.setData({
          time: time
        })
        console.log(time);
   
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.time);
    let password = wx.getStorageSync('password');
    if (password == 111) {
      this.setData({
        loginOK: true
      })
    } else {
      this.setData({
        loginOK: false
      })
    }
  },

  onSubmitEvent: function (event) {
    const type=this.data.type;
    var SendTime=[];
    var send=[];
    var Id="";
    for(var i=0;i<type.length;i++){
     SendTime[i] = type[i].hour + ","+type[i].min;
      send[i] = "\""+type[i].Id+"\"" + ":"+"[" + SendTime[i]+"]";
   }
    var send="{"+send+"}";
    var result = JSON.parse(send);
    console.log(result);
    var jsonData = JSON.stringify(result);
    console.log(jsonData);
    var result1 = JSON.parse(jsonData);
    console.log(result1);
    wx.request({
      url: 'https://www.wangshule.top/alterParam',
      data: {
        paramSeting: jsonData,
      },
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync("cookieKey")
      },
      method: "POST",
      dataType: "json",
      success:function(res){
        console.log(res);
        console.log()
        wx.showToast({
          title: '保存成功',
          icon:"success",
          duration:2000
        })
      },
        fail(res){
          console.log(res)
      }
    })
  },
  hour(e){
    let dataset = e.currentTarget.dataset;    
    let value = e.detail.value; // 获取value  
    if (value % 1 != 0 || value < 0 || value > 24) {
      wx.showToast({
        icon: "none",
        title: '时间格式输入错误',
      })     
    }
     console.log(value);    
     let arr = this.data.type;     
     arr[dataset.index].hour=value;    
  },
  min(e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value; // 获取value 
    if (value%1!=0||value<0||value>=60) {
      wx.showToast({
        icon: "none",
        title: '时间格式输入错误',
      })   
    }  
    let arr = this.data.type;
    arr[dataset.index].min= value;
  },
  login(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  tuichu() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
})