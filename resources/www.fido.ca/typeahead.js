console.log( "loading js" );

var ls 	= angular.module( 'ute.ui', [ 'ngCookies', 'ngAnimate', 'ngSanitize',
		'ui.bootstrap' ]);

ls.filter('to_trusted', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(text);
      };
    })

ls.controller('typeAheadCtrl', function ($scope, $http, $cookies, $attrs, $element) {
		console.log( ">>typeAheadCtrl" );
      $scope.results = {};
      $scope.results.quicklinks = [];
      $scope.results.links = [];
		$scope.init		= false;

		var dimensionNames	= [ "RelatedSearch_2_EN_D", "RelatedSearch_EN_D", "RelatedSearch_FR_D" ];	  
	  
      // Set default max results to show
      $scope.max = {
        results: 5,
        quicklinks: 5
      };

      $scope.criteria = '';

      $scope.css = {
        formClass: ''
      };

      // load the end service for type ahead and end point for search from the html
      $scope.urls = {
        service: $attrs.configService,
        search: angular.element('#' + $attrs.id).find('form').attr('action')
      };

      // What Dimension search value should we use?
      $scope.dimensionName = $attrs.configDimension;
      console.log($scope.dimensionName);

      // Set the default user language and province
      $scope.user = {
        language: 'EN',
        province: 'ON'
      };

      // Overwrite the default values if available
      if ($cookies.get('language')) {
        $scope.user.language = $cookies.get('language').toUpperCase();
      }
      if ($cookies.get('province')) {
        $scope.user.province = $cookies.get('province').toUpperCase();
      }
	  
	  // work around for Endeca not knowing that Language_D represents the language
	  var nValue	= "2484452033";
	  if( $scope.user.language == "FR" ){
		  nValue	= "1743600704";
	  }

      // Helper to build the url for the service calls
      $scope.getServiceUrl = function () {
		return $scope.urls.service + '&Ntt=' + $scope.criteria + '*&Dr=AND(Language_D:' + $scope.user.language + ',Province:' + $scope.user.province + ')&N=' + nValue;
      };

      // Central method to clear results from scope
      $scope.clearResults = function () {
		  console.log( ">> clearResults" );
        $scope.results.links = [];
        $scope.results.quicklinks = [];
        $scope.css.formClass = '';
      };

      $scope.onBlur = function () {
			console.log( ">> onBlur" );
			window.setTimeout( $scope.clearResults(), 1000 );
      };
	  
	  $scope.onMouseDownRelated = function( url ){
			window.location.assign( window.location.protocol + "//" + window.location.hostname + $scope.urls.search + "?q=" + url ) ;
	  }
	  $scope.onMouseDownQuick = function( url ){
			window.location.assign( url );
	  }

      $scope.$watch('criteria', function (newValue, oldValue) {
		console.log( newValue.length );
		if( $scope.init ){
			if ( newValue.length > 2) {
			  $http.get($scope.getServiceUrl()).then(function (response) {
				// Clear the existing results
				$scope.clearResults();
				for (var i = 0; i < response.data.typeaheadmainContent[0].contents[0].autoSuggest[0].dimensionSearchGroups.length; i++) {
				  var dim = response.data.typeaheadmainContent[0].contents[0].autoSuggest[0].dimensionSearchGroups[i];

				  if (dimensionNames.indexOf( dim.dimensionName ) > -1 ) {
					$scope.results.links = dim.dimensionSearchValues;
					$scope.max.links = response.data.typeaheadmainContent[0].contents[0].autoSuggest[0].maxDim1Results;
				  } else {
					var limit = response.data.typeaheadmainContent[0].contents[0].autoSuggest[0]['maxDim' + ( i + 1 ) + 'Results'];
					var selection = dim.dimensionSearchValues.splice(0, limit);
					$scope.results.quicklinks = $scope.results.quicklinks.concat(selection);
				  }

				}
				if( $scope.results.links ){
					if (($scope.results.links.length + $scope.results.quicklinks.length) > 0 ) {
					  $scope.css.formClass = 'rui-ngtypeahead-open';
					}
				}
			  }, function (response) {
				console.log('error');
			  });
			} else {
			  $scope.clearResults();
			}
		} else {
			$scope.init = true;
		}
      });

    });

ls
.config(function($controllerProvider, $provide) {
	ls.controllerProvider = $controllerProvider;
	ls.provide            = $provide;
	try {
		ls.controllerProvider.register('CTRL_DEVICE_DETAIL',
				ctrlDeviceDetail);
	} catch (e) {
		console
				.log(" exception while regestring controler : CTRL_DEVICE_DETAIL");
	}

	try {
		// ls.controller('deviceController', deviceController);
		ls.controllerProvider.register('deviceController',
				deviceControllerFunction);
	} catch (e) {
		console
				.log(" exception while regestring controler : CTRL_DEVICE_DETAIL");
	}

});

	console.log( "Javascript completed" );
	