import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { defaultItems } from "@/lib/items";

const DB_NAME = "gatherly";
const COLLECTION_NAME = "gatherings";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Auto-seed with defaultItems if collection is empty
    const count = await collection.countDocuments();
    if (count === 0) {
      const itemsToInsert = defaultItems.map((item) => ({
        ...item,
        createdAt: new Date(),
      }));
      await collection.insertMany(itemsToInsert);
    }

    const items = await collection.find({}).sort({ date: 1 }).toArray();

    const sanitizedItems = items.map((item) => {
      const { _id, ...rest } = item;
      return {
        ...rest,
        id: rest.id || _id.toString(),
      };
    });

    return NextResponse.json({ success: true, items: sanitizedItems });
  } catch (error) {
    console.error("MongoDB GET /api/items error:", error);
    return NextResponse.json(
      { success: false, items: defaultItems, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, category, location, date, price, accent, icon, id } = body;

    if (!title || !description || !location || !date || price === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const newItem = {
      id: id || `gathering-${crypto.randomUUID()}`,
      title,
      description,
      category,
      location,
      date,
      price: Number(price),
      accent: accent || "sage",
      icon: icon || "✳",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newItem);

    return NextResponse.json(
      { success: true, item: { ...newItem, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    console.error("MongoDB POST /api/items error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

