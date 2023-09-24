//create new app
var app = angular.module("resumeApp",[]);
//create controller 
app.controller("templateCtrl",function ($scope,$http) {
  //switch-theme
  $scope.themeTxt = "Dark Mode";

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
  //$scope.getSampleData();


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
 
