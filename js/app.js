//create new app
var app = angular.module("resumeApp",[]);
//create controller 
app.controller("templateCtrl",function ($scope) {
  //Personal info
  $scope.firstName = "";
  $scope.lastName = "";
  $scope.profession = "";
  $scope.city = "";
  $scope.country ="";
  $scope.pincode ="";
  $scope.phoneNumber = "";
  $scope.emailId = "";

  $scope.careerObjective = "Results-driven  Web Developer cutting-edge websites and web applications. Expertise in HTML,CSS,JavaScript,Angular js and other web technologies."
  //education
  $scope.collegeName = "";
  $scope.collegeLocation = "";
  $scope.degree = "";
  $scope.graduationSt="";
  $scope.graduationEnd="";
  //work experience 1
  $scope.jobTitle = "";
  $scope.companyName = "";
  $scope.workcountry = "";
  $scope.workstate = "";
  $scope.workCity = "";
  $scope.work1St="";
  $scope.work1End="";
  //work experience 2
  $scope.jobTitle2 = "";
  $scope.companyName2 = "";
  $scope.work2country = "";
  $scope.work2state = "";
  $scope.work2City = "";
  $scope.work2St="";
  $scope.work2End="";
  //Skills
  $scope.skills=[];
  //add skills
  //comma separate


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
  //Certification
  $scope.CertificationName = "";
  $scope.CertificationsDate = "";




});