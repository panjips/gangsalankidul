"use client";
import React from "react";
import { HomeNavbar } from "@/components/shared/home/HomeNavbar";

export default function HomeLayout({ children }) {
  return (
    <div >
      <HomeNavbar />
      {children}
    </div>
  );
}
