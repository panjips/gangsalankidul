"use client";
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { Berita } from "@/components/berita/Berita";
import { Footer } from "@/components/shared/Footer";
import { getAllBerita } from "@/lib/firestore";

export default function Page() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBerita("berita");
      setBerita(data.reverse());
    };
    fetchData();
  }, []);

  return (
    <div>
      <PageContainer>
        <Berita berita={berita} />
      </PageContainer>
      <Footer />
    </div>
  );
}
