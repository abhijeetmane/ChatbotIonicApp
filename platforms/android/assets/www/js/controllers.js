angular.module('starter.controllers', ['angular-simple-chat'])

    .service('MockMessagesService', MockMessagesService)
    .controller('DashCtrl', function($scope) {})

    .controller('ChatsCtrl', function($scope, Chats) {

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

    .controller('ChatBotController', function(MockMessagesService, $scope) {

        var vm = this;
        vm.messages=[];

        vm.you = {
            userId: '4562KDJYE72930DST283DFY202Dd',
            avatar: 'http://www.freelanceweb16.fr/wp-content/uploads/2015/08/Woman_Avatar.gif',
            userName: 'Anna'
        };

         ApiAIPlugin.requestText({
                   query: 'welcomemessageuser',
                   contexts: [{
                     "name": vm.you.userName,
                     "lifespan": 0
                   }],

                },
                function(response) {
                  console.log(response);
                    var welcomedata = JSON.parse(response.result.fulfillment.speech);
                    var welcomeText = 'Hello '+welcomedata.username+' '+welcomedata.speechText+' '+welcomedata.features;

                  speakSpeechText('Hello '+welcomedata.username+'how are you today?');

                  appendChatMsg('',welcomeText);
                },
                function(error) {
                  console.log("api ai connection error" + error);
                }
         );



        /*If we are going to save anything in firebase then we use below method to
         call firebase and fetch details of chat history for particular user*/

//        vm.messages = MockMessagesService.getMessages();?\

        vm.sendMessage = function(message) {
            console.log('sendMessage');
             console.log(message);
            sendText(message);
        };

        $scope.$on('simple-chat-message-posted', function() {
            console.log('onMessagePosted');
        });

        function appendChatMsg(newUserMsgObj, newBotMsgObj) {

            //            var newUserMsg = {
            //                id: '535d625f898df4e80e2a125e'+Math.random(),
            //                text: newUserMsgObj,
            //                userId: 'hilsqdhfods5990K226DHS01NOHoh',
            //                userName: 'Jean',
            //                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            //                date: '1455110273886'
            //            }

            var newBotMsg = {
                id: '535f13ffee3b2a68112b9fc0' + Math.random(),
                text: newBotMsgObj,
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110273886'
            }
            //         vm.messages.push(newUserMsg);
            vm.messages.push(newBotMsg);

            if ($scope.$$phase) {
                $scope.apply();
            }
        }
        ////////////////
        $scope.chatmsg = '';
        $scope.showFaq = false;

        $scope.sendMsg = function() {
            //$scope.showFaq=false;
            // console.log('you entered=' + $scope.chatmsg);
            sendText($scope.chatmsg);
        }

        function sendText(query_text) {
            try {
                ApiAIPlugin.requestText({
                        query: query_text.text
                    },
                    function(response) {
                        // place your result processing here
                        // alert(JSON.stringify(response));

                        console.log(response);

                        if (response.result.action === 'faq') {
                            $scope.showFaq = true;
                            $scope.showHistory = false;
                            $scope.data = JSON.parse(response.result.fulfillment.speech);
                            $scope.speechText = $scope.data.speechText;
                            $scope.botname = $scope.data.botname;
                            $scope.features = $scope.data.features;
                            speakSpeechText($scope.speechText);
                            appendChatMsg(query_text, $scope.speechText);
                            appendChatMsg(query_text, $scope.features);
                        }

                        else if (response.result.action === 'history') {
                            $scope.showHistory = true;
                            $scope.showFaq = false;
                            $scope.data = JSON.parse(response.result.fulfillment.speech);
                            $scope.uName = 'Abhijeet';
                            $scope.speechText = $scope.data.speechText;
                            $scope.portfolioDetail = $scope.data.portfolioDetails;
                            $scope.richText = $scope.data.richDataSrc;
                            speakSpeechText($scope.speechText);
                            appendChatMsg(query_text, $scope.speechText);
                            appendChatMsg(query_text, $scope.portfolioDetail);

                        }

                        else if(null!=response.result.fulfillment.speech && ''!=response.result.fulfillment.speech){

                            appendChatMsg(query_text,  response.result.fulfillment.speech);

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



    })

function speakSpeechText(speechText) {

    TTS.speak({
        text: speechText,
        locale: 'en-GB',
        rate: 0.75
    }, function() {
        alert(speechText);
    }, function(reason) {
        alert(reason);
    });

}

function MockMessagesService() {
    this.getMessages = getMessages;

    ////////////////

    function getMessages() {
        return [{
            id: '535d625f898df4e80e2a125e',
            text: 'Fotzu isoko vo adget ne uba in lup jedzow mi uvinifse epepo het ezezocic bahehufep lid pubuj.',
            userId: 'hilsqdhfods5990K226DHS01NOHoh',
            userName: 'Jean',
            avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            date: '1455110273886'
        }, {
            id: '535f13ffee3b2a68112b9fc0',
            text: 'Hu girucajam ifuolocag za nifjem ninze dak kadi wi zowolhim asa vouczu ci.',
            userId: '4562KDJYE72930DST283DFY202Dd',
            date: '1455110273886'
        }, {
            id: '546a5843fd4c5d581efa263a',
            text: 'Vad vo ujcofwag pelobhuz wonogmo cikutew imoissuv no doso jum govhi peva aj ven narzir gac rofbufubo il.',
            userId: 'hilsqdhfods5990K226DHS01NOHoh',
            userName: 'Jean',
            avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            date: '1455110173886'
        }, {
            id: '54764399ab43d1d4113abfd1',
            text: 'Meug viedeloh cuwmaheba gunhe din mif kub ec limvimil boik fuj peze za sow.',
            userId: '4562KDJYE72930DST283DFY202Dd',
            date: '1455110283886'
        }, {
            id: '547643aeab43d1d4113abfd2',
            text: 'Leeczo gokurus cif wepke nidji dabuti wi itco aduzab anru cev do surakip.',
            userId: 'hilsqdhfods5990K226DHS01NOHoh',
            userName: 'Jean',
            avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            date: '1455110483886'
        }, {
            id: '547815dbab43d1d4113abfef',
            text: 'Piazwac cah opovi cipril sonetpa da bobren teekiril fac ma attu wone piuba de ojeseki.',
            userId: '4562KDJYE72930DST283DFY202Dd',
            date: '1455110583886'
        }, {
            id: '547815dbaqsnod67892d4113abfef',
            text: 'Dubehtak re bodeju em parobji leunvil fetpok iwipog gibzi teb navibahul girofip hikfib ge.',
            userId: '4562KDJYE72930DST283DFY202Dd',
            date: '1455112283886'
        }]
    }
}