"use client";
import React, { useState, useEffect, memo } from "react";
import { SwiperCarousel } from "@/components/shared/home/Swiper";
import { PageContainer } from "@/components/shared/PageContainer";
import { Home } from "@/components/home/Home";
import { getAllBerita } from "@/lib/firestore";
import { Footer } from "@/components/shared/Footer";
import { getExternalNews } from "@/lib/constants";

export default function HomePage() {
  const [berita, setBerita] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [external, setExternal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBerita("berita");
      const dataAgenda = await getAllBerita("agenda");
      setAgenda(dataAgenda);
      setBerita(data.reverse());
    };

    const fetchExternal = async () => {
      const data = await getExternalNews("hiburan");
      setExternal(data);
    };

    Promise.all([fetchData(), fetchExternal()]);
  }, []);

  return (
    <div>
      <SwiperCarousel />
      <PageContainer>
        <HomeCompenent berita={berita} external={external} agenda={agenda} />
      </PageContainer>
      <Footer />
    </div>
  );
}

const HomeCompenent = memo(function HomeCompenent({
  berita,
  external,
  agenda,
}) {
  return <Home berita={berita} external={external} agenda={agenda} />;
});
