import clientPromise from "../../../../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  let result = {};
  //console.log(params);
  try {
    const client = await clientPromise;
    const db = client.db("capstoneReporting");
    let doc = await db
      .collection("score")
      .find({
        $and: [
          {
            instructor: { $regex: params.tutor, $options: "i" },
            course: { $regex: params.course, $options: "i" },
            classtime: { $regex: params.time, $options: "i" },
          },
        ],
      })
      .project({ _id: 0 })
      .toArray();
    //console.log(doc)
    // debugger;
    if (doc) {
      result = {
        data: { doc },
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
