import BodyParser from "body-parser";
import Cors from "cors";
import Express from "express";

const app: Express.Express = Express();
const port: number = 3001;

app.use(Cors());

app.use(
  BodyParser.urlencoded({
    extended: false
  })
);
app.use(BodyParser.json());

app.get("/", (request, response) => {
  response.send("Up and running");
});

app.listen(port, () =>
  console.log("Backend of the cottage app is up and running " + port)
);
