/*
Loading of data is delegated to the factory.

Added notification to assign ref of local array to factory array once data is loaded

*/

angular.module('naviBar', ['greWords']);

angular.
    module('naviBar').
    component('naviBar', {
        templateUrl: "js/navibar.template.html",
        controller: naviBarController
    });

function naviBarController($http, $location, naviBarFactory, greWordsFactory) {
    var self = this;
    
    //required for bootstrap submenu to work
    $(function () {
        $('[data-submenu]').submenupicker();
                
    });

    //register Event for when GRE Page loads.  Gre page should raise this event when loaded
    naviBarFactory.addGreEvent(function () {
        self.ifgre = true;
    });
    

    self.runFrankenstein = function () {
        //alert("Hi");
        greWordsFactory.greData = [];
        greWordsFactory.greDataCurrent = [];
        //greWordsFactory.loadGreData("grewords2.json");
        greWordsFactory.loadGreData("vlistwords");
    };
    
    

}

angular.module('naviBar').factory('naviBarFactory', function ($http) {
    var obj = {};
            
    obj.greEvent = function () { };
    obj.addGreEvent = function (cb) { obj.greEvent = cb; };
    obj.raiseGreEvent = function () { obj.greEvent(); };

    /*---------------------------------------Notification---------------------------------------*/
    obj.observerCallbacks = [];

    //register observer
    obj.registerObserverCallback = function (callback) {
        obj.observerCallbacks.push(callback);
    };

    //notify observers
    obj.notifyObservers = function () {
        console.log(this);

        angular.forEach(obj.observerCallbacks, function (callback) {
            console.log('notification');
            callback();
        });
    };
    /*---------------------------------------Notification End-----------------------------------*/

    return obj;
});

