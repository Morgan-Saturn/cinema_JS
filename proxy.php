<?php

//pour contourner l'erreur CORS
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/xml; charset=utf-8");

$rssUrl = "https://www.allocine.fr/rss/news-cine.xml";
$rssContent = file_get_contents($rssUrl);

if ($rssContent === FALSE) {
    http_response_code(500);
    echo "Couldn't get the rss feed.";
    exit;
}

echo $rssContent;
?>