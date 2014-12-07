/*
name:jquery.easySlide
verson:1.0.0
author:fengweiqi
email:yakia@gm99.com
blog:fengweiqi.cn
date:2014-09-08
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
		        this.data('easySlide',opts);//合并运行后的数据到插件
		        

			}
		},
		prev:function(){
			var prevIndex=this.opts.index-1;
			this.showIndex(prevIndex);
		},
		next:function(){
			var nextIndex=this.opts.index+1;
			this.showIndex(nextIndex);
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
						    index:0 //展示项目的索引
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
				var slideAble = true;
				var runSettings={//插件运行时的配置
					globalWidth:$globalWidth,
					globalHeight:$globalHeight,
					slideItem:$slideItem,
					itemLength:$itemLength,
					slideAble:slideAble

				}
				opts = $.extend({}, opts, runSettings);
				$this.data('easySlide', opts);
				$this.css('position', 'relative');
				$slideItem.css({
					width: $globalWidth,
					height: $globalHeight,
					position: 'absolute',
					top: 0
				});
				$slideItem.eq(opts.index).css({
					left: 0
				});
				$slideItem.each(function(index, el) {
					$(this).css('left', -$globalWidth * (opts.index - index));
				});
				
				privateclass=new Privateclass($this);
				$prev.click(function(event) {
					
					return privateclass.prev();
				});

				$next.click(function(event) {
					
					return privateclass.next();
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