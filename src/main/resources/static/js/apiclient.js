apiclient = (function () {

    const path = "/blueprints";

    return {
        getBlueprintsByAuthor: function (authname, callback) {
            $.get(path + '/' + authname, function (data) {
                callback(data);
            });
        },

        getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {
            $.get(path + '/' + authname + '/' + bpname, function (data) {
                callback(data);
            });
        }
    };
})();