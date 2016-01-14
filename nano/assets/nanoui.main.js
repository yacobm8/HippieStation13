(function(){this.NANO={INTERACTIVE:2,UPDATE:1,DISABLED:0}}).call(this),function(){this.helpers={link:function(t,n,i,e,s,r){return null==t&&(t=""),null==n&&(n=""),null==i&&(i=""),null==e&&(e={}),null==s&&(s=""),null==r&&(r=""),e=JSON.stringify(e),n&&(n="<i class='fa fa-fw fa-"+n+"'></i>",r+=" iconed"),s?"<span unselectable='on' class='link inactive "+s+" "+r+"'>"+n+t+"</span>":"<span unselectable='on' class='link active "+r+"' data-action='"+i+"' data-params='"+e+"'>"+n+t+"</span>"},bar:function(t,n,i,e,s){var r;return null==t&&(t=0),null==n&&(n=0),null==i&&(i=100),null==e&&(e=""),null==s&&(s=""),i>n?n>t?t=n:t>i&&(t=i):t>n?t=n:i>t&&(t=i),r=Math.round((t-n)/(i-n)*100),"<div class='bar'> <span class='barFill "+e+"' style='width: "+r+"%;'></span> <span class='barText'>"+s+"</span> </div>"},round:function(t){return Math.round(t)},fixed:function(t,n){return null==n&&(n=1),Number(Math.round(t+"e"+n)+"e-"+n)},floor:function(t){return Math.floor(t)},ceil:function(t){return Math.ceil(t)}}}.call(this),function(){document.when("ready",function(t){return function(){var n;n={},t.nanoui=new t.NanoUI(n,document),t.nanowindow=new t.Window(n,document),n.emit("memes"),t.NanoBus=n}}(this))}.call(this),function(){var t=function(t,n){return function(){return t.apply(n,arguments)}};this.NanoUI=function(){function n(n,i){this.bus=n,this.fragment=null!=i?i:document,this.winset=t(this.winset,this),this.close=t(this.close,this),this.act=t(this.act,this),this.render=t(this.render,this),this.update=t(this.update,this),this.serverUpdate=t(this.serverUpdate,this),this.bus.on("serverUpdate",this.serverUpdate),this.bus.on("update",this.update),this.bus.on("render",this.render),this.bus.on("memes",this.render),this.initialized=!1,this.data={},this.initialData=JSON.parse(this.fragment.query("#data").data("initial")),null==this.initialData&&("data"in this.initialData||"config"in this.initalData)&&this.error("Initial data did not load correctly.")}return n.prototype.serverUpdate=function(t){var n,i,e;try{n=JSON.parse(t)}catch(e){i=e,this.error(i)}this.bus.emit("update",n)},n.prototype.update=function(t){null==t.data&&(null!=this.data.data?t.data=this.data.data:t.data={}),this.data=t,this.initialized&&this.bus.emit("render",this.data),this.bus.emit("updated")},n.prototype.render=function(t){var n,i,e,s;this.initialized||(t=this.initialData);try{this.initialized||(s=this.fragment.query("#layout"),s.innerHTML=TMPL[t.config.templates.layout](t.data,t.config,helpers)),n=this.fragment.query("#content"),n.innerHTML=TMPL[t.config.templates.content](t.data,t.config,helpers)}catch(e){return i=e,void this.error(i)}return this.bus.emit("rendered",t),this.initialized?void 0:(this.initialized=!0,this.data=this.initialData,this.bus.emit("initialized",t))},n.prototype.act=function(t,n){return null==n&&(n={}),n.src=this.data.config.ref,n.nano=t,location.href=util.href(null,n)},n.prototype.error=function(t){var n;return t instanceof Error&&(t=t.fileName+":"+t.lineNumber+" "+t.message),n={nano_error:t},location.href=util.href(null,n)},n.prototype.log=function(t){var n;return n={nano_log:t},location.href=util.href(null,n)},n.prototype.close=function(){var t;return t={command:"nanoclose "+this.data.config.ref},this.winset("is-visible","false"),location.href=util.href("winset",t)},n.prototype.winset=function(t,n,i){var e,s;return null==i&&(i=this.data.config.window.ref),e={},e[i+"."+t]=n,s=e,location.href=util.href("winset",s)},n}()}.call(this),function(){this.util={extend:function(t,n){return Object.keys(n).forEach(function(i){var e;return e=n[i],e&&"[object Object]"===Object.prototype.toString.call(e)?(t[i]=t[i]||{},util.extend(t[i],e)):t[i]=e}),t},href:function(t,n){return null==t&&(t=""),null==n&&(n={}),t=new Url("byond://"+t),util.extend(t.query,n),t}}}.call(this),function(){var t=function(t,n){return function(){return t.apply(n,arguments)}};this.Window=function(){function n(n,i){this.bus=n,this.fragment=null!=i?i:document,this.attachLinks=t(this.attachLinks,this),this.updateLinks=t(this.updateLinks,this),this.updateStatus=t(this.updateStatus,this),this.resize=t(this.resize,this),this.attachResize=t(this.attachResize,this),this.drag=t(this.drag,this),this.attachDrag=t(this.attachDrag,this),this.attachButtons=t(this.attachButtons,this),this.calcOffset=t(this.calcOffset,this),this.fancyChrome=t(this.fancyChrome,this),this.dragging=!1,this.resizing=!1,this.bus.once("initialized",function(t){return function(n){return setTimeout(t.focusMap,100),n.config.user.fancy?(t.fancyChrome(),t.calcOffset(),t.attachButtons(),t.attachDrag(),t.attachResize()):void 0}}(this)),this.bus.on("rendered",this.updateStatus),this.bus.on("rendered",this.updateLinks),this.bus.on("rendered",this.attachLinks),this.fragment.on("keydown",this.focusMap)}return n.prototype.setPos=function(t,n){return nanoui.winset("pos",t+","+n)},n.prototype.setSize=function(t,n){return nanoui.winset("size",t+","+n)},n.prototype.focusMap=function(){return nanoui.winset("focus",1,"mapwindow.map")},n.prototype.fancyChrome=function(){var t;return nanoui.winset("titlebar",0),nanoui.winset("can-resize",0),t=this.fragment.queryAll(".fancy"),t.forEach(function(t){return t.style.display="inherit"})},n.prototype.calcOffset=function(){return this.xOriginal=window.screenLeft,this.yOriginal=window.screenTop,this.setPos(0,0),this.xOffset=window.screenLeft,this.yOffset=window.screenTop,this.setPos(this.xOriginal-this.xOffset,this.yOriginal-this.yOffset)},n.prototype.attachButtons=function(){var t,n,i,e;return t=function(){return nanoui.close()},i=function(){return nanoui.winset("is-minimized","true")},n=this.fragment.queryAll(".close"),n.forEach(function(n){return n.on("click",t)}),e=this.fragment.queryAll(".minimize"),e.forEach(function(t){return t.on("click",i)})},n.prototype.attachDrag=function(){var t;return t=this.fragment.query("#titlebar"),this.fragment.on("mousemove",this.drag),t.on("mousedown",function(t){return function(){return t.dragging=!0}}(this)),this.fragment.on("mouseup",function(t){return function(){return t.dragging=!1}}(this))},n.prototype.drag=function(t){var n,i;return null==t&&(t=window.event),this.dragging?(null==this.xDrag&&(this.xDrag=t.screenX),null==this.yDrag&&(this.yDrag=t.screenY),n=t.screenX-this.xDrag+(window.screenLeft-this.xOffset),i=t.screenY-this.yDrag+(window.screenTop-this.yOffset),this.setPos(n,i),this.xDrag=t.screenX,this.yDrag=t.screenY):void 0},n.prototype.attachResize=function(){var t;return t=this.fragment.query("#resize"),this.fragment.on("mousemove",this.resize),t.on("mousedown",function(t){return function(){return t.resizing=!0}}(this)),this.fragment.on("mouseup",function(t){return function(){return t.resizing=!1}}(this))},n.prototype.resize=function(t){var n,i;return null==t&&(t=window.event),this.resizing?(null==this.xResize&&(this.xResize=t.screenX),null==this.yResize&&(this.yResize=t.screenY),n=Math.max(150,t.screenX-this.xResize+window.innerWidth),i=Math.max(150,t.screenY-this.yResize+window.innerHeight),this.setSize(n,i),this.xResize=t.screenX,this.yResize=t.screenY):void 0},n.prototype.updateStatus=function(t){var n;return n=this.fragment.queryAll(".statusicon"),n.forEach(function(n){var i;switch(n.className=n.className.replace(/good|bad|average/g,""),t.config.status){case NANO.INTERACTIVE:i="good";break;case NANO.UPDATE:i="average";break;default:i="bad"}return n.classList.add(i)})},n.prototype.updateLinks=function(t){var n;return n=this.fragment.queryAll(".link"),t.config.status!==NANO.INTERACTIVE?n.forEach(function(t){return t.className="link disabled"}):void 0},n.prototype.attachLinks=function(t){var n;return n=function(){var n,i;return n=this.data("action"),i=JSON.parse(this.data("params")),null!=n&&null!=i&&t.config.status===NANO.INTERACTIVE?nanoui.act(n,i):void 0},this.fragment.queryAll(".link.active").forEach(function(t){return t.on("click",n)})},n}()}.call(this);