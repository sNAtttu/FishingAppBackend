import BodyParser from "body-parser";
import Cors from "cors";
import Express from "express";
import { IMarker } from "./Interfaces/MapInterfaces";
import DataService from "./Utilities/DataService";

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

app.get("/markers/", (request, response) => {
  const dataService = new DataService();
  const sendResponse = (markers: IMarker[]) => response.send(markers);
  dataService.getMarkers(sendResponse);
});

app.post("/markers/", async (request, response) => {
  console.log(request.body);
  const dataService = new DataService();
  const sendResponse = (markerId: string) => response.send(markerId);
  try {
    console.log("Saving");
    await dataService.saveMarkerToDatabase(request.body, sendResponse);
    console.log("Done");
  } catch (e) {
    console.log(e);
    throw e;
  }
});

app.listen(port, () =>
  console.log("Backend of the cottage app is up and running " + port)
);
