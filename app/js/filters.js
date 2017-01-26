rssReaderApp.filter('renderHTMLCorrectly', function($sce){
	return function(stringToParse){
		return $sce.trustAsHtml(stringToParse);
	}
});

rssReaderApp.filter('regex', [function() {
    return function(str) {
        var patt = new RegExp("src=[\'\"](.*?)[\'\"]","i"),
            txt = patt.exec(str);
        if(txt === null) {
            txt = '/img/phones/dell-streak-7.0.jpg';
        } else {
            txt = txt[1];
        }
        return txt;
    };
}]);

rssReaderApp.filter('parseDate', [function(){
    return function(date) {
        return new Date(date);
    }
}]);
