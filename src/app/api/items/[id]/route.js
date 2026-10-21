import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { defaultItems } from "@/lib/items";

const DB_NAME = "gatherly";
const COLLECTION_NAME = "gatherings";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    let item = await collection.findOne({ id });

    if (!item) {
      item = defaultItems.find((d) => d.id === id);
    }

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Gathering not found" },
        { status: 404 }
      );
    }

    const { _id, ...rest } = item;
    return NextResponse.json({
      success: true,
      item: { ...rest, id: rest.id || (_id ? _id.toString() : id) },
    });
  } catch (error) {
    console.error("MongoDB GET /api/items/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: true, message: "Gathering removed" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gathering deleted successfully",
    });
  } catch (error) {
    console.error("MongoDB DELETE /api/items/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

