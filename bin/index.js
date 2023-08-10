#!/usr/bin/env node

// 创建命令行指令
const program = require('commander')
// 获取json文件获取版本
const package = require('../package.json');
// 创建命令行交互，提供用户交互收集用户信息
const inquirer = require('inquirer');
// 可以从远程拉取git仓库
const download = require('download-git-repo');
// 创建命令行加载动画
const ora = require('ora')
// 路径
const path = require('path');
// 提供输入 pear-cli --version 输出版本
program.version(`@pears/cli  v${package.version}`)

// 提供模板
const templates = [
    {
        name: "pear-react-element",
        value: 'https://github.com:yanyuehai/pear-element'
    }, {
        name: 'pear-react-admin',
        value: 'https://github.com/yanyuehai/pear-react-admin'
    }
]
// loading 加载
const loading = ora('正在下载....')

// command 返回值：命令的实例对象
program.command('create') //  创建一个命令  叫做 create --> cime-cli create
    .description('创建模版') //  设置命令描述 
    .action(async () => { // 异步处理函数
        // 创建终端输入框
        // 获取用户输入项目名
        let { name } = await inquirer.prompt({
            type: 'input', // list 列表选择  confirm 选择框
            name: 'name', // 问题名称  
            message: '请输入项目名称：'
        })

        // 获取用户选择模板
        let { template } = await inquirer.prompt({
            type: "list", // 实现选择下载模板
            name: 'template',
            message: '请选择下载的项目：',
            choices: templates
        })

        loading.start();
        let dest = path.join(process.cwd(), name)
        download(template, dest, (err) => {
            loading.stop()
            if (err) {
                console.error('下载出错！ Error:', err);
            } else {
                console.log('下载成功');
            }
        });

    })

// 写在最后
program.parse(process.argv)

