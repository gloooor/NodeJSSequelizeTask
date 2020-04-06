const Sequelize = require("sequelize");
const http = require("http");
const parser = require("url");
const fs = require("fs");
const sequelize = new Sequelize("LGP", "sa", "03042001loi", {
  dialect: "mssql",
  host: "localhost",
});
const {
  Faculty,
  Pulpit,
  Teacher,
  Subject,
  Auditorium_type,
  Auditorium,
} = require("./model").ORM(sequelize);
const port = 3000;

const message = (num, res) => {
  res.writeHead(404, {
    "Content-type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  });
  switch (num) {
    case 1:
      res.end(
        JSON.stringify({
          num: 1,
          message: `Данные успешно добавлены`,
        })
      );
      break;
    case 2:
      res.end(
        JSON.stringify({
          num: 2,
          message: `Данные успешно удалены`,
        })
      );
      break;
    case 3:
      res.end(
        JSON.stringify({
          num: 3,
          message: `Данные успешно изменены`,
        })
      );
      break;
  }
};

const error = (num, res) => {
  res.writeHead(404, {
    "Content-type": "application/json; charset=utf-8",
  });
  switch (num) {
    case 1:
      res.end(
        JSON.stringify({
          error: 1,
          message: `Данный метод не поддерживается`,
        })
      );
      break;
    case 2:
      res.end(
        JSON.stringify({
          error: 2,
          message: `Данный url не поддерживается`,
        })
      );
      break;
  }
};
const splitUrl = (str) => {
  let mas = str.split("/");
  return mas;
};
const splitWord = (word) => {
  let mas = word.split(" ");
  return mas;
};

const getDB = (table) => {
  return table.findAll();
};

const setDB = (table, body) => {
  table.create(body);
  console.log(`inserted`);
};

const updateDB = (table, body) => {
  let str = splitWord(table.toString())[1];
  table.update(body, { where: { [str]: `${body.table}` } });
};
const deleteDB = (table, id) => {
  id = decodeURI(id);
  let str = splitWord(table.toString())[1];
  table.destroy({ where: { [str]: `${id}` } });
};
const handler = (req, res) => {
  sequelize.authenticate().then(() => {
    console.log("connected");
    const url = splitUrl(parser.parse(req.url, true).pathname);
    let body = [];
    req.on("data", (data) => {
      body.push(data.toString());
    });

    switch (req.method) {
      case "GET":
        getReq(res, url);
        break;
      case "POST":
        postReq(req, res, url, body);
        break;
      case "PUT":
        putReq(req, res, url, body);
        break;
      case "DELETE":
        deleteReq(req, res, url, body);
        break;
      default:
        error(1, res);
    }
  });
};
const getReq = (res, url) => {
  if (!url[1]) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(fs.readFileSync(__dirname + "\\index.html"));
  } else if (url[1] === "api") {
    switch (url[2]) {
      case "faculties":
        getDB(Faculty).then((records) => {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify(records));
        });
        break;
      case "pulpits":
        getDB(Pulpit).then((records) => {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify(records));
        });
        break;
      case "subjects":
        getDB(Subject).then((records) => {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify(records));
        });
        break;
      case "auditoriumstypes":
        getDB(Auditorium_type).then((records) => {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify(records));
        });
        break;
      case "auditoriums":
        getDB(Auditorium).then((records) => {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify(records));
        });
        break;
      default:
        error(2, res);
        break;
    }
  } else {
    error(2, res);
  }
};

const postReq = (req, res, url, body) => {
  if (url[1] === "api") {
    switch (url[2]) {
      case "faculties":
        req.on("end", () => {
          body = JSON.parse(body);
          setDB(Faculty, body);
          message(1, res);
        });
        break;
      case "pulpits":
        req.on("end", () => {
          body = JSON.parse(body);
          setDB(Pulpit, body);
          message(1, res);
        });
        break;
      case "subjects":
        req.on("end", () => {
          body = JSON.parse(body);
          setDB(Subject, body);
          message(1, res);
        });
        break;

      case "auditoriumstypes":
        req.on("end", () => {
          body = JSON.parse(body);
          setDB(Auditorium_type, body);
          message(1, res);
        });
        break;

      case "auditoriums":
        req.on("end", () => {
          body = JSON.parse(body);
          setDB(Auditorium, body);
          message(1, res);
        });
        break;

      default:
        error(2, res);
        break;
    }
  } else {
    error(2, res);
  }
};
const putReq = (req, res, url, body) => {
  if (url[1] === "api") {
    switch (url[2]) {
      case "faculties":
        req.on("end", () => {
          body = JSON.parse(body);
          updateDB(Faculty, body);
          message(3, res);
        });
        break;
      case "pulpits":
        req.on("end", () => {
          body = JSON.parse(body);
          updateDB(Pulpit, body);
          message(3, res);
        });
        break;
      case "subjects":
        req.on("end", () => {
          body = JSON.parse(body);
          updateDB(Subject, body);
          message(3, res);
        });
        break;

      case "auditoriumstypes":
        req.on("end", () => {
          body = JSON.parse(body);
          updateDB(Auditorium_type, body);
          message(3, res);
        });
        break;

      case "auditoriums":
        req.on("end", () => {
          body = JSON.parse(body);
          updateDB(Auditorium, body);
          message(3, res);
        });
        break;

      default:
        error(2, res);
        break;
    }
  } else {
    error(2, res);
  }
};
const deleteReq = (req, res, url, body) => {
  if (url[1] === "api") {
    switch (url[2]) {
      case "faculties":
        req.on("end", () => {
          deleteDB(Faculty, url[3]);
          message(2, res);
        });
        break;
      case "pulpits":
        req.on("end", () => {
          deleteDB(Pulpit, url[3]);
          message(2, res);
        });
        break;
      case "subjects":
        req.on("end", () => {
          deleteDB(Subject, url[3]);
          message(2, res);
        });
        break;

      case "auditoriumstypes":
        req.on("end", () => {
          deleteDB(Auditorium_type, url[3]);
          message(2, res);
        });
        break;

      case "auditoriums":
        req.on("end", () => {
          deleteDB(Auditorium, url[3]);
          message(2, res);
        });
        break;

      default:
        error(2, res);
        break;
    }
  } else {
    error(2, res);
  }
};

const server = http.createServer();

server.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
server.on("error", (e) => {
  console.log(`${e.code} on http://localhost:${port}`);
});
server.on("request", handler);
