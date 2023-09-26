import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  let result = {};
  try {
    const client = await clientPromise;
    const db = client.db("capstoneReporting");
    let doc = await db
      .collection("attendance")
      .find({
        $or: [
          {
            email: { $regex: params.email, $options: "i" },
          },
        ],
      })
      .project({ _id: 0 })
      .toArray();

      let docscores = await db
      .collection("score")
      .find({
        $or: [
          {
            email: { $regex: params.email, $options: "i" },
          },
        ],
      })
      .project({ _id: 0 })
      .toArray();

    // debugger;
    if (doc) {
      result = {
        data: { doc, docscores },
        error: null,
      };
    } else {
      result = {
        data: {},
        error: null,
      };
    }
  } catch (exception) {
    //debugger;
    const result = {
      data: {},
      error: "An error occured on the server, please contact the admin!",
    };
  }
  return NextResponse.json(result);
}
