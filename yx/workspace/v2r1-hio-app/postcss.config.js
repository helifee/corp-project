// 处理浏览器兼容新词缀的
module.exports = {
    plugins: [
        require('autoprefixer')({browsers:'last 2 versions'})
    ]
}