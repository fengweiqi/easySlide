/*
name:jquery.easySlide
verson:1.0.0
author:fengweiqi
email:yakia@gm99.com
github:
blog:fengweiqi.cn
date:2014-12-07
*/ 
;(function($, window, document,undefined) {
	var Privateclass = function(el) {//私有类
			this.el=el;
			this.opts=el.data('easySlide');//获取插件参数
			this.data=function(dataName,opts){
				el.data(dataName,opts);
				
			}
	}
	Privateclass.prototype={
		showIndex:function(index){
			
			var opts=this.opts;
			
			if(opts.slideAble){
				if(index<opts.index){//swipeRight
		    		opts.slideItem.css('left',2*opts.globalWidth);//重置所有Item位置
			    	opts.slideItem.eq(opts.index).css('left',0);//保持当前Item位置不变
			    	var nowIndex=opts.index;//当前item索引
			    	opts.index=index;
			    	opts.index=opts.index==-1?opts.itemLength-1:opts.index;//索引循环
			    	var runIndex=opts.index;
			    	opts.slideAble=false;
			    	this.el.trigger('swipeLeft',opts.index);
			    	opts.slideItem.eq(runIndex).css('left', -opts.globalWidth);
			    	opts.slideItem.eq(runIndex).animate({'left':0,}, opts.slideTime,function(){
			    		opts.slideAble=true;
			    	});
			    	opts.slideItem.eq(nowIndex).animate({'left':opts.globalWidth,}, opts.slideTime);
			    	
		    	}
		    	else if(index>opts.index){//swipeLeft
		    		opts.slideItem.css('left',2*opts.globalWidth);//重置所有Item位置
			    	opts.slideItem.eq(opts.index).css('left',0);//保持当前Item位置不变
			    	var nowIndex=opts.index;//当前item索引
			    	opts.index=index;
			    	opts.index=opts.index==opts.itemLength?0:opts.index;//索引循环
			    	var runIndex=opts.index;
			    	opts.slideAble=false;
			    	this.el.trigger('swipeRight',opts.index);
			    	opts.slideItem.eq(runIndex).css('left', opts.globalWidth);
			    	opts.slideItem.eq(runIndex).animate({'left':0,}, opts.slideTime,function(){
			    		opts.slideAble=true;
			    	});
			    	opts.slideItem.eq(nowIndex).animate({'left':-opts.globalWidth}, opts.slideTime);
			    	
		    	}
		    	// 同步导航
		    	this.setNavigator();
		    	this.el.trigger('swipe',opts.index);
		        this.data('easySlide',opts);//合并运行后的数据到插件
		        

			}
		},
		setNavigator:function(){//设置导航
				var opts=this.opts;
				var navigatorWidth=opts.navigator.width();
				opts.navigator.css('margin-left',-navigatorWidth/2);
		    	opts.navigator.find('a').removeClass('hover');
		    	opts.navigator.find('a').eq(opts.index).addClass('hover');
		},
		prev:function(){
			var prevIndex=this.opts.index-1;
			this.showIndex(prevIndex);
		},
		next:function(){
			var nextIndex=this.opts.index+1;
			this.showIndex(nextIndex);
		},
		autoPlay:function(){
			var autoIndex=this.opts.index+1;
			this.showIndex(autoIndex);
		},
		//设置大小
		resize:function(){
			var $this=this.el;
			var opts=this.opts;
			var $autoWidth = $this.width();
			var $responsiveImage = $this.find('.responsive');
			
			var $slideItem = $this.find('.slideItem');
			var $itemLength = $slideItem.length;
			$this.css('position','relative');
			$slideItem.css({
					width: $autoWidth,
					position: 'absolute',
					top: 0
				});
			$responsiveImage.eq(0).load(function() {
				var $autoHeight = $this.find('.responsive').height();
				$slideItem.css('height', $autoHeight);
				$this.css({
					height: $autoHeight

				});
			});
			var $autoHeight = $this.find('.responsive').height();
			$slideItem.css('height', $autoHeight);
				$this.css({
					height: $autoHeight

				});
			$slideItem.eq(opts.index).css({
				left: 0
			});


			$slideItem.each(function(index, el) {
				$(this).css('left', -$autoWidth * (opts.index - index));
			});
			
			
		    // 同步导航
		    	this.setNavigator();
		}
	};
	var privateclass;//用于私有类实例化
	var methods = {//对外接口
		init: function(options) {
			return this.each(function() {
				var $this = $(this);
				var opts = $this.data('easySlide');
				if(typeof(opts) == 'undefined') {

					var defaults = { 
						    slideTime:700,	//动画滑行速度，越大越慢
						    autoPlay:true,	//true为自动播放，
						    pauseTime:3000,	//动画暂停时间
						    hoverPause:false, //是否鼠标悬停,默认为false
						    index:0, //展示项目的索引
						    autoReSize:true //是否自适应
					   };

					opts = $.extend({}, defaults, options);
					$this.data('easySlide', opts);

				} else {
					opts = $.extend({}, opts, options);
				}

				// 代码在这里运行
				var $globalWidth = $this.width();
				var $globalHeight = $this.height();
				var $slideItem = $this.find('.slideItem');
				var $itemLength = $slideItem.length;
				var $prev=$("#prev");
				var $next=$("#next");
				var $navigator=$("#navigator");
				var slideAble = true;
				var Interval;
				var runSettings={//插件运行时的配置
					globalWidth:$globalWidth,
					globalHeight:$globalHeight,
					slideItem:$slideItem,
					itemLength:$itemLength,
					slideAble:slideAble,
					navigator:$navigator

				}
				opts = $.extend({}, opts, runSettings);
				$this.data('easySlide', opts);
				privateclass=new Privateclass($this);
				privateclass.resize();

				$prev.click(function(event) {
					
					return privateclass.prev();
				});

				$next.click(function(event) {
					
					return privateclass.next();
				});

				// 自动播放
				Interval=setInterval(function(){
					return privateclass.autoPlay();
				},opts.pauseTime);

				// 鼠标悬停

				if(opts.hoverPause){
					$this.hover(function() {
						clearInterval(Interval);
					}, function() {
						Interval = setInterval(function() {
							return privateclass.autoPlay();
						}, opts.pauseTime);
					});

				}

				// 自适应
				if(opts.autoReSize){
					window.onresize=function(){
						return privateclass.resize();
					}
				}

				// 导航

				$navigator.find('a').click(function(event) {
					$navigator.find('a').removeClass('circle_hover');
					$(this).addClass('circle_hover');
					var index=$navigator.find('a').index(this);
					console.log(index);
					return privateclass.showIndex(index);
				});

			});
		},
		
		prev: function() {
			return $(this).each(function() {
				
					privateclass.prev();

			});
			
		   
		},
		next:function(){
			return $(this).each(function() {
				
					privateclass.next();
				});
			
			
		},
		showIndex:function(index){
			return $(this).each(function(){
				
					privateclass.showIndex(index);
					
			});
			
		},
		index:function(){
					return this.data('easySlide').index;
		},
		test:function(){
			console.log(4343);
		}
	};

	$.fn.easySlide = function() {
		var method = arguments[0];

		if(methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if( typeof(method) == 'object' || !method ) {
			method = methods.init;
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.easySlide' );
			return this;
		}
		
		return method.apply(this, arguments);

	}

})(jQuery, window, document);
