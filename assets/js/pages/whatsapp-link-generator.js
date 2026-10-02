var app = angular.module('whatsapp',['toaster']);
        app.controller('whatsappCtrl',function($scope,$timeout,toaster){
            $scope.mobileNumber = "";
            $scope.customMessage = "Hi";
            $scope.copyStatus = "Clink here to copy";

            $scope.$watchGroup(['mobileNumber', 'customMessage'], function() {
                console.warn("watchgroup.")
                $scope.whatsappLink = "https://api.whatsapp.com/send?phone=" + $scope.mobileNumber + "&text=" + encodeURIComponent($scope.customMessage);
            });

            $scope.copyToClipboard = function() {
                
                var copyText = document.getElementById("whatsappLink");
                var mobileNumber = document.getElementById("mobileNumber");
                var customMessage = document.getElementById("customMessage");
                //mobile number
                console.log(mobileNumber.value);
                console.log(customMessage);
                if($scope.mobileNumber == null || $scope.mobileNumber == undefined || !$scope.mobileNumber){
                    mobileNumber.focus();
                    toaster.pop('error', "Error!", "Please Enter Valid Mobile Number");
                }else if($scope.customMessage == '' || $scope.customMessage == null){
                    customMessage.focus();
                    toaster.pop('error', "Error!", "Please Enter Custom Message");
                }else{
                    copyText.select();
                    navigator.clipboard.writeText(copyText.value).then(function() {
                        toaster.pop('success', "Success!", "Link Copied Successfully.");
                        $scope.copyStatus = "Copied..";
                        $timeout(function(){
                            $scope.copyStatus = "Clink here to copy";
                        },100);
                    }).catch(function(err) {
                        console.error("Failed to copy: ", err);
                        alert("Copy link failed.");
                    });
                }
            
            };
        });
