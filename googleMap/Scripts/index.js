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
			myMapLoad();
		}
	} else { //IE 浏览器
		myScript.onreadystatechange = function() {
			var readyState = myScript.readyState;
			if (readyState == 'loaded' || readyState == 'complete') {
				myMapLoad();
			}
		}
	}
}, 300);


function myMapLoad(){
	/***************自定义叠加层，可作为站点显示在地图上******************/
	function LableMarker(options) {
		this.latlng = options.latlng; //设置图标的位置  
		// this.index = options.index || 0;
		this.image_ = options.image; //设置图标的图片  
		this.labelText = options.labelText || '标记';
		this.labelClass = options.labelClass || 'shadow'; //设置文字的样式  
		this.clickFun = options.clickFun || function () { };
		this.mouseoverFun = options.mouseoverFun || function () { };
		this.mouseoutFun = options.mouseoutFun || function () { };
		this.div = null;
		this.isShow = options.isShow;
		this.map = options.map,
		this.setMap(this.map);
	}
	// 继承自 google.maps.OverlayView
	LableMarker.prototype = new google.maps.OverlayView();
	//初始化图标  
	LableMarker.prototype.onAdd = function() {
		var mapDiv = document.createElement('DIV'); //创建存放图片和文字的div  

		mapDiv.style.position = "absolute";
		mapDiv.style.cursor = "pointer";
		mapDiv.innerHTML = this.labelText;

		//var panes = this.getPanes();
		//panes.overlayLayer.appendChild(div);

		this.getPanes().overlayImage.appendChild(mapDiv);
		this.div = mapDiv;

		var e = this;
		$(this.div).bind("click", function () { e.clickFun(e.index, e); });
		$(this.div).bind("mouseover", function () { e.mouseoverFun(e.index, e); });
		$(this.div).bind("mouseout", function () { e.mouseoutFun(e.index, e); });
	};
	//绘制图标，主要用于控制图标的位置 
	//当第一次在地图上显示时调用 
	LableMarker.prototype.draw = function() {
		var overlayProjection = this.getProjection();
		var position = overlayProjection.fromLatLngToDivPixel(this.latlng);
		// 设置层的位置
		this.div.style.left = position.x - 12 + "px";
		this.div.style.bottom = -position.y + "px";
		if (this.isShow) {
			this.div.style.display = "block";
		} else {
			this.div.style.display = "none";
		}
	};
	// 当设置悬浮层的 setMap(null) 会自动调用 
	LableMarker.prototype.onRemove = function() {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	};
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
			// disableDefaultUI: true,  //启用或是停用所有默认的用户界面，为true的时候停用
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
	initialize();
	

	function setMapFlag(mapFlgOption, mapInfo, index, map) {
		var mapLabelStr = "<div class='mapFlagDIV'>"
				+"<a href='http://www.ly.com/ghotel/' target='_blank' class='mapMarkerIcon'>"+ (index + 1) +"</a>"
				+"<a class='mapHotelName'>"+ mapInfo +"</a>"
				+"</div>";
		var marker = new LableMarker({
			latlng: mapFlgOption,
			image: "http://img1.40017.cn/cn/v/wanle/2015/details/default-map-1.png",
			labelText: mapLabelStr,
			isShow: true,
			map: map,
			mouseoverFun: function(index){
				var hNameKuangH = $(this.div).find(".mapHotelName").height();
				var toTop = -hNameKuangH-25;

				$(this.div).find(".mapHotelName").css("top", toTop+"px");
				$(this.div).find(".mapHotelName").show();
			},
			mouseoutFun: function(index){
				$(this.div).find(".mapHotelName").hide();
			}

				// position: mapFlgOption,
				// icon: 'Images/icon_hotelmap__normal.png',
				// title: mapInfo   //添加title或者用marker.setTitle(mapInfo);
		});

		marker.setMap(map);

		// var infowindow = new google.maps.InfoWindow({
		// 	content: mapInfo  //信息窗口中显示的内容。该内容可以是 HTML 元素、 纯文本字符串或包含 HTML 的字符串。
		// });
		// // infowindow.open(map,marker);
		// google.maps.event.addListener(marker, 'mouseover', function() {
		// 	infowindow.open(map, marker);
		// });
		// google.maps.event.addListener(marker, 'mouseout', function() {
		// 	infowindow.close(map, marker);
		// });
	}



}





//确保在页面完全载入后再加载 Google 地图
// google.maps.event.addDomListener(window, 'load', myMapLoad);