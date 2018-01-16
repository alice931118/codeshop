var geolocation = new qq.maps.Geolocation("ERMBZ-DCXK6-IVNST-MZB7F-P4S2S-HRBDL", "APIDemo");


geolocation.getLocation(showPosition, showErr, options);


function showPosition(position) {
    //alert("定位成功");
    //alert(JSON.stringify(position, null, 4));

    if (position != null) {
        var parm = {
            "adcode": position.adcode,
            "lon": position.lng,
            "lat": position.lat
        }

        $http({
            url: api_url + 'DefaultUserLocationCity.html',
            params: parm,
            method: 'GET'
        }).success(function (data) {
            window.pagehiding();
            if (data != null) {
                var data = data.data;
                if (data.CityID == 0 || data.localDate == undefined) {
                    data = defaultCity.data;
                }
                SaveHomeCityInfo(data);
            } else {
                //接口没有数据
            }
        }).error(function () {

        }).nodata(function () {

        });
    }
};
function showErr() {
	//alert("定位失败");
};
var options = { timeout: 500 };