module.exports={isAndroidStandardBrowser:function(){var r=navigator.userAgent;return r.indexOf("Android")>=0&&r.indexOf("Chrome")<0&&r.indexOf("Firefox")<0?!0:r.indexOf("MSIE 10")>=0?!0:!1}};