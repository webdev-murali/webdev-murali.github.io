//Youtube thumbnail-app-ctrl
angular.module('webProjectApp').controller('ytCtrl', function ($scope, $http,$sce) {
  //============================================
  // 1.jpg , 2.jpg  , 3.jpg
  // default.jpg
  // mqdefault.jpg  Medium Quality
    //mp1.jpg ,mp2,mp3 , hpdefault 
  // hqdefault.jpg  High Quality
   //hp1.jpg ,hp2,hp3 , hpdefault ,hp720.jpg
  // sddefault.jpg  standard definition version !
    //sd1,sd2,sd3 sddefault
  // maxresdefault.jpg maximum resolution version !
  //============================================= 
    //https://youtu.be/awMtFym4FI8?si=pvnYhtxwYDx32la4
  //Full Info about YT Video 
  //https://www.googleapis.com/youtube/v3/videos?key=YOUR_API_KEY&part=snippet&id=VIDEO_ID
  $scope.youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  $scope.ytThumbnail = function(url) {
    var ytURL = $sce.trustAsResourceUrl(url);
    console.log(ytURL);
    //chk-url-format
    if(ytURL){
      var match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);

      if (match && match[1]) {
        //get-yt-video-id
        $scope.ytVideoId = $sce.trustAsResourceUrl(match[1]);;
        console.log($scope.ytVideoId);
      } else {
        alert("In valid video URL !..");
      }
      var d = 'https://www.youtube.com/oembed?format=json&url='+ytURL;
      $http.get(d)
      .then(function (response) {
        // Successful response
        $scope.ytData = response.data;
        //console.log($scope.ytData.html);
        $scope.trustedHtmlContent = $sce.trustAsHtml($scope.ytData.html);
      })
      .catch(function (error) {
        // Error handling
        console.error('Error fetching YT data:', error);
        alert("Youtube Video not found.!");
      });
    }else{
      alert("Invalid Youtube URL !");
    }
    //Thanks to https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api

  }

});
