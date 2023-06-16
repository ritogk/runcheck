<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

    <title>Location</title>

		<script>
			window.onload = (event) => {
				if (navigator.geolocation) {
					navigator.geolocation.watchPosition(showPosition, error, options);
				} else {
					console.log("Geolocation is not supported by this browser.");
				}				
			}

			const showPosition =(position) =>{
					var latitude = position.coords.latitude;
					var longitude = position.coords.longitude;
					console.log("Latitude: " + latitude);
					console.log("Longitude: " + longitude);
					document.getElementById("latitude").innerText  = latitude;
					document.getElementById("longitude").innerText  = longitude;
				}
			
			const error = (err) => {
				console.warn('ERROR(' + err.code + '): ' + err.message);
			}

			var options = {
      enableHighAccuracy: true,  // 高精度な位置情報を要求する
      timeout: 500,              // 位置情報の取得に最大5秒まで待つ
      maximumAge: 0              // 常に最新の位置情報を取得する
    };
		</script>
    
  </head>
  <body style="background: rgb(243, 244, 246);">
    <p><span>latitude: </span><span id="latitude"></span></p>
		<p><span>longitude: </span><span id="longitude"></span></p>
  </body>
</html>
