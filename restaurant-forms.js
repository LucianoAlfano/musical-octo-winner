/* A clearly labelled reservation demonstration; never sends to a placeholder inbox. */
(function(){'use strict';var form=document.getElementById('restaurant-reservation');if(!form)return;var status=document.getElementById('reservation-status'),preview=document.getElementById('reservation-preview'),date=form.elements.date;
 function today(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
 if(date)date.min=today();
 form.addEventListener('submit',function(e){e.preventDefault();if(date){date.min=today();date.setCustomValidity(date.value<date.min?'Choose today or a future date.':'');}if(!form.reportValidity())return;var data=new FormData(form),lines=['DEMONSTRATION ONLY: nothing has been sent.',''];data.forEach(function(v,k){lines.push(k.replace(/_/g,' ')+': '+v);});if(preview){preview.textContent=lines.join('\n');preview.hidden=false;}if(status)status.textContent='Your demo request is shown below. No email was sent, no booking was made, and no table is held.';});if(date)date.addEventListener('input',function(){date.setCustomValidity('');});
})();
