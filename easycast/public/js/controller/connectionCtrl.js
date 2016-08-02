function ConnectionCtrl($scope, $filter, ngTableParams, Connection, $timeout){
	$scope.title = "Connection";
	var data;
	
	$scope.getList = function(){
		data = [];
		Connection.getList().$then(function(res){
			console.log(res.data);
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

			$scope.connections = orderedData.slice((params.page - 1) * params.count, params.page * params.count);
		}, true);

	};

	
	
	$scope.showManageModal = function(index){
		if (index == -1)
		{
			$scope.curConnection = {title: '', type: '', dsn: '', username: '', password: ''};
			$scope.newConnection = true;
		} else {
			$scope.curConnection = $scope.connections[index];
			$scope.newConnection = false;
		}
		$('#manageModal').modal('show');
	};

	$scope.saveConnection = function(){
		if ( $scope.newConnection)
		{
			Connection.create($scope.curConnection);
		} else{
			Connection.update($scope.curConnection);
		}
		$scope.getList();
		$('#manageModal').modal('hide');
	};
	
	$scope.deleteConnection = function(){
		Connection.delete($scope.curConnection);
		$scope.getList();
		$('#manageModal').modal('hide');
	};

}