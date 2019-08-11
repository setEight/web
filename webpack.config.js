// 导入处理路径的模块
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

// 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
module.exports = {
    //配置打包模式为开发模式
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'), // 项目入口文件
    output: { // 配置输出选项
        path: path.resolve(__dirname, './dist'), // 配置输出的路径
        filename: 'main.js' // 配置输出的文件名
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, 'src/index.html'),//模板路径
            filename:'index.html'//自动生成的HTML文件的名称
        })
    ],
    module: { // 用来配置第三方loader模块的
        rules: [ // 文件的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },//处理css文件的规则
            { test: /\.less$/, use: ['style-loader', 'css-loader','less-loader'] },
            { test: /\.(png|jpg|gif|svg)$/, use: 'url-loader?limit=844&name=[hash:8][name].[ext]' },
            { test: /\.(eot|ttf|woff2|woff)$/, use: 'url-loader' },

            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },

            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    }
}