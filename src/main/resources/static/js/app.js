var Module = (function () {
    // Private variables
    var author;

    const apiOpt = true;

    let api = apiOpt ? apiclient : apimock;

    // Private method to access private variable
    function changeName() {
        author = document.getElementById("author").value;
        $("#author2").text(author + "'s blueprints: ");
    }

    var fun = function (list) {
        if (!(Array.isArray(list))) {
            list = JSON.parse(list);
        }

        console.info(list);

        const blueprints = list.map(function (bp) {
            return { author: bp.author, points: bp.points.length, name: bp.name };
        });

        $("#blueprints").find("td").remove();

        blueprints.map(function (bp) {
            var row = '<tr><td>' + bp.name + '</td><td>' + bp.points + '</td><td><button class="btn btn-primary" onclick="Module.getBlueprint(\'' +
                bp.author + '\', \'' + bp.name + '\')">Open</button></td></tr>';
            $("#blueprints").append(row);
        });


        var totalPoints = list.reduce(function (total, bp) {
            return total + bp.points.length;
        }, 0);

        $("#totalPoints").text(totalPoints);

    }

    function setList(author) {
        changeName();
        api.getBlueprintsByAuthor(author, fun);
    }

    var drawBlueprint = function (blueprintToDraw) {
        if (!(Array.isArray(blueprintToDraw))) {
            blueprintToDraw = JSON.parse(blueprintToDraw);
        }

        console.info(blueprintToDraw);

        var blueprint = blueprintToDraw;

        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 3;

        blueprint.points.forEach(function (point, index) {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });

        ctx.stroke();
    }

    function getBlueprint(author, bpname) {
        $("#blueprint_name").text(bpname);
        api.getBlueprintsByNameAndAuthor(author, bpname, drawBlueprint);
    }

    // Public method that allows updating a private variable
    return {
        changeName: changeName,
        setList: setList,
        getBlueprint: getBlueprint
    }

    var nClicks = 0;
    function totalClicks(){
        nClicks++;
        $("#clicks").text(nClicks);
    }


})();