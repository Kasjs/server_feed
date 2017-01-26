rssReaderApp.factory('feedService', ['$http', '$rootScope', function($http, $rootScope) {
    var categories = [/*
    	{
    	categoryName: "News",
    	categoryFeeds: [ {id:0, title:'test'}, {id:0, title:'test'} ]
    	}
    */];
        feeds = [],
        feedCounter = 0;
    
    function getParsedFeed(url) {
        return $http.post('/getParsedFeed', {url: url}).then(function(responce) {
            console.log(responce.data);
                return responce.data;
            });        
    }

    function addFeedToCategoryList(categoryName, feedItem){
        var siteTitle = feedItem.feed[0].meta.title;         
        var categoryIndex = categories.findIndex(function(item){   
            return item.categoryName == categoryName;               
        });
        
        if(categoryIndex != -1){         
            var currFeed = categories[categoryIndex].categoryFeeds;
            var feedIndex = currFeed.findIndex(function(item){
                return item.feedTitle == feedItem.title; 
            });
            //console.log(feed, feedIndex, feedItem.title);
            if(feedIndex == -1){                
                currFeed.push({
                    feedId:feedCounter,
                    feedTitle:siteTitle,
                });
                feedsPushData(feedCounter, feedItem.feed)                
            }            
            
        } else {
            var currFeeds = [];
            currFeeds.push({ 
                feedId:feedCounter,
                feedTitle:siteTitle,
            });

            categories.push({
                categoryName: categoryName,
                categoryFeeds: currFeeds,
            });
            feedsPushData(feedCounter, feedItem.feed)            
        }        
        
        feedCounter++;        
        console.log(categories, feedCounter, feeds);            
        $rootScope.$broadcast('data_shared');
    }    

    function feedsPushData(feedCounter, entries){
        feeds.push({ 
            feedKey:feedCounter, 
            entries:entries 
        });
    }

    function getCategoryArray(){
        return categories;
    }    

    function getFeedById(id){   
        var feed = null;
        feeds.forEach(function(item, i, arr){
            if(item.feedKey == id){
                feed = item;
            }
        });
        return feed;
    }

    function getFeedEntryById(feedId, entryId){   
        var entry = feeds[feedId].entries[entryId];        
        return entry;
    }

    function removeFeedById(feedId){
        categories.forEach(function(item, i, arr){
            var cat = item.categoryFeeds;
            cat.splice(feedId,1);            
        });        
        
        feeds.splice(feedId, 1);
        //console.log(feeds, feedId, categories);
        //$rootScope.$broadcast('data_shared');
    }

    return {
        getParsedFeed         : getParsedFeed,        
        addFeedToCategoryList : addFeedToCategoryList,
        getCategoryArray      : getCategoryArray,       
        getFeedById           : getFeedById,
        getFeedEntryById      : getFeedEntryById,
        removeFeedById        : removeFeedById
    }
}])
