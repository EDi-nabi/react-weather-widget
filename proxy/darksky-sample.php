<?php
header('Access-Control-Allow-Origin: *');

if (!$_GET['lat'] || !$_GET['lng']) {
  print "You need to set 'lat' and 'lng'.";
  exit();
}

$darkskyApiKey = '123'; // Enter your DarkSky API Key
$darkskyApiUrl = 'https://api.darksky.net/forecast/' . $darkskyApiKey . '/' . urlencode($_GET['lat']) . ',' . urlencode($_GET['lng']) . '?exclude=minutely,hourly,daily,alerts,flags&lang=pl&units=ca';

$headers = [
    'Accepts: application/json',
];
$request = $darkskyApiUrl;

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => $request,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => 1
));

$response = curl_exec($curl);
print_r($response);
curl_close($curl);
?>
