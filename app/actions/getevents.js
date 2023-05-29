import clientPromise from "../utils/mongodb";

export default async function getevents() {
  const client = await clientPromise;
  const db = client.db("eventsPage");
  if (client) {
    const data = await db.collection("events").find({}).toArray();
    if (data) {
      return data;
    }
    return res.status(404).send({ message: "Data not found" });
  }
}
