import clientPromise from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  let result = {};
  try {
    const client = await clientPromise;
    const db = client.db("capstoneReporting");


    let docscoresSis = await db
      .collection("sisScrapeCourses")
      .find({
        $or: [
          {
            studentID: { $regex: params.email, $options: "i" },
          },
        ],
      })
      .project({ _id: 0 })
      .toArray();

    // debugger;
    if (docscoresSis) {
      result = {
        data: { docscoresSis },
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