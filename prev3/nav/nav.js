window.onload=function(){
  var onav=document.getElementById('nav');
  var oul=onav.getElementsByTagName('ul')[0];
  var oli=oul.getElementsByTagName('li');
  var olayer=document.getElementsByClassName('float_layer');
  var timer=null;
  var timer2=null;
  var k;
  for(var i=0;i<oli.length;i++){
    oli[i].index=i;
    oli[i].onmouseover=function(){
      for(var j=0;j<olayer.length;j++){
        olayer[j].style.display='none';
        oli[j].getElementsByTagName('a')[0].className='normal';                
      }
      k=this.index;
      oli[k].getElementsByTagName('a')[0].className='active';
      olayer[k].style.display='block';
      clearTimeout(timer);
      //clearTimeout(timer2);
    }
    oli[i].onmouseout=olayer[i]=function(){
      k=this.index;
      timer=setTimeout(function() {
        oli[k].getElementsByTagName('a')[0].className='normal';        
        olayer[k].style.display='none';
      }, 300);
    }

    olayer[i].onmouseover=function(){
      clearTimeout(timer);
    }

  }
}