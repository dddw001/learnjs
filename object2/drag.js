function Drag(id){
      this.disX=0;
      this.disY=0;
      this.oDiv=document.getElementById(id);
      var that=this;
      this.oDiv.onmousedown=function(){
        that.fnDown(ev);
      }
    }
    Drag.prototype.fnDown=function (ev){
        var oEvent=ev||event;
        this.disX=oEvent.clientX-this.oDiv.offsetLeft;
        this.disY=oEvent.clientY-this.oDiv.offsetTop;
        var that=this;
        document.onmousemove=function(ev){
          that.fnMove(ev);
        }
        document.onmouseup=function(){
          that.fnUp();
        }
        return false;//修改火狐Bug
    }
    Drag.prototype.fnMove=function (ev){
      var oEvent=ev||event;
      this.oDiv.style.left=oEvent.clientX-this.disX+'px';
      this.oDiv.style.top=oEvent.clientY-this.disY+'px';
    }  
    Drag.prototype.fnUp=function (){
      document.onmousemove=null;
      document.onmouseup=null;
    }