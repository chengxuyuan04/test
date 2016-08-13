window.onload=function(){
	
	var EventUtil = {
   addHandler : function(element, type, handler) {
              if (element.addEventListener) {
                      element.addEventListener(type, handler, false);
              } else if (element.attachEvent) {
                    element.attachEvent("on" + type, handler);
           } else {
                     element["on" + type] = handler;
              }
    },
   removeHandler : function(element, type, handler) {
           if (element.removeEventListener) {
                   element.removeEventListener(type, handler, false);
           } else if (element.detachEvent) {
                    element.detachEvent("on" + type, handler);
           } else {
                     element["on" + type] = null;
         }
    },
   getEvent : function(event) {
         return event ? event : window.event;
 },
   getTarget : function(event) {
                return event.target || event.srcElement;
     },
  preventDefault : function(event) {
           if (event.preventDefault) {
                  event.preventDefault();
              } else {
                     event.returnValue = false;
           }
    },
   stopPropagation : function(event) {
          if (event.stopPropagation) {
                 event.stopPropagation();
             } else {
                     event.cancelBubble = true;
           }
    }
};
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
var city_name = document.getElementById('aqi-city-input').value;
var city_value = document.getElementById('aqi-value-input').value;
var pattern = /^[a-zA-Z\u4E00-\u9FA5]+$/;
var pattern1 = /^\d+$/;
if((city_name == "")||(city_value == ""))
    alert("城市名或者质量指数不能为空");
    else
    {
    	if(!pattern.test(city_name))
          {
	         alert("城市名必须为中英文字符");
          }
         if(!pattern1.test(city_value))
          {
	         alert("空气质量指数必须为整数");
           }
    }

  aqiData[city_name] = city_value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
      var s2 = document.getElementById('aqi-table');
      s2.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
      var tableFragment = document.createDocumentFragment();
      for(i in aqiData)
      {
      	var tr1 = document.createElement("tr");
      	var tdFragments = document.createDocumentFragment();
      	var td1 = document.createElement("td");
      	td1.innerHTML = i;
      	var td2 = document.createElement("td");
      	td2.innerHTML = aqiData[i];
      	var td3 = document.createElement("td");
      	     
      	     td3.innerHTML = '<button>删除</button>';
      	tdFragments.appendChild(td1);
      	tdFragments.appendChild(td2);
      	tdFragments.appendChild(td3);
      	tr1.appendChild(tdFragments);
      	tableFragment.appendChild(tr1);
      }
      s2.appendChild(tableFragment);

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(r) {
  // do sth.
  //delete(aqiData[cityn]);
  var i = r.parentNode.parentNode.rowIndex;
  var j = document.getElementById('aqi-table');
  var tx = j.getElementsByTagName('tr');
      console.log(tx);
     var td0 = tx[i].getElementsByTagName('td')[0].innerHTML;
     delete aqiData[td0];
     
  j.deleteRow(i);
  renderAqiList();
}

function init() {
var s = document.getElementById('add-btn');
    EventUtil.addHandler(s,'click',addBtnHandle);
// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
var  s3 = document.getElementById('aqi-table');
EventUtil.addHandler(s3,'click',function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if(target.nodeName.toLowerCase() === "button")
  {
      delBtnHandle(target);
  }
	    
});

}

init();
}