var app = angular.module('itunes');

app.service('itunesService', function($http, $q){

    this.getArtist = function(name) {
      var baseUrl = 'https://itunes.apple.com/search?term=';
      return $http({
        method: "JSONP",
        url: baseUrl + name + '&callback=JSON_CALLBACK'
      })
    }

});
