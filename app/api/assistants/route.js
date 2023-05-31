import { NextResponse } from "next/server";
import clientPromise from "../../utils/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("eventsPage");
  if (client) {
    const data = await db.collection("assistants").find({}).toArray();
    if (data) {
      return NextResponse.json(data, {
        headers: {
          "Access-Control-Allow-Origin":
            "https://next-events-hyppouicf-karin210.vercel.app",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      });
    }
    return res.status(404).send({ message: "Data not found" });
  }
}

export async function POST(req, res) {
  const client = await clientPromise;
  const db = client.db("eventsPage");
  const json = await req.json();

  if (client) {
    const exist = await db.collection("assistants").findOne(json);
    console.log(exist);
    if (!exist) {
      await db.collection("assistants").insertOne(json);
      return NextResponse.json(
        {
          message: "Successful registration. Enjoy your event!",
          status: 201,
        },
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://next-events-hyppouicf-karin210.vercel.app",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          },
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "email already registered!",
          status: 504,
        },
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://next-events-hyppouicf-karin210.vercel.app",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          },
        }
      );
    }
  }
}

// export async function POST(req, res) {
//   const client = await clientPromise;
//   const db = client.db("eventsPage");
//   const json = await req.json();

//   if (client) {
//     const exist = await db.collection("assistants").findOne(json);
//     console.log(exist);
//     if (!exist) {
//       await db.collection("assistants").insertOne(json);
//       return NextResponse.json(
//         {
//           message: "Successful registration. Enjoy your event!",
//           status: 201,
//         }
//         // {
//         //   headers: {
//         //     "Access-Control-Allow-Origin":
//         //       "https://next-events-hyppouicf-karin210.vercel.app",
//         //     "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//         //   },
//         // }
//       );
//     } else {
//       return NextResponse.json(
//         {
//           message: "email already registered!",
//           status: 504,
//         }
//         // {
//         //   headers: {
//         //     "Access-Control-Allow-Origin":
//         //       "https://next-events-hyppouicf-karin210.vercel.app",
//         //     "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//         //   },
//         // }
//       );
//     }
//   }
// }
