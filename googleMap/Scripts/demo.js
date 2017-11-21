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


setTimeout(function(){
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
},300);


function myMapLoad(){
	/***************自定义叠加层，可作为站点显示在地图上******************/
	function LableMarker(options) {
		this.latlng = options.latlng; //设置图标的位置,中心点
		// this.index = options.index || 0;
		this.image_ = options.image; //设置图标的图片  
		this.labelText = options.labelText || '标记';
		this.labelClass = options.labelClass || 'shadow'; //设置文字的样式  
		this.clickFun = options.clickFun || function () { };
		this.mouseoverFun = options.mouseoverFun || function () { };
		this.mouseoutFun = options.mouseoutFun || function () { };
		this.div = null;
		this.isShow = options.isShow;
		this.map = options.map;
		this.setMap(this.map);
	};
	LableMarker.prototype = new google.maps.OverlayView();

	LableMarker.prototype.onAdd = function() {
		var mapDiv = document.createElement('div'); //创建存放图片和文字的div  

		mapDiv.style.position = "absolute";
		mapDiv.style.cursor = "pointer";
		mapDiv.innerHTML = this.labelText;
		this.getPanes().overlayImage.appendChild(mapDiv);
		this.div = mapDiv;

		var e = this;
		$(this.div).bind("click", function () { e.clickFun(e.index, e); });
		$(this.div).bind("mouseover", function () { e.mouseoverFun(e.index, e); });
		$(this.div).bind("mouseout", function () { e.mouseoutFun(e.index, e); });
	};

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

	LableMarker.prototype.onRemove = function() {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	};


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

		var mapProp = {
			center: new google.maps.LatLng(myMapCenter_lat,myMapCenter_lon),
			zoom:12,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

		for (i = 0; i < hotelNum; i++) {
			var mapFlgOption = new google.maps.LatLng(hotelList[i].lat, hotelList[i].lon);
			var mapInfo = hotelList[i].hotelName;
			setMapFlag(mapFlgOption, mapInfo, i, map);
		}
	};
	initialize();

	function setMapFlag(mapFlgOption, mapInfo, index, map) {
		var mapLabelStr = "<div class='mapFlagDIV'>"
				+"<a href='http://www.ly.com/ghotel/' target='_blank' class='mapMarkerIcon'>"+ (index + 1) +"</a>"
				+"<a class='mapHotelName'>"+ mapInfo +"</a>"
				+"</div>";
		var marker = new LableMarker({
			latlng: mapFlgOption,
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
		});
		marker.setMap(map);
	}
}



// function initialize() {
// 	var myMapCenter_lon = 0,
// 		temp_lon = 0;
// 	var myMapCenter_lat = 0,
// 		temp_lat = 0;;
// 	var i = 0;

// 	for (i = 0; i < hotelNum; i++) {
// 		temp_lon += hotelList[i].lon;
// 		temp_lat += hotelList[i].lat
// 	}
// 	myMapCenter_lat = (temp_lat / hotelNum); //纬度
// 	myMapCenter_lon = (temp_lon / hotelNum); //经度

// 	var mapProp = {
// 		center: new google.maps.LatLng(myMapCenter_lat,myMapCenter_lon),
// 		zoom:12,
// 		mapTypeId:google.maps.MapTypeId.ROADMAP
// 	}
// 	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

// 	for (i = 0; i < hotelNum; i++) {
// 		var mapFlgOption = new google.maps.LatLng(hotelList[i].lat, hotelList[i].lon);
// 		var mapInfo = hotelList[i].hotelName;
// 		setMapFlag(mapFlgOption, mapInfo, i, map);
// 	}
// };


// function setMapFlag(mapFlgOption, mapInfo, indix, map){
// 	//标记
// 	var marker = new google.maps.Marker({
// 		position: mapFlgOption,
// 		icon: 'Images/icon_hotelmap__normal.png',
// 		// animation:google.maps.Animation.BOUNCE
// 	})
// 	marker.setMap(map);

// 	// 折线标记
// 	var stavanger=new google.maps.LatLng(13.74185,100.55179);
// 	var amsterdam=new google.maps.LatLng(13.72432,100.51437);
// 	var london=new google.maps.LatLng(13.78013,100.50591);
// 	var myTrip = [stavanger,amsterdam,london,stavanger];

// 	var flightPath = new google.maps.Polyline({
// 	  path:myTrip,
// 	  strokeColor:"#0000FF",
// 	  strokeOpacity:0.8, 
// 	  strokeWeight:2
// 	});
// 	flightPath.setMap(map);

// 	// 圆
// 	var myCity = new google.maps.Circle({
// 	  center:amsterdam,
// 	  radius:2000,
// 	  strokeColor:"#0000FF",
// 	  strokeOpacity:0.1,
// 	  strokeWeight:2,
// 	  fillColor:"#0000FF",
// 	  fillOpacity:0.1
// 	});
// 	myCity.setMap(map);


// 	var infowindow = new google.maps.InfoWindow({
// 		content:mapInfo
// 	});
// 	google.maps.event.addListener(marker, 'mouseover', function() {
// 		infowindow.open(map, marker);
// 	});
// 	google.maps.event.addListener(marker, 'mouseout', function() {
// 		infowindow.close(map, marker);
// 	});
// }