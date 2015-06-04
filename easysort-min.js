$(document).ready(function(){$.fn.draggable=function(){function t(){return!1}$(this).mousedown(function(o){var e=$(this)
$(e)[0].setAttribute("data-1","moving")
var n=e.parent(),f=n.offset().top,s=f+n.height(),r=e.height(),u=e.height()/2,i=e.offset().top+u,a=o.pageY-i
e.css({"z-index":2,top:"auto"})
var p=function(t){i=t.pageY-a
var o=e.prev()
if(o.length>0)var n=o.offset().top,p=n+o.height()/2+u
var c=e.next()
if(c.length>0)var d=c.offset().top,m=d+c.height()/2-u
f+u>i?(e.offset({top:f}),p&&e.insertBefore(o)):i+u>s?(e.offset({top:s-r}),m&&e.insertAfter(c)):(e.offset({top:i-u}),p&&p>i?(e.insertBefore(o.css("top",0)).css("top",0),e.offset({top:i-u})):m&&i>m&&(e.insertAfter(c.css("top",0)).css("top",0),e.offset({top:i-u})))},c=function(){$(e)[0].removeAttribute("data-1"),$(document).off("mousemove",p).off("mouseup",c),$(document).off("mousedown",t),e.css({top:0,"z-index":1,"background-color":"transparent"})}
$(document).on("mousemove",p).on("mouseup",c).on("contextmenu",c),$(document).on("mousedown",t),$(window).on("blur",c)})},$(".drag").draggable()})
