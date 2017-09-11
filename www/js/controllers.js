    angular.module('starter.controllers', [])

          .controller('DashCtrl', function($scope) {})

          .controller('ChatsCtrl', function($scope, Chats) {
            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            $scope.chats = Chats.all();
            $scope.remove = function(chat) {
              Chats.remove(chat);
            };
          })

          .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
            $scope.chat = Chats.get($stateParams.chatId);
          })

          .controller('AccountCtrl', function($scope) {
            $scope.settings = {
              enableFriends: true
            };
          })

          .controller('ChatBotCtrl', function($scope) {
            $scope.chatmsg = '';
            $scope.showFaq=false;

            $scope.sendMsg = function() {
              //$scope.showFaq=false;
             // console.log('you entered=' + $scope.chatmsg);
              sendText($scope.chatmsg);
            }

            function sendText(query_text) {
              try {
                ApiAIPlugin.requestText({
                    query: query_text
                  },
                  function(response) {
                    // place your result processing here
                   // alert(JSON.stringify(response));

                    //console.log(response);

                    if(response.result.action==='faq'){
                        $scope.showFaq=true;
                        $scope.showHistory=false;
                        $scope.data=JSON.parse(response.result.fulfillment.speech);
                        $scope.speechText =$scope.data.speechText;
                        $scope.botname =$scope.data.botname;
                        $scope.features =$scope.data.features;
                    }

                    if(response.result.action==='history'){
                        $scope.showHistory=true;
                        $scope.showFaq=false;
                        $scope.data=JSON.parse(response.result.fulfillment.speech);
                        $scope.uName ='Abhijeet';
                        $scope.speechText =$scope.data.speechText;
                        $scope.portfolioDetail = $scope.data.portfolioDetails;
                        $scope.richText=$scope.data.richDataSrc;

                        TTS.speak({
                                text:  $scope.speechText,
                                locale: 'en-GB',
                                rate: 0.75
                                }, function () {
                                    alert( $scope.speechText);
                                }, function (reason) {
                                    alert(reason);
                        });
                    }
                  },
                  function(error) {
                    // place your error processing here
                    alert(error);
                  });
              } catch (e) {
                alert(e);
              }
            }


        // make sure your the code gets executed only after `deviceready`.
    //    document.addEventListener('deviceready', function () {
    //        // basic usage
    //        TTS
    //            .speak('hello, world!', function () {
    //                alert('success');
    //            }, function (reason) {
    //                alert(reason);
    //            });
    //
    //        // or with more options
    //        TTS
    //            .speak({
    //                text: 'hello, world!',
    //                locale: 'en-GB',
    //                rate: 0.75
    //            }, function () {
    //                alert('success');
    //            }, function (reason) {
    //                alert(reason);
    //            });
    //    }, false);

          });
