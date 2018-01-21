window.onload=function(){
  var oroll=document.getElementById('roll');
  var oul=oroll.getElementsByTagName('ul')[0];
  var oli=oul.getElementsByTagName('li');
  var obtn=document.getElementsByTagName('a');
  oul.innerHTML+=oul.innerHTML;
  oul.style.height=oli[0].offsetHeight*oli.length+'px';
  var ispeed=-5;
  var timer=null;
  //console.log(oul.style.height);
  timer=setInterval(function(){
    //console.log(1);
    oul.style.top=oul.offsetTop+ispeed+'px';
    if(oul.offsetTop<-oul.offsetHeight/2){
      oul.style.top='0px';
    }
    else if(oul.offsetTop>0){
      oul.style.top=-oul.offsetHeight/2+'px';
    }
  },30)

  obtn[0].onmouseover=function(){
    ispeed=-5;
  }
  obtn[1].onmouseover=function(){
    ispeed=5;
  }
  oul.onmouseover=function(){
    clearInterval(timer);
  }
  oul.onmouseout=function(){
    timer=setInterval(function(){
    //console.log(1);
    oul.style.top=oul.offsetTop+ispeed+'px';
    if(oul.offsetTop<-oul.offsetHeight/2){
      oul.style.top='0px';
    }
    else if(oul.offsetTop>0){
      oul.style.top=-oul.offsetHeight/2+'px';
    }
  },30)
  }
}