/*
Loading of data is delegated to the factory.

Added notification to assign ref of local array to factory array once data is loaded

*/

angular.module('greWords', ['naviBar']);

angular.
    module('greWords').
    component('greWords', {
        templateUrl: "pages/gre/gre.maintemplate.html",
        controller: greWordsController
    });

function greWordsController($http, greWordsFactory, naviBarFactory) {
    var self = this;
    
    //Loads menu
    naviBarFactory.raiseGreEvent();

    self.greData = [];
    self.greDataCurrent = [];
    greWordsFactory.greData = [];
    greWordsFactory.greDataCurrent = [];

    self.currentPage = 1;
    self.totalPages = 1;
    
    var updateGreData = function () {
        self.greData = greWordsFactory.greData;
        self.greDataCurrent = greWordsFactory.greDataCurrent;
        self.totalPages = Math.ceil(self.greData.length / 12);
    };

    greWordsFactory.registerObserverCallback(updateGreData);    
    
    greWordsFactory.loadGreData("grewords.json");
    

    self.loadDataForPage = function (pg) {
        if (pg >= 1 && pg <= Math.ceil(self.greData.length / 12)) {
            self.currentPage = pg;

            self.greDataCurrent = [];

            var start = (pg * 12) - 12;
            var end = pg * 12;
            for (var i = start; i < end; i++) {
                self.greDataCurrent.push(self.greData[i]);
            }
        }
    }

        
    
    $(document).on("click", ".box-frame", function () {
        var wordCover= $(this).find(".box-cover");
        var wordCoverVisible = wordCover.is(':visible');

        var wordDefinition = $(this).find(".box-definition");
        var wordDefinitionVisible = wordDefinition.is(':visible');

        if (wordCoverVisible === true) {
            wordCover.fadeOut();
            wordDefinition.fadeIn();
        }
        else {
            wordCover.fadeIn();
            wordDefinition.fadeOut();
        }
        
                
    });


    /*--------------------------------------Pagination button END----------------------*/
    
}

angular.module('greWords').factory('greWordsFactory', function ($http) {
    var obj = {};
    
    obj.greData = [];
    obj.greDataCurrent = [];

    obj.loadGreData = function (apicall) {        
        $http.get("pages/gre/" + apicall).
        //$http.get("http://alandias.azurewebsites.net/api/alan2").
        then(function (response) {
            //alert(response.data);
            obj.greData = [];
            obj.greData = response.data;            

            for (var i = 0; i < 12; i++) {
                obj.greDataCurrent.push(obj.greData[i]);
            }
            
            //Once you fill the data, reassign reference of local array to this array
            obj.notifyObservers();
        },
        function (error) {

        });

    }

    obj.loadGreDataCurrent = function (pg) {
        
        if (pg >= 1 && pg < (obj.greData.length )) {
            
            obj.greDataCurrent = [];

            var start = (pg * 12) - 12;
            var end = pg * 12;
            for (var i = start; i < end; i++) {
                obj.greDataCurrent.push(obj.greData[i]);
            }
        }

        
                
    }
    

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

