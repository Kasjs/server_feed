'use strict';

//News feed controller
rssReaderApp.controller('FeedLayoutCtrl', ['$scope','$stateParams','$location','feedService', function($scope, $stateParams,$location, feedService){
    $scope.category = $stateParams.cat;

    $scope.removeFeedById = function(){
        //console.log('sadf');
        feedService.removeFeedById($scope.category);
        $location.path('dashboard');
    }

}])

//News feed controller
rssReaderApp.controller('FeedListCtrl', ['$scope','$stateParams', 'feedService', function($scope, $stateParams, feedService){

    $scope.category = $stateParams.cat;
    var feed  = feedService.getFeedById($stateParams.cat);
    if(feed.length != 0){
        $scope.news = feed.entries;
        //console.log($scope.news);
    }
}])

//Single page controller
rssReaderApp.controller('SingleNewsCtrl', ['$scope','$stateParams','feedService', function($scope, $stateParams, feedService){
    console.log($stateParams);
    var entry = feedService.getFeedEntryById($stateParams.cat, $stateParams.entry);
    if(entry.length != 0){
        $scope.single = entry;
        //console.log(entry);
    }
}])

//Sidebar page controller
rssReaderApp.controller('SidebarCtrl', ['$scope','$rootScope', 'feedService', function($scope, $rootScope, feedService){
    $scope.titles = [];
    $rootScope.$on('data_shared', function(){
        $scope.titles = feedService.getCategoryArray();
    })
}])

//Dashboard page controller
rssReaderApp.controller('DashboardCtrl', ['$scope', '$rootScope', '$location', 'feedService', function($scope, $rootScope, $location, feedService){
    $scope.feed = '';
    $scope.getFeedArticle = function() {
        feedService.getParsedFeed($scope.feedLink)
            .then(function(res){
                feedService.getSavedFeed(res, res.feed[0].meta.title);
        });
    }

}])
