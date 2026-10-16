/* Responsive, muted background video with an honest fallback and pause control. */
(function(){'use strict';
 var video=document.querySelector('video.hero-video-bg'); if(!video)return;
 var button=document.querySelector('.video-toggle'), mobile=matchMedia('(max-width:767px)'), motion=matchMedia('(prefers-reduced-motion:reduce)');
 var userPaused=false, source='', failedMobile=false;
 function muted(){if(!video.muted)video.muted=true;video.defaultMuted=true;if(video.volume!==0)video.volume=0;}
 function label(){if(!button)return;button.hidden=false;var paused=video.paused;button.textContent=paused?'Play video':'Pause video';button.setAttribute('aria-label',paused?'Play background video':'Pause background video');button.setAttribute('aria-pressed',String(!paused));}
 function play(){muted();if(userPaused||document.hidden||motion.matches)return;var attempt=video.play();if(attempt)attempt.catch(label);}
 function select(){var next=mobile.matches&&!failedMobile?'Restaurant-Home-Video-Mobile.mp4':'Restaurant-Home-Video.mp4';if(next!==source){source=next;video.src=next;video.load();}play();label();}
 video.addEventListener('error',function(){if(mobile.matches&&!failedMobile){failedMobile=true;select();}else label();});
 video.addEventListener('playing',label);video.addEventListener('pause',label);video.addEventListener('volumechange',muted);video.addEventListener('canplay',play);
 if(button)button.addEventListener('click',function(){if(video.paused){userPaused=false;if(!source){source=mobile.matches?'Restaurant-Home-Video-Mobile.mp4':'Restaurant-Home-Video.mp4';video.src=source;video.load();}muted();var a=video.play();if(a)a.catch(label);}else{userPaused=true;video.pause();}label();});
 document.addEventListener('visibilitychange',function(){if(document.hidden)video.pause();else play();});
 document.addEventListener('pointerdown',function(){play();},{once:true,passive:true});
 function watch(q,fn){if(q.addEventListener)q.addEventListener('change',fn);else if(q.addListener)q.addListener(fn);}
 watch(mobile,select);watch(motion,function(){if(motion.matches)video.pause();else play();label();});
 muted();if(motion.matches){video.removeAttribute('autoplay');video.preload='none';label();}else select();
})();
