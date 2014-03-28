<!DOCTYPE HTML>
<html lang="zh-cn">
<head>
	 <meta charset="UTF-8">
	 <title>webview测试</title>
	 <link href="css/webview.css" rel="stylesheet">
	 <style type="text/css">
		body{
			width: 960px;
			margin: 0 auto;
		}
	 </style>
</head>
<body>
	 <h1>灰度测试服务</h1>
	 <div class="test-outter">
		  <ul class="navi">
		  	<li><a href="##" class="now">webview测试<i>&gt;</i></a></li>
		  	<li><a href="##">app测试<i>&gt;</i></a></li>
		  </ul>
		  <div class="r-content">
		  	<div class="item">
		  		<i class="decorate"></i>
		  		<h3>选择测试方案</h3>
		  		<div class="textarea-md">
		  			<label><input type="radio">a.url简单测试：</label>
		  			<textarea class="input-text" placeholder="">url之间请用换行符分隔，如：&#13;&#10;http://bita.qq.com&#13;&#10;http://bita.qq.com/comapply?uid=851</textarea>
		  			<div class="tips">检测到<em>2</em>个url</div>
		  		</div>
		  		<div class="textarea-md textarea-md-disable">
		  			<label><input type="radio" disabled="true">b.url深交互测试：</label>
		  			<textarea class="input-text"  disabled="true">操作步骤描述，如：&#13;&#10;打开“http://bita.qq.com”；</textarea>
		  		</div>
		  	</div>
		  	<div class="item">
		  		<i class="decorate"></i>
		  		<h3>选择覆盖机型数</h3>
		  		<label><input type="radio">500部</label><label><input type="radio">1000部</label><label><input type="radio">3000部</label>
		  	</div>
		  	<div class="item">
		  		<i class="decorate"></i>
		  		<h3>选择测试手机联网类型</h3>
		  		<label><input type="checkbox" checked="true" disabled="true">wifi</label><label><input type="checkbox">2g网络</label><label><input type="checkbox">3g网络</label><label><input type="checkbox">4g网络</label>
		  	</div>
		  	<a href="##" class="submit-task">提交任务</a>
		  </div>
	 </div>

<script src="http://source1.qq.com/wsd/jquery-1.4.2.min.js"></script>
<script src="http://source1.qq.com/wsd/function-new-min.js"></script>
<script>
	 $(document).ready(function () {
		  
	 });
</script>
</body>
</html>

