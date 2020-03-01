// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  onSubmitEvent: function (event){
    const password = event.detail.value.password;
    wx.showLoading({
      title: '登录中...',
    })
    wx.request({
      url: 'https://www.wangshule.top:8089/login',
      data: {
        "password":password
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      success:function(res){
        if (res && res.header && res.header['Set-Cookie']) {
          wx.setStorageSync('cookieKey', res.header['Set-Cookie']);   
          }
        let cookie = wx.getStorageSync('cookieKey');
        let header = { 'Content-Type': 'application/x-www-form-urlencoded'};
        if (cookie) {     
          header.Cookie = cookie;
          }
          console.log(cookie)
        console.log(res);
        if(res.data.Data=="login"){
          wx.showToast({
            title: '登录成功',
            icon: "success",
            duration: 2000
          })
          wx.navigateTo({
            url: '/pages/index/index',
          })
         // wx.setStorageSync('password', res.data.Data)
        }else{
          wx.showToast({
            title: '您没有权限登录',
            icon: "none",
            duration: 2000
          })
        }
     },
      fail:function(res){ 
      }
    })
  }
})