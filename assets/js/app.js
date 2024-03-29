//create new app
var app = angular.module("webProjectApp",[]);
//create controller 
app.controller("templateCtrl",function ($scope,$http) {
  //switch-theme
  $scope.themeTxt = "Dark Mode";
 
$scope.exportToWord = function () {
  console.log("export docx....");
  const content = document.getElementById('resumeSection').innerHTML;
  const converted = htmlDocx.asBlob(content);
  saveAs(converted, 'document.docx');
}

//docx-2
$scope.exportToWord2 = function () {
  const htmlContent = document.getElementById('resumeSection').innerHTML;
  
  // Create a temporary textarea element to hold the HTML content
  const textArea = document.createElement('textarea');
  textArea.value = htmlContent;
  document.body.appendChild(textArea);

  // Select and copy the content to the clipboard
  textArea.select();
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(textArea);
  
  alert('HTML content copied to clipboard. You can now paste it into Microsoft Word.');
};





  $scope.switchTheme = function(){
    console.log($scope.themeTxt);
    if($scope.themeTxt == "Dark Mode"){
      $scope.themeTxt = "Light Mode";
      document.body.classList.add('darkMode');
      document.getElementsByTagName('nav')[0].classList.add('bg-dark');
    }else if($scope.themeTxt == "Light Mode"){
      $scope.themeTxt = "Dark Mode";
      document.body.classList.remove('darkMode');
      document.getElementsByTagName('nav')[0].classList.remove('bg-dark');
    }
    
  }
  //$scope.yourResumeData = {};
  $scope.yourResumeData = {
    //personalInfo: {}
  };
  //Save-ResumeData
  $scope.saveResumeData = function(resumeData){
    console.log("saveResumeData clicked..");
    console.log(resumeData);
  }
  $scope.fileChanged = function(event) {
    //console.log(event.target.files[0]);
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $scope.$apply(function() {
          $scope.yourResumeData.personalInfo.profilePic = e.target.result;
          //console.log($scope.yourResumeData.personalInfo.profilePic);
          $scope.previewImg($scope.yourResumeData.personalInfo.profilePic);
        });
      };
      reader.readAsDataURL(file);
    }
  $scope.previewImg = function(imageData) {
    $scope.base64Data = imageData.split(',')[1];
    $scope.binaryData = atob($scope.base64Data);
    $scope.uint8Array = new Uint8Array($scope.binaryData.length);

    for (var i = 0; i < $scope.binaryData.length; i++) {
        $scope.uint8Array[i] = $scope.binaryData.charCodeAt(i);
    }

    $scope.blob = new Blob([$scope.uint8Array], { type: 'image/jpeg' });
    $scope.imageUrl = URL.createObjectURL($scope.blob);
    //console.log($scope.imageUrl);
    // $scope.downloadLink = document.createElement('a');
    // $scope.downloadLink.href = $scope.imageUrl;
    // $scope.downloadLink.download = 'image.jpg';
    // $scope.downloadLink.textContent = 'Download Image';
    // document.body.appendChild($scope.downloadLink);
  };
};
  //Reset-Date
  $scope.resetData = function(){
    //$scope.resumeForm.$setPristine();
    console.log("Resume Data reset..");
    $scope.yourResumeData = {};
  }
  //get-JSON-Data
  $scope.getSampleData = function(){
    $http.get('assets/js/resume-data.json').then(function(response){
      console.log("Set Sample resume data....");
      $scope.yourResumeData = response.data;
      console.log($scope.yourResumeData);
    })
    .catch(function(error){
      console.log("Error loading...",error);
    });
  }
  $scope.getSampleData();


  //add skills
  // $scope.addSkills = function(){
  //   $scope.singleSkill = $scope.multiSkill.split(",");
  //   // $scope.skills = $scope.skills.filter(function(value, index, self) {
  //   //   return self.indexOf(value) === index;
  //   // });
  //   console.log($scope.singleSkill.join(","));
  //   $scope.addIn = {"name":$scope.singleSkill};
  //   $scope.skills.push($scope.addIn);
  // }
  //$scope.removeIn = [];
  // $scope.removeSkills = function(indexId) {
  //   $scope.skills.splice(indexId,1);
  // }

});

//weather-app-ctrl
app.controller('weatherCtrl', function ($scope, $http) {
  var c,d;
  $scope.searchCity = "trichy";
  console.log($scope.searchCity);
  $scope.WeatherUpdates = function(cityName) {
    cityName ? $scope.searchCity = cityName : $scope.searchCity = "trichy";
    c = '62e255b300bbccaec9d57300eeee1ce4';
    d = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='+$scope.searchCity+ '&appid=' + c;
  
    $http.get(d)
    .then(function (response) {
      // Successful response
      $scope.weatherData = response.data;
      console.log($scope.weatherData);
    })
    .catch(function (error) {
      // Error handling
      console.error('Error fetching weather data:', error);
    });
  }

});

//Youtube thumbnail-app-ctrl
app.controller('ytCtrl', function ($scope, $http,$sce) {
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

 
