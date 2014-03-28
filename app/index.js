//引入依赖模块，不了解的先看看Nodejs基础吧
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
//var chalk = require('chalk');


var ChoiGenerator = module.exports = function ChoiGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
	//console.log(options);
	// this.on('end', function () {
	//  this.installDependencies({ skipInstall: options['skip-install'] });//读取命令中是否有--skip-install，如果有则在项目构建完毕后不自动安装依赖模块，用法：yo test2 --skip-install
	// });

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ChoiGenerator, yeoman.generators.Base);

ChoiGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	//console.log(this.yeoman);

	// replace it with a short and sweet description of your generator
	//this.log(chalk.magenta('You are using yeoman F2E generator!'));

//定义在命令执行时的输出提问信息，该信息你爱怎么用怎么用，比如提问要生成的项目名是什么，然后可以自动写入配置中之类的操作
	var prompts = [
		{
				name: 'projectName',
				message: 'Project Name',
				default: path.basename(process.cwd())
		},
		// {   version有什么用
		//     name: 'version',
		//     message: 'Version Number',
		//     default: '0.0.1'
		// },
		{
				name: 'authorName',
				message: 'Author Name',
				default: 'choizhang'
		},
		{
				name: 'readmeType',
				message: 'readmeType(md, txt, doc)',
				default: 'md',
				choices: ['md', 'txt', 'doc']
		},
		{
				name: 'projectType',
				message: 'Pc or Mb',
				default: 'mb',
				choices: ['mb', 'pc']
		},
		{
				when: function(props) { return (/mb/i).test(props.projectType); },
				type: 'checkbox',
				name: 'features',
				message: 'What more would you need?',
				choices: [
						{
								name: 'guide page',
								value: 'includeGuide',
								checked: true
						},
						{
								name: 'alloydesigner',
								value: 'includeAlloydesigner',
								checked: true
						},
						{
								name: 'MB componet',
								value: 'includeMbComponet',
								checked: true
						},
						{
								name: 'Less2Css.bat',
								value: 'includeLess2Css',
								checked: true
						}
				]
		},
		{
				when: function(props) { return (/pc/i).test(props.projectType); },
				type: 'checkbox',
				name: 'features',
				message: 'What more would you need?',
				choices: [
						{
								name: 'guide page',
								value: 'includeGuide',
								checked: true
						},
						{
								name: 'alloydesigner',
								value: 'includeAlloydesigner',
								checked: true
						},
						{
								name: 'Less2Css.bat',
								value: 'includeLess2Css',
								checked: true
						},
						{
								name: 'header & footer',
								value: 'includeHeadfoot',
								checked: true
						},
						{
								name: 'JS: jQuery  (Newest version)',
								value: 'includeJquery',
								checked: true
						},
						{
								name: 'PC componet',
								value: 'includePcComponet',
								checked: true
						}
				]
		}
		// {
		// 	type: 'confirm',
		// 	name: 'someOption',
		// 	message: 'Would you like to enable this option?',
		// 	default: true
		// }
	];

	this.prompt(prompts, function (props) {

	 for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            }

        var features = props.features;

            function hasFeature(feat) {
                return features.indexOf(feat) !== -1;
            }

       // include grunt  这个在后面grunt里面要用来配置package.json
            // this.includeSprite = hasFeature('includeSprite');
            // this.includePngmin = hasFeature('includePngmin');

            // include html
            this.includeHeadfoot = hasFeature('includeHeadfoot');
            this.includeGuide = hasFeature('includeGuide');

            // include js
            this.includeJquery = hasFeature('includeJquery');
            this.includePcComponet = hasFeature('includePcComponet');
            this.includeMbComponet = hasFeature('includeMbComponet');
            this.includeLess2Css = hasFeature('includeLess2Css');
            this.includeAlloydesigner = hasFeature('includeAlloydesigner');

	 cb();//执行async，开始真正的工作，假设你不需要用户输入信息，可以把prompt去掉，但一定要执行cb，不然程序就不会有任何操作
	}.bind(this));
};

