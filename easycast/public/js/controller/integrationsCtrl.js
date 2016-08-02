function IntegrationsCtrl($scope, $filter, ngTableParams, Layout, $timeout){
	$scope.title = "Integration";
  $scope.datas = [
  	{
  		logo: 'integration/air_icon.png',
  		title: 'Airbrake',
  		content: 'Error monitoring and handling.'
  	},
  	{
  		logo: 'integration/app_icon.png',
  		title: 'App Review Monitor',
  		content: 'App Stroe reviews delivered to Slack.'
  	},
  	{
  		logo: 'integration/appear_icon.png',
  		title: 'appear.in',
  		content: 'Video conferences in your browser.'
  	},
  	{
  		logo: 'integration/appsignal_icon.png',
  		title: 'AppSignal',
  		content: 'Detailed metrics for Ruby on Rails apps.'
  	},
  	{
  		logo: 'integration/asana_icon.png',
  		title: 'Asana',
  		content: 'Communications and task management for teams.'
  	}
  ];
}