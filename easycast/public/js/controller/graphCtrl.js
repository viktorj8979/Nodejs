function GraphCtrl($scope, $filter, ngTableParams, Graph, Connection, $timeout){
	$scope.title = "Graph";
	var data;
	
	$scope.getConnectionList = function(){
		Connection.getList().$then(function(res){
			$scope.connections = res.data;
		});
	};
	$scope.getConnectionList();

	$scope.getList = function(){
		data = [];
		Graph.getList().$then(function(res){
			data = res.data;
			$scope.setTables();
		});
	};
	$scope.getList();

	$scope.setTables = function(){
		$scope.tableParams = new ngTableParams({
			page: 1,            // show first page
			total: data.length, // length of data
			count: 10,          // count per page
			sorting: {
				title: 'asc'     // initial sorting
			}
		});

		$scope.$watch('tableParams', function(params) {
			// use build-in angular filter
			var orderedData = params.sorting ? 
								$filter('orderBy')(data, params.orderBy()) :
								data;

			$scope.graphs = orderedData.slice((params.page - 1) * params.count, params.page * params.count);
		}, true);

	};

	
	
	$scope.showManageModal = function(index){
		console.log($scope.connections[0]._id);
		if (index == -1)
		{
			$scope.curGraph = {title: '', description: '', connection: $scope.connections[0]._id, type: '', query: '', filter_predefined: '', filter_ui: '', post_process: '', config: ''};
			$scope.newGraph = true;
		} else {
			$scope.curGraph = $scope.graphs[index];
			$scope.newGraph = false;
		}
		console.log($scope.curGraph);
		$('#manageModal').modal('show');
	};


	$scope.saveGraph = function(){
		console.log($scope.curGraph);
		if ( $scope.newGraph)
		{
			Graph.create($scope.curGraph);
		} else{
			Graph.update($scope.curGraph);
		}
		$('#manageModal').modal('hide');
		$scope.getList();
	};
	
	$scope.deleteGraph = function(){
		Graph.delete($scope.curGraph);
		$('#manageModal').modal('hide');
		$scope.getList();
	};

}