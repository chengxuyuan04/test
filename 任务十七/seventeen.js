window.onload=function(){/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var color = ["AliceBlue","Coral","DarkCyan","silver","BlueViolet"];
var loop = {
  day:"10",
  week:"50",
  month:"200",
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  var w = dat.getDay();
  return y + '-' + m + '-' + d + '-' + w;//加上是周几
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  //console.log(dat);
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    //console.log(datStr);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    //console.log(returnData[datStr]);
    dat.setDate(dat.getDate() + 1);
  }
  //console.log(returnData);
  return returnData;

}
/*function getColor(){
  a = Math.ceil(Math.random()*255);
  b = Math.ceil(Math.random()*255);
  c = Math.ceil(Math.random()*255);
  return rgb(a,b,c);
}*/

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "-1",
  nowGraTime: "month"
}

/**
 * 渲染图表
 */
function renderChart() {
  //console.log(pageState.nowGraTime);
  //console.log(pageState.nowSelectCity);
  var nam = pageState.nowGraTime;
  var num = loop[nam];
 /* for( var p in chartData)
  {
    //console.log(chartData[p].length);
    for(var i = 0;i<chartData[p].length;i++)
    {
      console.log(chartData[p][i]);
    }
  }*/
  var height1 = chartData.height;
  console.log(height1.length);
  var div1 = document.createDocumentFragment();
  var divOne = document.getElementsByClassName("aqi-chart-wrap");
  var hell=document.getElementById("hello");
  var str="";
  for (var i = 0;i < height1.length; i++) {
  /* div11 = document.createElement("div");
  var str = height1[i] + "px";
  div11.style.height = str;
  div11.style.width = num + "px";
  div11.style.backgroundColor = color[Math.ceil(Math.random()*4)];
  div11.style.float= "left" ;
  div11.style.position = "absolute";
  div11.style.bottom = "0px";
  div11.style.left = i*num+2*i+"px";
  div1.appendChild(div11);*/
  var x=i*num+2*i;
  str+="<div title='第"+i+"个"+nam+"的值,height="+height1[i]+"px' style='height:"+height1[i]+"px;width:"+num+"px;background-color:"+color[Math.ceil(Math.random()*4)]+";float:left;position:absolute;bottom:0px;left:"+x+"px'></div>"
}
  //hell.appendChild(div1);
hell.innerHTML = str;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
   for(var i=0;i<time1.length;i++)
  {
    if(time1[i].checked)//判断当前的input是否选中
    {
      v2 = time1[i].value;//获得input的内容
      if(v1 != v2)
      {
        // console.log(v2);
         pageState.nowGraTime = v2;//获得当前的时间
      }
    }
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  
  // 确定是否选项发生了变化 
 var city1 = cityselectid.options[cityselectid.selectedIndex].innerHTML;//获得当前所选的城市
     pageState.nowSelectCity = city1;//获得当前的城市
     //console.log(city1);
     //console.log(aqiSourceData[city1]);//json的形式，这里用.city1会出错，所以用[];
   aqiSourceData[city1];
  // 设置对应数据
  initAqiChartData();

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  time1=document.getElementsByTagName("input");
  for(var i=0;i<time1.length;i++)
  {
    if(time1[i].checked)
    {
      v1 = time1[i].value;
     // console.log(v1);
    }
  }
  h4 = document.getElementById("form-gra-time");
  h4.onclick = graTimeChange;
  }

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  cityselectid = document.getElementById('city-select');
 /* var addfragment = document.createDocumentFragment();
  for(var city in aqiSourceData){
      var h1 = document.createElement("option");//创建option元素
      h1.innerHTML = city;
      addfragment.appendChild(h1);  
}
cityselectid.appendChild(addfragment);*/
var str1 = '<option>请选择</option>';
for(var city in aqiSourceData)
{
  str1+="<option>"+city+"</option>";
}
cityselectid.innerHTML=str1;

 // 给select设置事件，当选项发生变化时调用函数citySelectChange
 cityselectid.onchange = citySelectChange;

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowtime = pageState.nowGraTime;
  var nowcity = pageState.nowSelectCity;
  chartData.height = [];
  chartData.time = [];
  var ss = 0;
  var w = 0;
  var y = 0;
  if(nowtime === "day")
  {
    for (var i in aqiSourceData[nowcity]) {
      chartData.height[ss] = aqiSourceData[nowcity][i];
      chartData.time[ss] = Object.getOwnPropertyNames(aqiSourceData[nowcity])[ss];
      ss++;
    }
  }
  else 
    {     
     if(nowtime === "week")//周
     {
       var k = 0;
       var j = 0;
       var h = 0;
       for(var i in aqiSourceData[nowcity])
       {
           var ch = i.slice(11);
           //console.log(ch);
           if(ch == "0")
           {
               
               k++;
               h = h + aqiSourceData[nowcity][i];
               var s1 = Math.ceil(h/k);
               chartData.height[ss] = s1;
               chartData.time[ss] = ss;
               ss++;
               k = 0;
               h = 0;
           }
           else{
              k++;
              h = h + aqiSourceData[nowcity][i];
            }
           
           j++;
       }
       if( k != 0)
       {
        s1 = h/k;
        chartData.height[ss] = s1;
        chartData.time[ss] = ss;
       }

     }
     else
     {  var yh = "01";
        var m2 = 0;
        var m1 = 0;
        for(var i in aqiSourceData[nowcity])
        {  
            if(i.slice(5,7) != yh)
            {  

                ss++;
                chartData.height[ss-1] = Math.ceil(m2/m1);
                m2 = 0;
                m1 = 0;
                chartData.time[ss-1] = ss-1;
                yh = i.slice(5,7);
            }
            else
            {
               m1++;
               m2 = m2 + aqiSourceData[nowcity][i];
            }

        }
        if(m2 != 0)
        {
           chartData.height[ss] = Math.ceil(m2/m1);
           chartData.time[ss] = ss;
        }  
     }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();
}