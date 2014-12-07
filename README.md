##Getting Started
you can get easySlide plugin through two ways.
- Install:`npm install jquery-easyslide`
- Install:`bower install jquery-easyslide`

##What is easySlide?

easySlide is one jquery plugin for slider. it is easyer to use and extend.
##How to use
```javascript
   $("#easySlide").easySlide();
```

####or 
```javascript
$("#easySlide").easySlide({
  slideTime:700,	//动画滑行速度，越大越慢
  autoPlay:true,	//true为自动播放，
  pauseTime:3000,	//动画暂停时间
  hoverPause:false, //是否鼠标悬停,默认为false
  index:0 //展示项目的索引
});
```
##Options

###index

Type: Int Default:0

slider Item  which index equal this option  will diplay.

###slideTime

Type: Int Default:700

The animate run time,the large the slower.

###autoPlay

Type: Boolean Default:true

set the slider  to play auto.

###pauseTime

Type: Int Default:3000

when the slider play auto,this option can set time between prev slider and now slider

###hoverPause

Type:false Default:3000

when the mouse is over the slider,this option can decide the slider pause whether or not.

##Methods
###prev
acition:

display the prev slider

user example:
```javascript
$("#easySlide").easySlide('prev');
```

###next
acition:

display the next slider

user example:
```javascript
$("#easySlide").easySlide('next');
```
###showIndex

argument:index

acition:display the index slider

user example:
```javascript
$("#easySlide").easySlide('showIndex',2);//2 is the index argument
```
##Events

###swipe

triger:

when the slider swiped it will be triger.

use example:
```javascript
$("#easySlide").on('swipe',function(e,index){
   console.log(index);//easySlide will return the slider index,we can recieve it through event.
});
```
###swipeLeft

triger:

when the slider swipe left  it will be triger.

use example:
```javascript
$("#easySlide").on('swipeLeft',function(e,index){
   console.log(index);//easySlide will return the slider index,we can recieve it through event.
});
```
###swipeRight

triger:

when the slider swipe right  it will be triger.

use example:
```javascript
$("#easySlide").on('swipeRight',function(e,index){
   console.log(index);//easySlide will return the slider index,we can recieve it through event.
});
```
