import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  let result = {};
  try {
    const client = await clientPromise;
    const db = client.db("capstoneReporting");
    let doc = await db
      .collection("attendance")
      .aggregate([
        {
          $group: {
            _id: {
              email: "$email",
              name: "$name",
              instructor: "$instructor",
              course: "$course",
              classtime: "$classtime",
            },
          },
        },
      ])
      .toArray();
      

    // debugger;
    if (doc) {
      result = {
        data: { ...doc },
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
