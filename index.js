Page({
  data:{
    result1:"",
    result2:"",
    zhuangtai:""
    },
  
   
    
    getData: function () {//查询函数，调用API获取ONENET平台上的信息
      var that=this;
      const requestTask = wx.request({
        url: 'https://api.heclouds.com/devices/23248275/datapoints?datastream_id=Light,HumanSensor&limit=1',
        header: {
          'content-type': 'application/json',
          'api-key': 'x6=np0UwzAjUPTCgdF2flCO4XGY='
        },
        success: function (res) {
      
          var app = getApp()
          app.globalData.location1 = res.data.data.datastreams[0]
          var longitude = app.globalData.location1.datapoints[0].value
          app.globalData.location2 = res.data.data.datastreams[1]
          var latitude = app.globalData.location2.datapoints[0].value
          app.globalData.state = res.data.data.datastreams[2]
          var state = app.globalData.state.datapoints[0].value//设置变量，获取设备传来的参数
          that.setData({
            result1: longitude,
            result2: latitude,
            zhuangtai:state
          })//方便其他函数调用设备的参数
        },
  })
      },
  if(zhuangtai=1){//发送短信
      
        var CryptoJS = require("crypto-js");
        var request = require('request');
        var querystring = require('querystring');
      
      // 云市场分配的密钥Id
      var secretId = "AKID1VHtLDKk61oa3i076HEbqNe2LsGH482TkRrx";
      // 云市场分配的密钥Key
      var secretKey = "lL4JXdyjo6k6gOpE9p3z23ctDeDWeqlmcJ2YIl3p";
      var source = "market";
      
      // 签名
      var datetime = (new Date()).toGMTString();
      var signStr = "x-date: " + datetime + "\n" + "x-source: " + source;
      var sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(signStr, secretKey))
      var auth = 'hmac id="' + secretId + '", algorithm="hmac-sha1", headers="x-date x-source", signature="' + sign + '"';
      
      // 请求方法
      var method = 'GET';
      // 请求头
      var headers = {
          "X-Source": source,
          "X-Date": datetime,
          "Authorization": auth,
      }
      // 查询参数
      var queryParams = {
          'content': '【家有奻奻】您的设备发来一个提示消息，赶快打开小程序查看吧！',
          'mobile': '18610217637'}
      // body参数（POST方法下）
      var bodyParams = {
      }
      // url参数拼接
      var url = 'https://service-24wmec5q-1259648947.gz.apigw.tencentcs.com/release/send/notice/long';
      if (Object.keys(queryParams).length > 0) {
          url += '?' + querystring.stringify(queryParams);
      }
      
      var options = {
          url: url,
          timeout: 5000,
          method: method,
          headers: headers
      }
      if (['POST', 'PUT', 'PATCH'].indexOf(method) != -1) {
          options['body'] = querystring.stringify(bodyParams);
          options['headers']['Content-Type'] = "application/x-www-form-urlencoded";
      }
      
      request(options, function (error, response, body) {
          if (error !== null) {
              console.log('error:', error);
              return;
          }
          console.log(body);
      })
    },
        
  
    openMap: function (e) {//通过已知的经纬度打开地图
      wx.openLocation({
      longitude: Number(this.data.result1),
      latitude: Number(this.data.result2)
      })
      }
  
    })
  
