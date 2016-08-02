biInterface.factory('Graph', function ($resource, $rootScope, $http) {
	
	return {
		
		getList : function() { return $resource('/api/v1.0/graph/list').query();},

		create: function(graph){return $resource('/api/v1.0/graph/list').save(graph, function(res){
			console.log(res);
		});},

		update: function(graph){
			console.log("Graph Updating", graph.connection);
			return $resource('/api/v1.0/graph/:id',  {}, {update: {method: 'PUT'}}).update({id: graph._id}, graph, function(res){
				console.log(res);
			});
		},

		delete: function(graph){
			return $resource('/api/v1.0/graph/:id').delete({id: graph._id}, function(res){
				console.log(res);
			});
		}
		
	}

});