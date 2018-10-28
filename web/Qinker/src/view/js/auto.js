export function auto() {
  /* eslint-disable */
  (function(){
    setRem();
    //调适配，判断是否横竖屏及自动刷新
    window.addEventListener('orientation' in window?"deviceorientation":"resize",setRem);
    function setRem(){
      var html=document.documentElement;
      var width=html.clientWidth;
      html.style.fontSize=width/15+'px';
    }
  })();
}
