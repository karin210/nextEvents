import { NextResponse } from "next/server";
import clientPromise from "../../utils/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("eventsPage");
  if (client) {
    const data = await db.collection("events").distinct("Date.month");
    if (data) {
      return NextResponse.json(data);
    }
    return res.status(404).send({ message: "Data not found" });
  }
}
