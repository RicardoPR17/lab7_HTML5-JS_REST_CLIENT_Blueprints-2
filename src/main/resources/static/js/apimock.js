//@author hcadavid

apimock = (function () {

	var mockdata = [];

	mockdata["johnconnor"] = [{ author: "johnconnor", "points": [{ "x": 150, "y": 120 }, { "x": 215, "y": 115 }], "name": "house" },
	{ author: "johnconnor", "points": [{ "x": 340, "y": 240 }, { "x": 15, "y": 215 }], "name": "gear" }];
	mockdata["maryweyland"] = [{ author: "maryweyland", "points": [{ "x": 140, "y": 140 }, { "x": 115, "y": 115 }], "name": "house2" },
	{ author: "maryweyland", "points": [{ "x": 140, "y": 140 }, { "x": 115, "y": 115 }], "name": "gear2" }];
	mockdata["Lina"] = [{ author: "Lina", "points": [{ "x": 140, "y": 140 }, { "x": 115, "y": 115 }, { "x": 115, "y": 115 }], "name": "bpname" }];
	mockdata["Mario"] = [{ author: "Mario", "points": [{ "x": 150, "y": 150 }, { "x": 165, "y": 165 }], "name": "bpname1" },
	{ author: "Mario", "points": [{ "x": 200, "y": 200 }, { "x": 200, "y": 200 }], "name": "bpname3" },
	{
		author: "Mario", "points": [{ "x": 100, "y": 300 }, { "x": 150, "y": 100 }, { "x": 200, "y": 300 }, { "x": 175, "y": 200 }, { "x": 125, "y": 200 }],
		"name": "LetterA"
	}];
	mockdata["Luis"] = [{ author: "Luis", "points": [{ "x": 114, "y": 114 }, { "x": 111, "y": 111 }], "name": "bpname2" }];

	return {
		getBlueprintsByAuthor: function (authname, callback) {
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {

			callback(
				mockdata[authname].find(function (e) { return e.name === bpname })
			);
		}
	}

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/