var Module = (function () {
  // Private variables
  var auth;
  var bp;
  var puntos = [];
  let firstTime = false;

  const apiOpt = true;

  let api = apiOpt ? apiclient : apimock;

  // Private method to access private variable
  function changeName() {
    author = document.getElementById("author").value;
    $("#author2").text(author + "'s blueprints: ");
  }

  var fun = function (list) {
    if (!Array.isArray(list)) {
      list = JSON.parse(list);
    }

    console.info(list);

    const blueprints = list.map(function (bp) {
      return { author: bp.author, points: bp.points.length, name: bp.name };
    });

    $("#blueprints").find("td").remove();

    blueprints.map(function (bp) {
      var row =
        "<tr><td>" +
        bp.name +
        "</td><td>" +
        bp.points +
        '</td><td><button class="btn btn-primary" onclick="Module.getBlueprint(\'' +
        bp.author +
        "', '" +
        bp.name +
        "')\">Open</button></td></tr>";
      $("#blueprints").append(row);
    });

    var totalPoints = list.reduce(function (total, bp) {
      return total + bp.points.length;
    }, 0);

    $("#totalPoints").text(totalPoints);
  };

  function setList(author) {
    changeName();
    api.getBlueprintsByAuthor(author, fun);
  }

  var drawBlueprint = function (blueprintToDraw) {
    if (!Array.isArray(blueprintToDraw)) {
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
      puntos.push(point);
    });

    ctx.stroke();
  };

  function getBlueprint(author, bpname) {
    $("#blueprint_name").text(bpname);
    auth = author;
    bp = bpname;
    puntos = [];
    api.getBlueprintsByNameAndAuthor(author, bpname, drawBlueprint);
  }

  function clicks() {
    // Obtener el elemento canvas y su contexto
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Evento cuando se presiona el botón del mouse
    canvas.addEventListener("mousedown", (e) => {
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;
      puntos.push({ x, y });
    });
    // Evento cuando se mueve el mouse
    canvas.addEventListener("mousemove", (e) => {
      if (e.buttons !== 1) return; // Verificar si el botón izquierdo del mouse está presionado
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;
      puntos.push({ x, y });
      dibujarPuntos();
    });

    function dibujarPuntos() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      for (let i = 0; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x, puntos[i].y);
        ctx.stroke();
      }
    }
  }

  // Functions for update a blueprint
  function update() {
    if (firstTime) {
        firstTime = false;
        return $.ajax({
              url: "/blueprints",
              type: "POST",
              data: JSON.stringify({ author: document.getElementById("author").value, points: [], name: bp }),
              contentType: "application/json",
        }).then(function() {
            alert("Blueprint created and updated");
            return setList(author);
        });
    } else {
        return $.ajax({
            url: "/blueprints/" + auth + "/" + bp,
            type: "PUT",
            data: JSON.stringify({ author: auth, points: puntos, name: bp }),
            contentType: "application/json",
        }).then(func = () => {
            alert("Blueprint updated");
            setList(auth);  // blueprint's list updated
        });
    }
  }

   // Function for create a new blueprint
  function create(){
    var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bp = prompt("Please enter the blueprint name");
    if (bp != null) {
        firstTime = true;
    }
  }

  // Public method that allows updating a private variable
  return {
    changeName: changeName,
    setList: setList,
    getBlueprint: getBlueprint,
    clicks: clicks,
    update: update,
    create: create
  };
})();
