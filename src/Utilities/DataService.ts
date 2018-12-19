import { MongoClient, MongoError } from "mongodb";
import { IMarker } from "../Interfaces/MapInterfaces";
export default class DataService {
  private databaseUrl: string = "mongodb://localhost:27017";
  private databaseName: string = "FishingSpotDb";
  private markerCollectionName: string = "markers";

  public getMarkers(sendResponse: (markers: IMarker[]) => void) {
    const client = new MongoClient(this.databaseUrl);
    client.connect(async (err) => {
      console.log("Connected successfully to database server");
      if (err) {
        console.log(err);
        throw err;
      }
      const db = client.db(this.databaseName);
      const deckCollection = db.collection(this.markerCollectionName);
      const allMarkers = await deckCollection.find({}).toArray();
      console.log("Got all cards from DB. Count " + allMarkers.length);
      client.close();
      sendResponse(allMarkers);
    });
  }

  public async saveMarkerToDatabase(
    marker: IMarker,
    sendResponseToClient: (result: string) => void
  ) {
    const client = new MongoClient(this.databaseUrl);
    console.log("Trying to connect to the database: " + this.databaseUrl);
    try {
      client.connect(async (err: MongoError) => {
        console.log("Connected successfully to database server");
        if (err) {
          console.log(err);
          throw err;
        }
        const db = client.db(this.databaseName);
        const markerCollection = db.collection(this.markerCollectionName);
        markerCollection.insertOne(marker, (error, result) => {
          if (error) {
            console.log("Error in inserting deck to database");
            throw error;
          }
          console.log("Insert result");
          console.log(JSON.stringify(result.insertedId));
          sendResponseToClient(String(result.insertedId));
        });
        client.close();
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
