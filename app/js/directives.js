rssReaderApp.directive('loading', ['$http', function ($http) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.isLoading = function () {
          return $http.pendingRequests.length > 0;
        };
        scope.$watch(scope.isLoading, function (value) {
          if (value) {
            element.removeClass('ng-hide');
          } else {
            element.addClass('ng-hide');
          }
        });
      }
    };
}]);


rssReaderApp.directive('listItem', function () {
  return {
    element: 'E',
        replace: true,
        scope: {
            item: '=',
            catId: '@cat',
            entry: '@key',
            type: '@'
        },
        templateUrl: function(elem, attr){
            return 'templates/directive-item-'+attr.type+'.html';
        }
  }
});