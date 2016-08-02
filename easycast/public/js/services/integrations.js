easycast.factory('Layout', function ($resource, $rootScope, $http) {
	
	return {
		
		getList : function() { return $resource('/api/v1.0/layout/list').query();},

		create: function(layout){return $resource('/api/v1.0/layout/list').save(layout, function(res){
			console.log(res);
		});},

		update: function(layout){
			console.log("Updating", layout.title);
			return $resource('/api/v1.0/layout/:id',  {}, {update: {method: 'PUT'}}).update({id: layout._id}, layout, function(res){
				console.log(res);
			});
		},

		delete: function(layout){
						console.log("Deleting", layout.title);
			return $resource('/api/v1.0/layout/:id').delete({id: layout._id}, function(res){
				console.log(res);
			});
		}
		
	}

});