"use client";
import React from "react";
import { NavbarDashboard } from "@/components/shared/dashboard/NavbarDashboard";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <NavbarDashboard />
      {children}
    </div>
  );
}