ChoiGenerator.prototype.app = function app() {
	var today = new Date();

	var prefix = today.getFullYear();
	prefix += '-' + (+today.getMonth() + 1);
	prefix += '-' + today.getDate();
	
	this.creatTime = prefix;
	this.codeJS = 
	this.codeHeader = 
	this.codeFooter =
	this.codeAlloydesigner = '';
	// this.mkdir('app');//在目标文件夹创建app目录，这里的目标文件夹是指你要初始化的项目目录
	// this.mkdir('app/templates');//在目标文件夹app下创建templates目录

	// this.copy('_package.json', 'package.json');//将_package.json复制到目标文件夹下，并重命名为package.json
	// this.copy('_bower.json', 'bower.json');
	// this.template('jshintrc', '.jshintrc');


	//空文件夹必需要通过mkdir的方式
	this.mkdir('_asset');
	this.mkdir('_design');
	this.mkdir('css');
	this.mkdir('img');
	this.mkdir('pic');
	this.mkdir('_less');
	this.mkdir('html');
	this.mkdir('js');

	//都是需要配置的，没有自带的
	// this.directory('_less', '_less');
	// this.directory('html', 'html');
	// this.directory('js', 'js');

	// 引入jquery
	// 1.在js/lib/里面引入js文件
	// 2.修改index.html里面的js
	if(this.includeJquery) {
		this.copy('js/lib/jquery-1.10.1.min.js', 'js/lib/jquery-1.10.1.min.js');
		this.codeJS = '<script src="http://source1.qq.com/wsd/jquery-1.9.1.min.js"></script>\n<script>\n$(function() {\n\r\t\n});\n</script>';
	}

	// PC的组件
	// 1.在js/lib/里面引入js文件
	// 2.修改index.html里面的js
	if(this.includePcComponet) {
		this.copy('js/lib/pc-component.js', 'js/lib/pc-component.js');
		this.copy('js/lib/pc-component-min.js', 'js/lib/pc-component-min.js');
		if(this.includeJquery) {
			this.codeJS = '<script src="http://source1.qq.com/wsd/jquery-1.9.1.min.js"></script>\n<script src="http://source1.qq.com/wsd/function-new-min.js"></script>\n<script>\n$(function() {\n\n});\n</script>';
		}
	}

	// mb的组件
	// 1.在js/lib/里面引入js文件
	if(this.includeMbComponet) {
		this.copy('js/lib/mb-component.js', 'js/lib/mb-component.js');
		this.copy('js/lib/mb-component-min.js', 'js/lib/mb-component-min.js');
	}

	// PC加入头部和尾部
	// 1.公共头部和尾部的html文件
	// 2.尾部的less文件
	if(this.includeHeadfoot) {
		this.copy('html/pc-footer.html', 'html/footer.html');
		this.copy('html/pc-header.html', 'html/header.html');
		this.copy('_less/mod-footer-pc.less', '_less/mod-footer.less');
		this.codeHeader = '<link rel="import" href="header.html?__inline">';
		this.codeFooter = '<link rel="import" href="footer.html?__inline">';
	}

	// Alloydesigner，设计稿网页比对工具
	// 1.在js/lib/里面引入js文件
	// 2.需要design里面有设计稿的切图（这个不知道后期能不能自动）
	if(this.includeAlloydesigner) {
		this.copy('js/lib/alloydesigner.js', 'js/lib/alloydesigner.js');
		this.codeAlloydesigner = '<script data-hidden src="../js/lib/alloydesigner.js"></script>\n<script data-hidden>\n$AD.set("_design/add-card.jpg");\n</script>';
	}

	// 加入引导页面
	// 1.加入引导的html文件
	// 2.引导的html文件内联css并做适配
	if(this.includeGuide) {
		this.copy('html/guide.html', 'html/guide.html');
	}

	//判断是mb还是pc
	// 1.加入相应的html模板文件
	// 2.加入相应的less文件（g, reset，mixin，common）
	if(this.projectType == 'mb') {
		//用copy也是可以的
		this.template('html/index-mb.html', 'html/index.html');
		this.copy('_less/g-mb.less', '_less/g.less');
		this.copy('_less/mod-reset-mb.less', '_less/mod-reset.less');
		this.copy('_less/mod-common-mb.less', '_less/mod-common.less');
		this.copy('_less/lib-mixins-mb.less', '_less/lib-mixins.less');
	} else {
		this.template('html/index-pc.html', 'html/index.html');
		this.copy('_less/g-pc.less', '_less/g.less');
		this.copy('_less/mod-reset-pc.less', '_less/mod-reset.less');
		this.copy('_less/mod-common-pc.less', '_less/mod-common.less');
		this.copy('_less/lib-mixins-pc.less', '_less/lib-mixins.less');
	}

	// less2css的bat脚本
	// 1.在_less里面引入bat文件
	// 2.在js/lib/里面引入js文件
	if(this.includeLess2Css) {
		this.copy('js/lib/less2css.js', 'js/lib/less2css.js');
		this.copy('_less/less2css.bat', '_less/less2css.bat');
	}

	// readmeType文件的类型
	// 1.在js/lib/里面引入js文件
	if(this.readmeType == 'txt') {
		this.copy('README.TXT', 'README.TXT');
	} else if (this.readmeType == 'doc') {
		this.copy('README.DOC', 'README.DOC');
	} else {
		this.copy('README.MD', 'README.MD');
	}
};

ChoiGenerator.prototype.projectfiles = function projectfiles() {
	// this.copy('editorconfig', '.editorconfig');//操作与上面的一样，都会被执行，位置可以任意放
	// this.copy('jshintrc', '.jshintrc');
	//this.copy('README.MD', '.README.MD');
};