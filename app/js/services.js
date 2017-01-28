rssReaderApp.factory('feedService', ['$http', '$rootScope','$timeout', function($http, $rootScope, $timeout) {
    var categories = [];
        feeds = [],
        feedCounter = 0;

    function getParsedFeed(url) {
        return $http.post('/getParsedFeed', {url: url}).then(function(responce) {
            console.log(responce.data);
                return responce.data;
            });
    }

    function getSavedFeed(entries, title) {
        return $http.post('/addFeed', {entries: entries, title: title })
            .then(function(res) {
                console.log("response in getSavedFeed:", res);
                return res;
                addFeedToCategoryList(categoryName, res);
            },
            function(error) {
                console.log('Can not get saved feed');
            })
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
        $rootScope.$broadcast('data_shared');
    }

    function feedsPushData(feedCounter, entries){
        // $timeout(getSavedFeed(siteTitle, entries), 4000);
        feeds.push({
            feedKey:feedCounter,
            entries:entries
        });
        console.log('Feeds: ', feeds);
        console.log('Categories: ', categories);
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

    return {
        getParsedFeed         : getParsedFeed,
        addFeedToCategoryList : addFeedToCategoryList,
        getCategoryArray      : getCategoryArray,
        getFeedById           : getFeedById,
        getFeedEntryById      : getFeedEntryById,
        getSavedFeed          : getSavedFeed
    }
}])
