/* Harbor & Vine fork cursor — loaded ONLY by the restaurant-*.html pages. */
(function(){
  'use strict';
  var root=document.documentElement;
  root.classList.add('hv-fork');                         // static fallback cursor

  // Animated version only for real mice/trackpads (not phones/tablets).
  if(!window.matchMedia||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;

  var el=document.createElement('div');
  el.className='hv-fork-cursor';
  el.setAttribute('aria-hidden','true');
  el.innerHTML='<img src="fork-cursor.png" alt="" draggable="false">';
  document.body.appendChild(el);
  root.classList.add('hv-fork-live');

  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var HOT=3, x=-100, y=-100, queued=false;
  var CLICKABLE='a,button,select,summary,label,[role="button"],input[type="checkbox"],input[type="radio"],input[type="submit"],input[type="date"]';
  var TEXT='input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="date"]),textarea';

  function paint(){queued=false;el.style.transform='translate3d('+(x-HOT)+'px,'+(y-HOT)+'px,0)';}

  document.addEventListener('pointermove',function(e){
    if(e.pointerType!=='mouse')return;
    x=e.clientX;y=e.clientY;
    el.classList.add('is-visible');
    var t=e.target;
    el.classList.toggle('is-hidden',!!(t.closest&&t.closest(TEXT)));      // show text caret in fields
    el.classList.toggle('is-hover',!!(t.closest&&t.closest(CLICKABLE)));
    if(!queued){queued=true;requestAnimationFrame(paint);}
  },{passive:true});

  document.addEventListener('pointerdown',function(e){
    if(e.pointerType!=='mouse')return;
    el.classList.add('is-down');
    if(reduce)return;
    var tap=document.createElement('span');
    tap.className='hv-fork-tap';
    tap.style.setProperty('--x',e.clientX+'px');
    tap.style.setProperty('--y',e.clientY+'px');
    document.body.appendChild(tap);
    tap.addEventListener('animationend',function(){tap.remove();});
  },{passive:true});

  function up(){el.classList.remove('is-down');}
  document.addEventListener('pointerup',up,{passive:true});
  window.addEventListener('blur',up);
  document.documentElement.addEventListener('mouseleave',function(){el.classList.remove('is-visible');});
})();
