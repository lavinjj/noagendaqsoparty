angular.module('noagendaqsoparty').factory('modelTransformer', function () {

    var transformObject = function (jsonResult, Constructor) {
        var model = new Constructor();
        model.id = jsonResult._id.$oid;
        angular.extend(model, jsonResult);
        return model;
    };

    var transformResult = function (jsonResult, Constructor) {
        if (angular.isArray(jsonResult)) {
            var models = [];
            angular.forEach(jsonResult, function (object) {
                models.push(transformObject(object, Constructor));
            });
            return models;
        } else {
            return transformObject(jsonResult, Constructor);
        }
    };

    var modelTransformer = {
        transform: transformResult
    };

    return modelTransformer;
});
