'use strict';

angularApp
    .controller('socketController', function ($scope, SocketService) {

        $scope.stompClient = null;
        $scope.endPoint = '/ws';
        $scope.sendEndpoint = '/app/secured/chat';
        $scope.subscribeEndpoint = '/secured/history';
        $scope.elems = {
            connect: 'connect',
            from: 'from',
            text: 'text',
            disconnect: 'disconnect',
            conversationDiv: 'conversationDiv',
            response: 'response'
        };

        $scope.connect = function (context) {
            $scope.endPoint = '/ws';
            $scope.endPoint = context + $scope.endPoint ;
            $scope.stompClient = SocketService.connect($scope.endPoint, $scope.elems);
        };

        $scope.subscribe = function () {
            $scope.stompClient.subscribe($scope.subscribeEndpoint, function (msgOut) {
                SocketService.messageOut(JSON.parse(msgOut.body), $scope.elems);
                console.log("OnMessage------"+JSON.parse(msgOut.body));
            });
        };

        $scope.disconnect = function () {
            SocketService.disconnect($scope.elems, $scope.stompClient);
        };

        $scope.sendMessage = function () {
            SocketService.sendMessage( $scope.elems, $scope.stompClient, $scope.sendEndpoint);
        };
    });