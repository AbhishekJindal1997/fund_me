import { db } from "./config";
import { collection } from "firebase/firestore";

// establishing a connection to specific collection

// connection to Capmaigns collection
export const campaingsCollectionRef = collection(db, "Campaigns");

// connection to Campaigns sub collection
