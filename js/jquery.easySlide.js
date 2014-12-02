/*
name:jquery.easySlide
verson:1.0.0
author:fengweiqi
email:yakia@gm99.com
blog:fengweiqi.cn
date:2014-09-08
*/ 
(function($){
	$.fn.easySlide=function(options){
	   var defaults = { 
			    slideTime:700,	//动画滑行速度，越大越慢
			    autoPlay:true,	//true为自动播放，
			    pauseTime:3000,	//动画暂停时间
			    hoverPause:false, //是否鼠标悬停,默认为false
			    index:0 //展示项目的索引
		   };
	   var opts = $.extend(defaults, options);
	   var $this=$(this);
	   var $globalWidth=$this.width();
	   var $globalHeight=$this.height();
	   var $slideItem=$this.find('.slideItem');
	   var $itemLength=$slideItem.length;
	   var $prev=$('#prev');
	   var $next=$('#next');
	   var slideAble=true;
	   function init(){
	   		$this.css('position', 'relative');
	   		$slideItem.css({
	   			width:$globalWidth,
	   			height:$globalHeight,
	   			position:'absolute',
	   			top:0
	   		});
	   		$slideItem.eq(opts.index).css({
	   			left:0
	   		});
	   		$slideItem.each(function(index,el){
		   			$(this).css('left', -$globalWidth*(opts.index-index));
	   			});
	   	}
	   	init();
	    function prev(){
	    	$slideItem.css('left',2*$globalWidth);
	    	$slideItem.eq(opts.index).css('left',0);
	    	var nowIndex=opts.index;
	    	opts.index--;
	    	opts.index=opts.index==-1?$itemLength-1:opts.index;
	    	var prevIndex=opts.index;
	    	slideAble=false;
	    	$slideItem.eq(prevIndex).css('left', -$globalWidth);
	    	$slideItem.eq(prevIndex).animate({'left':0,}, opts.slideTime,function(){
	    		slideAble=true;
	    	});
	    	$slideItem.eq(nowIndex).animate({'left':$globalWidth,}, opts.slideTime);
	    }
	    function next(){
	    	$slideItem.css('left',2*$globalWidth);
	    	$slideItem.eq(opts.index).css('left',0);
	    	var nowIndex=opts.index;
	    	opts.index++;
	    	opts.index=opts.index==$itemLength?0:opts.index;
	    	var nextIndex=opts.index;
	    	slideAble=false;
	    	$slideItem.eq(nextIndex).css('left', $globalWidth);
	    	$slideItem.eq(nextIndex).animate({'left':0,}, opts.slideTime,function(){
	    		slideAble=true;
	    	});
	    	$slideItem.eq(nowIndex).animate({'left':-$globalWidth}, opts.slideTime);
	    }
	    //上一张
	    $prev.click(function(event) {
	    	if(slideAble)prev();
	    	
	    	
	    });
	    $next.click(function(event) {
	    	if(slideAble)next();
	    	
	    });			
		return this;
	}
	
})($);