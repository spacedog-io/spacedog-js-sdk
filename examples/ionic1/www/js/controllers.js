angular.module('starter.controllers', [])

.controller('AppCtrl', function() { })

.controller('TvShowsCtrl', function($scope) {
    
    SpaceDog.Data.search({type:"tvshow"}, function(err, data){
        $scope.tvshows = data.results;
        $scope.$apply(); // because we are out of the angular life cycle ! to avoid this, and for other reasons, it's better to refactor all SpaceDog calls in services. Services may take care of transforming objects, pagination, and so on. Sorry for sounding so paternating ... ! ^¨_^¨
    })

})

