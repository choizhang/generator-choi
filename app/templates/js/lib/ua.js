/**
 * 
 * @author choizhang
 * @date    2014-03-25 
 * @description 通过UA来判断是android还是ios，只能做初步的判断，手机QQ浏览器可以在设置里面改变UA，我觉得是个脑残的设计
 * @mark 
 */

if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //return 'ios';
} else if (/(Android)/i.test(navigator.userAgent)) {
      loadCss('android');
    //return 'android';
} else {
    //return 'pc';
};

function loadCss(file){
   var cssTag=document.getElementById('loadCss');
   var head=document.getElementsByTagName('head').item(0);
   if(cssTag) head.removeChild(cssTag);
   css=document.createElement('link');
   css.href="css/"+file+".css";
   css.rel='stylesheet';
   css.type='text/css';
   css.id='loadCss';
   head.appendChild(css);
//--> 
}