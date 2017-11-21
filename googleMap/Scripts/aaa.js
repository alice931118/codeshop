var hotelList = [{
	"lat": 13.74185,
	"lon": 100.55179,
	"hotelName": "曼谷 JW 万豪酒店"
}, {
	"lat": 13.72432,
	"lon": 100.51437,
	"hotelName": "曼谷文华东方酒店"

}, {
	"lat": 13.78013,
	"lon": 100.50591,
	"hotelName": "暹罗酒店"
}];
var hotelNum = hotelList.length;


setTimeout(function() {
	var myHead = document.getElementsByTagName('head')[0];
	var myScript = document.createElement('script');
	myScript.type = 'text/javascript';
	myScript.src = 'http://ditu.google.cn/maps/api/js?language=zh-CN&charset=utf-8';

	myHead.appendChild(myScript);

	var i = 0;
	var hotelListLength = hotelList.length;

	if (! /*@cc_on!@*/ 0) { //非IE浏览器
		myScript.onload = function() {
			initialize();
		}
	} else { //IE 浏览器
		myScript.onreadystatechange = function() {
			var readyState = myScript.readyState;
			if (readyState == 'loaded' || readyState == 'complete') {
				initialize();
			}
		}
	}
}, 300);


	//初始化地图对象
	function initialize() {
		var myMapCenter_lon = 0,
			temp_lon = 0;
		var myMapCenter_lat = 0,
			temp_lat = 0;;
		var i = 0;

		for (i = 0; i < hotelNum; i++) {
			temp_lon += hotelList[i].lon;
			temp_lat += hotelList[i].lat
		}
		myMapCenter_lat = (temp_lat / hotelNum); //纬度
		myMapCenter_lon = (temp_lon / hotelNum); //经度

		console.log(myMapCenter_lon);
		console.log(myMapCenter_lat);
		var mapProp = {
			center: new google.maps.LatLng(myMapCenter_lat, myMapCenter_lon), //地图的中心点,该中心通过坐标（纬度，经度）在地图上创建一个中心点。
			zoom: 12, //缩放的级数，zoom:0显示整个地图的完全缩放
			mapTypeId: google.maps.MapTypeId.ROADMAP, //地图的初始类型:普通的街道地图。HYBRID：显示卫星图像的主要街道透明层，SATELLITE：显示卫星图像，TERRAIN：显示带有自然特征（如地形和植被）的地图
			disableDefaultUI: false,  //启用或是停用所有默认的用户界面，为true的时候停用
			// backgroundColor: '#ccc',  //用作地图 div 的背景颜色。当用户进行平移时，如果尚未载入图块，则显示此颜色。仅在启动地图时，才能设置此选项。
			//disableDoubleClickZoom:true,  //启用/停用双击时缩放并居中，默认的时候为启用状态，为true的时候停用
			// draggable:false,  //值为false则禁止拖动地图
			// draggableCursor: "",  //要在可拖动对象上显示的光标的名称或网址。
			//keyboardShortcuts: false,  //为false的时候则禁用通过键盘控制地图。默认情况下是启用键盘快捷键
			// mapTypeControl: false,  //地图类型控件的初始启用/停用状态，默认情况下为true，启用地图类型（地图、卫星地图）。
			// mapTypeControlOptions: {
			// 	style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,  //显示单个按钮控件，从下拉菜单中选择地图类型。此外还有值：HORIZONTAL_BAR，DEFAULT
			//     // position:google.maps.ControlPosition.TOP_CENTER  //位置控制
			// },//地图类型控件的初始显示选项。
			// scaleControl: false,  //缩放控件的初始启用/停用状态
			// navigationControl: true, //导航控件的初始启用/停用状态
			// scrollwheel: false,  //为 False，则停用通过滚轮缩放地图的功能.默认是启用
			// streetViewControl: false,  //街景视图街景小人控件的启用/静止,默认是启用的
		};

		var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

		for (i = 0; i < hotelNum; i++) {
			var mapFlgOption = new google.maps.LatLng(hotelList[i].lat, hotelList[i].lon);
			var mapInfo = hotelList[i].hotelName;
			setMapFlag(mapFlgOption, mapInfo, i, map);
		}
	}
	

	function setMapFlag(mapFlgOption, mapInfo, index, map) {
		//折线标记
		// var stavanger=new google.maps.LatLng(13.74185,100.55179);
		// var amsterdam=new google.maps.LatLng(13.72432,100.51437);
		// var london=new google.maps.LatLng(13.78013,100.50591);
		// var myTrip = [stavanger,amsterdam,london,stavanger];  //当要用多边形标记 第一个和最后一个坐标是相等的
		// var flightPath = new google.maps.Polyline({
		//   path:myTrip,  //指定了多个直线的纬度/经度坐标
		//   strokeColor:"#0000FF",  //指定直线的十六进制颜色值(格式: "#FFFFFF")
		//   strokeOpacity:0.8,  //指定直线的透明度(该值为 0.0 到 1.0)
		//   strokeWeight:2  //定义线的宽度,以像素为单位。
		// });
		// flightPath.setMap(map);

		// var amsterdam = new google.maps.LatLng(13.74185,100.55179); 
		// var myCity = new google.maps.Circle({
		// 	center:amsterdam,  //指定圆的中心点参数
		// 	radius:20000,  //指定圆的半径，以米为单位
		// 	strokeColor:"#0000FF",  //指定弧线的十六进制颜色值(格式: "#FFFFFF")
		// 	strokeOpacity:0.8,  //指定弧线的透明度(该值为 0.0 到 1.0)
		// 	strokeWeight:2,  //-定义线的宽度,以像素为单位
		// 	fillColor:"#0000FF",  //指定圆的十六进制颜色值填充值 (格式: "#FFFFFF")
		// 	fillOpacity:0.4  //- 指定填充颜色的透明度 (该值为 0.0 到 1.0)
		// });
		// myCity.setMap(map);

		//指定图标的标记
		var marker = new google.maps.Marker({
			position: mapFlgOption,
			icon: 'Images/icon_hotelmap__normal.png',
			// title: mapInfo   //添加title或者用marker.setTitle(mapInfo);
		});

		marker.setMap(map);

		var infowindow = new google.maps.InfoWindow({
			content: mapInfo,  //信息窗口中显示的内容。该内容可以是HTML元素、纯文本字符串或包含HTML的字符串。信息窗口将会根据相应内容调整大小
			// disableAutoPan: true, //为true停用在打开时自动平移的功能。默认情况下，信息窗口会在打开后平移地图，以便让自己完全显示出来。
			// maxWidth: 100,   //信息窗口的最大宽度（不考虑内容的宽度）
			// pixelOffset: 0,  //信息窗口的箭头距离信息窗口在地图上所锚定地理坐标点的偏移量（以像素为单位）。
			// zIndex: 2, //zIndex 值较大的信息窗口显示在值较小的信息窗口之前
			// position: mapFlgOption  //用于显示此信息窗口的 LatLng。如果信息窗口是通过锚点打开的，则使用锚点的位置
		});
		// infowindow.open(map,marker);  //map:地图，marker：标记
		google.maps.event.addListener(marker, 'mouseover', function() {
			infowindow.open(map, marker);
		});
		google.maps.event.addListener(marker, 'mouseout', function() {
			infowindow.close(map, marker);
		});
	}






//确保在页面完全载入后再加载 Google 地图
// google.maps.event.addDomListener(window, 'load', myMapLoad);