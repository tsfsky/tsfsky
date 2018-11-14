//     use Zepto.js,touch.js 
//	   v1.0
//     author Tsf
;
(function($) {
	var conf = {
			'scurpage': 1, //起始播放页面
			'autoplay': true, //是否自动播放
			'playspeed': 3000, //播放速度默认3秒 不能小于1秒
			'movespeed': 5, //切换移动速度 数字越大移动越慢
			'callbacks': function() {} //加载成功以后
		},
		timeid = setTimeout(function() {}, 10000);

	function toPage(that, yourpage) {
		clearTimeout(timeid);
		var _sc = that.find('li').length;
		that.find('ul').css({
			'transform': 'translateX(-' + ((100.00 / _sc) * (yourpage - 1)) + '%)',
			'-webkit-transform': 'translateX(-' + ((100.00 / _sc) * (yourpage - 1)) + '%)'
		});

		//调整当前scurpage 变化下方点点
		setTimeout(function() {
			conf.scurpage = yourpage;
			that.find('.ourslider_nav_n').removeClass('ourslider_nav_n_checked').css('background-color', '#ebebeb');
			$(that.find('.ourslider_nav_n')[conf.scurpage - 1]).addClass('ourslider_nav_n_checked').css('background-color', '#808080');
		}, conf.movespeed + '10');

		//自动播放
		if (conf.autoplay) {
			timeid = setTimeout(function() {
				var nextpage = 1;
				if (conf.scurpage == _sc) {
					nextpage = 1;
				} else {
					nextpage = conf.scurpage + 1;
				}
				toPage(that, nextpage);
			}, conf.playspeed);
		};
	}

	//创建下方点点
	function creatnav(that) {
		that.append('<div class="ourslider_nav" align="center" style="position: absolute; bottom: 20px; right: 20px;"></div>')
		for (var i = 0; i < that.find('li').length; i++) {
			$('.ourslider_nav').append('<span class="ourslider_nav_n" style="padding: 6px; font-size: 0px; border-radius: 50%; background-color: #ebebeb; border:solid 1px #808080; margin-left: 8px;"></span>')
		}
	}

	$.extend($.fn, {
		ourSlider: function(options) {
			conf = $.extend(conf, options);
			var _self = $(this);
			//规范参数
			if (conf.playspeed < 1000) {
				conf.playspeed
			};
			if (conf.movespeed > 9 || conf.movespeed < 1 || !isNaN(conf.movespeed)) {
				conf.movespeed = 5;
			};
			//固定当前框大小位置
			_self.css({
				'position': 'relative',
				'width': '100%',
				'height': '100%',
				'overflow': 'hidden'
			});
			//计算ul大小
			var _scount = _self.find('li').length; //slider个数
			_self.find('ul').css({
				'position': 'absolute',
				'transform': 'translateX(0%)',
				'-webkit-transform': 'translateX(0%)',
				'padding': '0px',
				'margin': '0px',
				'height': '100%',
				'width': '' + _scount + '00%'
			});
			//调整ul大小
			_self.find('li').css({
				'width': '100%',
				'height': '100%',
				'padding': '0px',
				'margin': '0px',
				'list-style': 'none',
				'float': 'left',
				'background-color': '#ebebeb',
				'width': '' + (100.00 / _scount) + '%'
			});
			//延迟一下加载过度css
			setTimeout(function() {
				_self.find('ul').css({
					'transition': 'all .' + conf.movespeed + 's ease-in',
					'-webkit-transition': 'all .' + conf.movespeed + 's ease-in'
				});
			}, 1);

			//加载下方点点
			creatnav(_self);
			//转到开始页
			toPage(_self, conf.scurpage);
			//加载完成后执行代码
			conf.callbacks();

			//左滑动
			_self.swipeLeft(function() {
				if (conf.scurpage == _scount) {
					toPage(_self, _scount);
				} else {
					toPage(_self, conf.scurpage + 1);
				}
			});

			//右滑动
			_self.swipeRight(function() {
				if (conf.scurpage == 1) {
					toPage(_self, 1);
				} else {
					toPage(_self, conf.scurpage - 1);
				}
			});
		}
	});
})(Zepto)