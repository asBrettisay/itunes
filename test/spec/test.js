describe('itunes', function() {

  beforeEach(module('itunes'));

  var controller, scope, itunesService, ngGrid, $q;
  beforeEach(inject(function($rootScope, _itunesService_, $controller, _$q_, $httpBackend) {
    $q = _$q_;
    scope = $rootScope.$new();
    itunesService = _itunesService_;
    controller = $controller('mainCtrl', { $scope: scope });
    httpBackend = $httpBackend;

  }))

  describe('mainCtrl', function() {



    it('should find artist with itunesService', function(done) {
      var testValue = {
                        data: {
                          results: {
                          artworkUrl100: 'someUrl',
                          artistName: 'Beach Dudes',
                          collectionName: 'Beach it up',
                          collectionPrice: '$999,999,999.99',
                          previewUrl: 'somePreviewUrl',
                          kind: 'song'
                        }
                        }
                      };
      var resultValue = {
                          AlbumArt: 'someUrl',
                          Artist: 'Beach Dudes',
                          Collection: 'Beach it up',
                          CollectionPrice: '$999,999,999.99',
                          Play: 'somePreviewUrl',
                          Type: 'song'
                        }
      $q.when(testValue);
      spyOn(itunesService, 'getArtist').and.returnValue(testValue);

      scope.artist = "Beach Dudes"
      scope.findArtist();
      done();
      expect(scope.songData).toEqual(resultValue)
    })

    it('should invoke findArtist', function() {
      spyOn(scope, 'findArtist');
      scope.findArtist();
      expect(scope.findArtist).toHaveBeenCalled();
    })

  })

  describe('itunesService', function() {
    var test = {name: "Beach Dudes"};
    it('should get an artist from a name', function(done) {
      httpBackend.whenJSONP('https://itunes.apple.com/search?term=beachdudes&callback=JSON_CALLBACK').respond(test);
      itunesService.getArtist('beachdudes').then(function(response) {
        expect(response).toEqual(test)
      })
    })


  })
})
