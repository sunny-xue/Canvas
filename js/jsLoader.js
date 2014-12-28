/**
 * JS文件加载器
 * @param  {string}   url      js文件的路径,以.js结尾
 * @param  {Function} callback 加载完成url的回掉函数
 * @return {[type]}            [description]
 */
var loadJS = function(url, callback) {
	//获取DOM中的第一个head标签
	var head = document.getElementsByTagName('head')[0];
	//创建一个script标签
	var script = document.createElement('script');
	script.url = ull;
	script.type = 'text/javascript';
	//把script标签添加进head标记中
	//<head><script type='text/javascript'></script></head>
	head.appendChild(script);


	// script 标签，IE下有onreadystatechange事件, w3c标准有onload事件
	// IE9+也支持 W3C标准的onload
	var ua = navigator.userAgent,
		ua_version;
	// IE6/7/8
	if (/MSIE ([^;]+)/.test(ua)) {
		ua_version = parseFloat(RegExp.$1,10);
		if (ua_version <= 8) {
			script.onreadystatechange = function() {
				if (this.readyState == 'loaded') {
					callback();
				}
			};
		} else {
			script.onload = function() {
				callback();
			};
		}
	} else {
		script.onload = function() {
			callback();
		};
	}
};