import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { username, password } = await req.json();
  try {
    let data = null;
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (!doc.id) return;
      data = { id: doc.id, ...doc.data() };
    });

    if (data)
      return NextResponse.json(
        { error: "User has registered" },
        { status: 400 }
      );

    const encrypted = await bcrypt.hash(password, 10);

    await addDoc(collection(db, "users"), {
      username,
      password: encrypted,
    });

    return NextResponse.json(
      { message: "Success created account" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
