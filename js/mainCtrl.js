var app = angular.module('itunes');

app.controller('mainCtrl', function($scope, itunesService, $timeout){

  $scope.searchOptions = {
    "All": "",
    "Music": "song",
    "Movie": "feature-movie",
    "Podcast": "podcast",
    "TV Show": "tv-episode",
  }

  $scope.sortOptions = {
    'All': '',
    'Name': 'Song',
    'Artist': 'Artist',
    'Collection Name': 'Collection',
    'Type': 'Type'

  }
  $scope.sortPredicate = '';

  $scope.filterOptions = {
    filterText: '',
  }

  $scope.gridOptions = {
      data: 'songData',
      height: '110px',
      filterOptions: $scope.filterOptions,
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
      columnDefs: [
        {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'Collection', displayName: 'Album'},
        {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
        {field: 'Type', displayName: 'Type'},
        {field: 'SinglePrice', displayName: 'Single Price'},
        {field: 'CollectionPrice', displayName: 'Collection Price'},
      ]
  };

  $scope.findArtist = function() {
    itunesService.getArtist($scope.artist).then(function(response) {
      $scope.songData = response.data.results.map(function(item) {
        return {
          AlbumArt: item.artworkUrl100,
          Artist: item.artistName,
          Collection: item.collectionName,
          CollectionPrice: item.collectionPrice,
          Play: item.previewUrl,
          Type: item.kind,
          SinglePrice: item.trackPrice
        }
      });
      if ($scope.searchPredicate) {
        $scope.songData = $scope.songData.filter(function(item) {
          return (item.Type === $scope.searchPredicate);
        })
      }
    })
  }

 $scope.getSongData = function() {
   $scope.findArtist();
 }


});
