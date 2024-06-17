import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    if (!data)
      return NextResponse.json(
        { error: "Invalid credentials!, please try again" },
        { status: 400 }
      );

    const verify = await bcrypt.compare(password, data.password);
    if (!verify) throw new Error("Invalid credentials, please try again");

    const response = NextResponse.json(
      { message: "Login successfully!" },
      { status: 200 }
    );
    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    response.cookies.set("token", token);

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
