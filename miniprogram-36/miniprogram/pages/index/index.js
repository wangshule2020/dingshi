// pages/wweibo/wweibo.js
const app = getApp();
const db = wx.cloud.database();
var adds = {};  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImages: [],
    tempFilePaths:[],
    //loginOK:false,
    gender:[],
    currentType: 0,
    aaa:0
  },
  // onShow:function(options){
  //   var searchData = wx.getStorageSync("password");
  //   if (searchData == "login") {
  //     this.setData({
  //       loginOK: true
  //     })
  //   }else{
  //     this.setData({
  //       loginOK: false
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that =this;
      wx.request({
        url: 'https://www.wangshule.top:8089/getTypeList',
        header: {
          'cookie': wx.getStorageSync("cookieKey")
        },
        success(res) {
          console.log(res);
          const type = res.data.Data;
          that.setData({
            gender: type
          })
          wx.setStorageSync('type', type)
        }
      })
    
   
    this.initImageSize();
    const data=options.data;
  },


  /**
   * 生命周期函数--监听页面显示
   */

  initImageSize: function () {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const containerWidth = windowWidth - 60;
    const imageSize = (containerWidth - 2.5 * 3) / 3;
    this.setData({
      imageSize: imageSize
    })
  },
  
  onSubmitEvent: function (event) {
    const that = this;
    adds.content = event.detail.value.content;
    adds.gender=that.data.aaa;
    wx.showLoading({
      title: '提交中...',
    })
    if ((adds.content == "") || (adds.content == null)){
      wx.showToast({
        icon:"none",
        title: '请输入文字',
      })
    }
      wx.uploadFile({
        url: 'https://www.wangshule.top:8089/addArticle',
        filePath: that.data.tempFilePaths[0],
        name: 'images',
        formData: adds,
        header:{
          "Content-Type": "multipart/form-data",
          'cookie': wx.getStorageSync("cookieKey")
        },
        success(res) {
          console.log(res);
          console.log(adds);
          wx.showToast({
            title: '提交成功',
            icon:'success',
            duration: 2000
          })
        }
      })
  },

  onAddImageTap: function () {
    const that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths=res.tempFilePaths;
        const tempImages = res.tempFilePaths;
        const oldImages = that.data.tempImages;
        const newImages = oldImages.concat(tempImages);
        that.setData({
          tempImages: newImages,
          tempFilePaths: tempFilePaths
        })
      },
    })
  },
  onRemoveBtnTap: function (event) {
    const index = event.target.dataset.index;
    const tempImages = this.data.tempImages;
    tempImages.splice(index, 1);
    this.setData({
      tempImages: tempImages
    })
  },
  
  onImageTap: function (event) {
    const that = this;
    const index = event.target.dataset.index;
    const current = that.data.tempImages[index];
    wx.previewImage({
      urls: that.data.tempImages,
      current: current
    })
  },

  setgender(e){
    this.setData({
      gender:e.currentTarget.dataset.gender
    })
  },
  onCancelEvent: function (event){
    this.setData({
      tempImages: [],
    })
  },
  login(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  onSetTap(){
    wx.navigateTo({
      url: '/pages/set/set',
    })
  },
  tuichu(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  chooseType: function (options) {
    var that = this
    var id = options.currentTarget.dataset.id;
    that.setData({
      'currentType': id,
      "aaa":id
    })
  }
})