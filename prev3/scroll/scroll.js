window.onload=function(){
  var odiv=document.getElementById('roll');
  var oul=odiv.getElementsByTagName('ul')[0];
  var ali=oul.getElementsByTagName('li');
  var abtn=document.getElementsByTagName('a');
  var ispeed=-5;
  var timer=null;
  oul.innerHTML+=oul.innerHTML;
  oul.style.width=ali[0].offsetWidth*ali.length+'px';
  timer=setInterval(function(){
    //向左减 向右加
    oul.style.left=oul.offsetLeft+ispeed+'px';
    if(oul.offsetLeft<-oul.offsetWidth/2){
      oul.style.left='0px';
    }
    else if(oul.offsetLeft>0){
      oul.style.left=-oul.offsetWidth/2+'px';
    }
  },30);
  abtn[0].onmouseover=function(){
    ispeed=-5;
  }
  abtn[1].onmouseover=function(){
    ispeed=5;
  }
  oul.onmouseover=function(){
    clearInterval(timer);
  }
  oul.onmouseout=function(){
    timer=setInterval(function(){
    //向左减 向右加
    oul.style.left=oul.offsetLeft+ispeed+'px';
    if(oul.offsetLeft<-oul.offsetWidth/2){
      oul.style.left='0px';
    }
    else if(oul.offsetLeft>0){
      oul.style.left=-oul.offsetWidth/2+'px';
    }
  },30);
  }
}