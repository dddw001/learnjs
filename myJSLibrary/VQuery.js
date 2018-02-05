function $(vArg){
  return new VQuery(vArg);
}

function VQuery(vArg){
  //用来保存选中的元素
  this.elements=[];

  switch(typeof vArg){
    case 'function':
        //window.onload=vArg;//不能绑定多个事件
        myAddEvent(window,'load',vArg);
        break;
    case 'string':
        switch(vArg.charAt(0)){
          case '#': //id
              var obj=document.getElementById(vArg.substring(1));
              this.elements.push(obj);
              break;
          case '.': //class
              this.elements=getByClass(document,vArg.substring(1));
              break;
          default: //tagName
              this.elements=document.getElementsByTagName(vArg);
        }
        break;
    case 'object':
        this.elements.push(vArg);
  }
}

VQuery.prototype.click=function(fn){
  for(var i=0;i<this.elements.length;i++){
    myAddEvent(this.elements[i],'click',fn);
  }
}

VQuery.prototype.show=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.display='block';
  }
}
VQuery.prototype.hide=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.display='none';
  }
}

VQuery.prototype.hover=function(fnOver,fnOut){
  for(var i=0;i<this.elements.length;i++){
    myAddEvent(this.elements[i],'mouseover',fnOver);
    myAddEvent(this.elements[i],'mouseout',fnOut);
  }
}

VQuery.prototype.css=function(attr,value){
  if(arguments.length==2){ //设置样式
    for(var i=0;i<this.elements.length;i++){
      this.elements[i].style[attr]=value;
    }
  }
  else{  //获取样式
    return getStyle(this.elements[0],attr);
  }
}

VQuery.prototype.attr=function(attr,value){
  if(arguments.length==2){
    for(var i=0;i<this.elements.length;i++){
      this.elements[i][attr]=value;
    }
  }
  else{
    return this.elements[0][attr];
  }
}

VQuery.prototype.toggle=function(){
  var _arguments=arguments;
  for(var i=0;i<this.elements.length;i++){
    addToggle(this.elements[i]);
  }
  function addToggle(obj){
    var count=0;    
    myAddEvent(obj,'click',function(){
      _arguments[count%_arguments.length].call(obj);
      count++;
    })
  }
}

VQuery.prototype.eq=function(n){
  return $(this.elements[n]);
}

VQuery.prototype.find=function(str){
  var aResult=[];
  for(var i=0;i<this.elements.length;i++){
    switch(str.charAt(0)){
      case '.':  //class
          var aEle=getByClass(this.elements[i],str.substring(1));
          aResult=aResult.concat(aEle);
          break;
      default:  //标签
          var aEle=this.elements[i].getElementsByTagName(str);
          //aResult=aResult.concat(aEle);
          appendArr(aResult,aEle);
    }
  }
  var newVQuery=$();
  newVQuery.elements=aResult;
  return newVQuery;
}

VQuery.prototype.index=function(){
  return getIndex(this.elements[0]);
}


/*绑定事件 兼容性写法*/
function myAddEvent(obj,sEv,fn){
  if(obj.attachEvent){
    obj.attachEvent('on'+sEv,function(){
      fn.call(obj);
    });
  }
  else{
    obj.addEventListener(sEv,fn,false);
  }
}

/*根据className获取元素 完美版*/
function getByClass(oParent,sClass){
  var aEle=oParent.getElementsByTagName('*');
  var aResult=[];
  var re=new RegExp('\\b'+sClass+'\\b', 'i');// \b为单词边界 ‘\\b’为字符串  讲其转义为\b
  for(var i=0;i<aEle.length;i++){
    if(re.test(aEle[i].className)){
      aResult.push(aEle[i]);
    }
  }
  return aResult;
}

/*获取对象的样式 包括非行间样式*/
function getStyle(obj,attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];
  }
  else{
    return getComputedStyle(obj,false)[attr];
  }
}

/*将arr2里的每一个元素放到arr1中*/
function appendArr(arr1,arr2){
  for(var i=0;i<arr2.length;i++){
    arr1.push(arr2[i]);
  }
}

/*获取index*/
function getIndex(obj){
  var aBrother=obj.parentNode.children;
  for(var i=0;i<aBrother.length;i++){
    if(aBrother[i]==obj){
      return i;
    }
  }
}