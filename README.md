需求：
1、幻灯展示个数，默认为1 （未完成）
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
  slideTime:700,	//Animation sliding speed, the large the slower
  autoPlay:true,	//slider autoplay when true，
  pauseTime:3000,	//Animation pause time
  hoverPause:false, //Whether the hovering, the default is false
  index:0 //show the index's slideItem
});
```
###Options

####index

Type: Int Default:0

slider Item  which index equal this option  will diplay.

####slideTime

Type: Int Default:700

The animate run time,the large the slower.

####autoPlay

Type: Boolean Default:true

set the slider  to play auto.

####pauseTime

Type: Int Default:3000

when the slider play auto,this option can set time between prev slider and now slider

####hoverPause

Type:Boolean Default:false

when the mouse is over the slider,this option can decide the slider pause whether or not.

###Methods

####prev
acition:

display the prev slider

use example:
```javascript
$("#easySlide").easySlide('prev');
```

####next
acition:

display the next slider

use example:
```javascript
$("#easySlide").easySlide('next');
```
####showIndex

argument:index

acition:display the index slider

use example:
```javascript
$("#easySlide").easySlide('showIndex',2);//2 is the index argument
```
###Events

####swipe

triger:

when the slider swiped it will be triger.

use example:
```javascript
$("#easySlide").on('swipe',function(e,index){
//easySlide will return the slider index,we can recieve it through event.
   console.log(index);
});
```
####swipeLeft

triger:

when the slider swipe left  it will be triger.

use example:
```javascript
$("#easySlide").on('swipeLeft',function(e,index){
   console.log(index);
});
```
####swipeRight

triger:

when the slider swipe right  it will be triger.

use example:
```javascript
$("#easySlide").on('swipeRight',function(e,index){
   console.log(index);
});
```
