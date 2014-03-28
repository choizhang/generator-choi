var fs = require("fs"),
	path = require('path'),
	exec = require('child_process').exec;

function explorer(path) {
	fs.readdir(path, function(err, files) {
		if (err) {
			console.log("error:\n" + err);
			return;
		}
		var name;
		files.forEach(function(file) {
			fs.stat(path + "\\" + file, function(err, stat) {
				if (err) {
					console.log(err);
					return;
				}
				//这个正则只会匹配里面的.less文件
				if (name = file.match(/(.*)\.less$/)) {
					Less.watch(name[1]);
				}
			});
		});
	});
}

/**
 * 编译和监听相应的less文件
 * @type {Object}
 */
var Less = {
	compile: (function() {
		var less_dir =
			css_dir =
			map_dir =
			cmd = '';

		var compile_less = function(f_name) {
			less_file = '../../_less/' + f_name + '.less';
			css_file = '../../css/' + f_name + '.css';
			map_file = '../../css/' + f_name + '.css.map';
			//var cmd = ['lessc ', less_file, ' > ', css_file, ' --source-map=', map_file].join('');
			//lessc a.less > ../css/a.css --source-map=../css/a.css.map --source-map-rootpath=../less --source-map-url=a.css.map
			cmd = 'lessc ' + less_file + ' > ' + css_file + ' --source-map=' + map_file;
			exec(cmd, {
					encoding: 'utf-8'
				},
				function(error, stdout, stderr) {
					if (error !== null) {
						console.log(error);
						return;
					}
				}
			);
			console.log(f_name + '.less is compiled!');
		}
		return compile_less;
	})(),

	watch: function(f_name) {
		fs.watchFile(f_name + '.less', 
			function(curr, prev) {
				Less.compile('index');
			}
		);
	}
}

//主函数
Less.compile('g');
//explorer(__dirname);
explorer('../../_less');