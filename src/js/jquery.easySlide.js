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
				if(index<opts.index){//swipeRight,swipeDown
					if(opts.derection=='h'){
						this.swipeRight(opts,index);
					}else{
						this.swipeDown(opts,index);

					}
		    		
			    	
		    	}
		    	else if(index>opts.index){//swipeLeft,swipeUp
		    		if(opts.derection=='h'){
						this.swipeLeft(opts,index);
					}else{
						this.swipeUp(opts,index);
					}
		    	}
		    	// 同步导航
		    	this.setNavigator();
		    	this.el.trigger('swipe',opts.index);
		        this.data('easySlide',opts);//合并运行后的数据到插件
		        

			}
		},
		
/**
 * [swipe 滑动函数]
 * @param  {[type]}   opts      [插件参数]
 * @param  {[type]}   index     [要滑动到的索引]
 * @param  {[type]}   derection [滑动方向]
 */
		swipe:function(opts,index,derection){
			if(derection=='left'||derection=='right'){
	    		opts.slideItem.css('left',2*opts.globalWidth);//重置所有Item位置
	    		opts.slideItem.eq(opts.index).css('left',0);//保持当前Item位置不变
	    	}else if(derection=='up'||derection=='down'){
	    		opts.slideItem.css('top',2*opts.globalHeight);//重置所有Item位置
	    		opts.slideItem.eq(opts.index).css('top',0);//保持当前Item位置不变
	    	}

	    	var nowIndex=opts.index;//当前item索引
	    	opts.index=index;
	    	if(derection=='left'||derection=='up'){
	    		opts.index=opts.index==opts.itemLength?0:opts.index;//索引循环
	    	}else if(derection=='right'||derection=='down'){
	    		opts.index=opts.index==-1?opts.itemLength-1:opts.index;//索引循环
	    	}
	    	var runIndex=opts.index;
	    	opts.slideAble=false;
	    	switch(derection){
	    		case 'left':this.el.trigger('swipeLeft',opts.index);break;
	    		case 'right':this.el.trigger('swipeRight',opts.index);break;
	    		case 'up':this.el.trigger('swipeUp',opts.index);break;
	    		case 'down':this.el.trigger('swipeDown',opts.index);break;
	    	}

	    	switch(derection){
	    		case 'left':opts.slideItem.eq(runIndex).css('left', opts.globalWidth);break;
	    		case 'right':opts.slideItem.eq(runIndex).css('left', -opts.globalWidth);break;
	    		case 'up':opts.slideItem.eq(runIndex).css('top', opts.globalHeight);break;
	    		case 'down':opts.slideItem.eq(runIndex).css('top', -opts.globalHeight);;break;
	    	}
	    	if(derection=='left'||derection=='right'){
	    		opts.slideItem.eq(runIndex).animate({'left':0}, opts.slideTime,function(){
	    			opts.slideAble=true;
	    		});
	    	}else if(derection=='up'||derection=='down'){
	    		opts.slideItem.eq(runIndex).animate({'top':0}, opts.slideTime,function(){
	    			opts.slideAble=true;
	    		});
	    	}

	    	switch(derection){
	    		case 'left':
	    		opts.slideItem.eq(nowIndex).animate({'left':-opts.globalWidth},opts.slideTime,function(){
	    			if(typeof callback==='function'){
	    				callback();
	    			}
	    		});
	    		break;
	    		case 'right':
	    		opts.slideItem.eq(nowIndex).animate({'left':opts.globalWidth,}, opts.slideTime);
	    		break;
	    		case 'up':
	    		opts.slideItem.eq(nowIndex).animate({'top':-opts.globalHeight}, opts.slideTime);
	    		break;
	    		case 'down':

	    		opts.slideItem.eq(nowIndex).animate({'top':opts.globalHeight}, opts.slideTime);
	    		break;
	    	}
	    	
		},
		// 左滑动
		swipeLeft:function(opts,index) {
			this.swipe(opts,index,'left');
		},
		// 右滑动
		swipeRight:function(opts,index){
			this.swipe(opts,index,'right');
		},
		// 向上滑动
		swipeUp:function(opts,index){
			this.swipe(opts,index,'up');
		},
		// 向下滑动
		swipeDown:function(opts,index){
			this.swipe(opts,index,'down');
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
			var opts=this.opts;
			if(opts.autoPlay){
				var autoIndex=this.opts.index+1;
				this.showIndex(autoIndex);	
				}
		},
		//设置大小
		resize:function(){
			var $this=this.el;
			var opts=this.opts;
			var $autoWidth = $this.width();
			var $autoHeight = $this.height();
				

			var $responsiveImage = $this.find('.responsive');

			var $slideItem = $this.find('.slideItem');

			    
			var $itemLength = $slideItem.length;
			var firstImg=$responsiveImage.get(0);


			$this.css('position','relative');

			// 设置高度
			function setHeight(){
				if(opts.initHeight==0){

					$autoHeight = $autoWidth*opts.rate;
					
					
					opts.globalHeight=$autoHeight;
				}
				if(typeof firstImg!='undefined'){
					$slideItem.css('height', $autoHeight);
				}
				else{
					$autoHeight=$slideItem.css('height');
				}
				$this.css({
					height: $autoHeight
				});
			}
			// 设置宽度
			function setWidth(){
				$slideItem.css({
					width: $autoWidth,
					position: 'absolute',
					top: 0
				});
			}
			
			//重置幻灯位置
			function resetPosition(){
				if(opts.derection=='h'){//水平滑动幻灯重置
					$slideItem.eq(opts.index).css({
						left: 0
					});
					$slideItem.each(function(index, el) {
						$(this).css('left', -$autoWidth * (opts.index - index));
					});
				}else{//垂直滑动幻灯重置
					$slideItem.eq(opts.index).css({
						top: 0
					});
					$slideItem.each(function(index, el) {
						$(this).css('top', -$autoHeight * (opts.index - index));
					});
				}
			}
			// 随着图片自适应
			if(opts.rate==null){
				// Create new offscreen image to test
				var theImage = new Image();
				theImage.src = $(firstImg).attr("src");
				// Get accurate measurements from that.
				var imageWidth = theImage.width;
				var imageHeight = theImage.height;
				opts.slideAble=true;	
				opts.rate=imageHeight/imageWidth;
				setHeight();
				resetPosition();
			}
			

			// 如果不是以图片为自适应，而是固定高度
			if(typeof firstImg=='undefined'){
				opts.slideAble=true;
			}

			setHeight();

			setWidth();

			resetPosition();
			
		    // 同步导航
		    this.setNavigator();
		    this.data('easySlide',opts);//合并变化后数据到插件
		}
	};
	var privateclass=[];//用于私有类实例化
	var methods = {//对外接口
		init: function(options){
			return this.each(function() {
				var $this = $(this);
				var opts = $this.data('easySlide');
				if(typeof(opts) == 'undefined') {

					var defaults = {
							id:0, 
						    slideTime:700,	//动画滑行速度，越大越慢
						    autoPlay:true,	//true为自动播放，
						    pauseTime:3000,	//动画暂停时间
						    hoverPause:false, //是否鼠标悬停,默认为false
						    index:0, //展示项目的索引
						    autoReSize:true, //是否自适应
						    derection:'h'//h水平滑动，v垂直方向滑动
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
				var $vNavigator=$("#vNavigator");
				var slideAble = false;
				var Interval;
				var runSettings={//插件运行时的配置
						globalWidth:$globalWidth,
						globalHeight:$globalHeight,
						initHeight:$globalHeight,//初始高度
						slideItem:$slideItem,
						itemLength:$itemLength,
						slideAble:slideAble,
						navigator:$navigator,
						vNavigator:$vNavigator,
						rate:null	//图片高宽比

				}
				opts = $.extend({}, opts, runSettings);
				$this.data('easySlide', opts);//合并参数
				opts.id=new Date().getTime();
				privateclass[opts.id]=new Privateclass($this);
				privateclass[opts.id].resize();
				// 播放上一张
				$prev.click(function(event) {
					
					return privateclass[opts.id].prev();
				});
				// 播放下一张
				$next.click(function(event) {
					
					return privateclass[opts.id].next();
				});

				// 自动播放

				Interval=setInterval(function(){
					return privateclass[opts.id].autoPlay();
				},opts.pauseTime);

				// 鼠标悬停

				if(opts.hoverPause){
					$this.hover(function() {
						clearInterval(Interval);
					}, function() {
						Interval = setInterval(function() {
							return privateclass[opts.id].autoPlay();
						}, opts.pauseTime);
					});

				}

				// 自适应
				if(opts.autoReSize){
					window.onresize=function(){
						return privateclass[opts.id].resize();
					}
				}

				// 水平导航

				$navigator.find('a').click(function(event) {
					$navigator.find('a').removeClass('hover');
					$(this).addClass('hover');
					var index=$navigator.find('a').index(this);
					
					return privateclass[opts.id].showIndex(index);
				});

				// 垂直导航
				$vNavigator.find('.vItem').click(function(event) {
					$vNavigator.find('.vItem').removeClass('hover');
					$(this).addClass('hover');
					var index=$vNavigator.find('.vItem').index(this);
					
					return privateclass[opts.id].showIndex(index);
				});


			});
		},
		
		prev: function() {
			return $(this).each(function() {
					var opts = $(this).data('easySlide');
					privateclass[opts.id].prev();

			});
			
		   
		},
		next:function(){
			return $(this).each(function() {
					var opts = $(this).data('easySlide');
					privateclass[opts.id].next();
				});
			
			
		},
		showIndex:function(index){
			return $(this).each(function(){
					var opts = $(this).data('easySlide');
					privateclass[opts.id].showIndex(index);
					
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
