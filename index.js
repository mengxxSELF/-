//引用文件系统模块
var fs = require("fs")
//引用imageinfo模块
var imageInfo = require("imageinfo")
//引用images模块
var images = require('images')
var watermarkImg = images('logo.png')
function readFileList(path, filesList) {
    var files = fs.readdirSync(path)
    files.forEach(function(itm, index) {
        var stat = fs.statSync(path + itm)
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {
            var obj = {} //定义一个对象存放文件的路径和名字
            obj.path = path //路径
            obj.filename = itm //名字
            filesList.push(obj)
        }
    })
}
var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function(path) {
        var filesList = []
        readFileList(path, filesList)
        return filesList
    },
    //获取文件夹下的所有图片
    getImageFiles: function(path) {
        var imageList = []
        this.getFileList(path).forEach((item) => {
            var ms = imageInfo(fs.readFileSync(item.path + item.filename))
            ms.mimeType && (imageList.push(item.filename))
        })
        return imageList
    }
}
//获取文件夹下的所有图片
var photos = getFiles.getImageFiles("./public/")
for (var i = 0; i < photos.length; i++) {
    var sourceImg = images('./public/' + photos[i])
    var sourceImgName = photos[i]
    var sWidth = sourceImg.width()
    var sHeight = sourceImg.height()
    var wmWidth = watermarkImg.width()
    var wmHeight = watermarkImg.height()
    images(sourceImg)
    // 设置绘制的坐标位置，右下角距离 40px
        .draw(watermarkImg, sWidth - wmWidth - 20, sHeight - wmHeight - 20)
    // 保存格式会自动识别
        .save('./saveImg/' + sourceImgName + '')
}
