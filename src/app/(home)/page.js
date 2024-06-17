"use client";
import React, { useState, useEffect } from "react";
import { SwiperCarousel } from "@/components/shared/home/Swiper";
import { PageContainer } from "@/components/shared/PageContainer";
import { Home } from "@/components/home/Home";
import { getAllBerita } from "@/lib/firestore";
import { Footer } from "@/components/shared/Footer";

export default function HomePage() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBerita("berita");
      setBerita(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <SwiperCarousel />
      <PageContainer>
        <Home berita={berita} />
      </PageContainer>
      <Footer />
    </div>
  );
}
