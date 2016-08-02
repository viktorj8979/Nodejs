function LayoutCtrl($scope, $filter, ngTableParams, Layout, $timeout){
	$scope.title = "Layout";
	var data;
	
	$scope.getList = function(){
		data = [];
		Layout.getList().$then(function(res){
			console.log(res.data);
			data = res.data;
			$scope.layouts =  data;
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

			$scope.layouts = orderedData.slice((params.page - 1) * params.count, params.page * params.count);
		}, true);

	};

	
	
	$scope.showManageModal = function(index){
		if (index == -1)
		{
			$scope.curLayout = {title: '', file: ''};
			$scope.newLayout = true;
		} else {
			$scope.curLayout = $scope.layouts[index];
			$scope.newLayout = false;
		}
		console.log($scope.curLayout);
		$('#manageModal').modal('show');
	};


	$scope.saveLayout = function(){
		if ( $scope.newLayout)
		{
			Layout.create($scope.curLayout);
		} else{
			Layout.update($scope.curLayout);
		}
		$scope.getList();
		$('#manageModal').modal('hide');
	};
	
	$scope.deleteLayout = function(){
		Layout.delete($scope.curLayout);
		$scope.getList();
		$('#manageModal').modal('hide');
	};

}