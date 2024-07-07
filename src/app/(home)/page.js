"use client";
import React, { useState, useEffect, memo } from "react";
import { SwiperCarousel } from "@/components/shared/home/Swiper";
import { PageContainer } from "@/components/shared/PageContainer";
import { Home } from "@/components/home/Home";
import { getAllBerita } from "@/lib/firestore";
import { Footer } from "@/components/shared/Footer";
import { getExternalNews } from "@/lib/constants";
import { DataPenduduk } from "@/components/shared/home/DataPenduduk";

export default function HomePage() {
  const [berita, setBerita] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [external, setExternal] = useState(null);
  const [padukuhan, setPadukuhan] = useState([]);
  const [struktur, setStruktur] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBerita("berita");
      const dataAgenda = await getAllBerita("agenda");
      const dataPadukuhan = await getAllBerita("data-padukuhan");
      const dataStruktur = await getAllBerita("profil");
      setAgenda(dataAgenda);
      setBerita(data.reverse());
      setPadukuhan(dataPadukuhan.reverse());
      setStruktur(dataStruktur);
    };

    const fetchExternal = async () => {
      const data = await getExternalNews("hiburan");
      setExternal(data);
    };

    Promise.all([fetchData(), fetchExternal()]);
  }, []);

  const dataStruktur = struktur.find((data) => data.id === "struktur") ?? null;

  return (
    <div>
      <SwiperCarousel />
      <PageContainer>
        <DataPenduduk datas={padukuhan} />
        <HomeCompenent
          berita={berita}
          external={external}
          agenda={agenda}
          struktur={dataStruktur}
        />
      </PageContainer>
      <Footer />
    </div>
  );
}

const HomeCompenent = memo(function HomeCompenent({
  berita,
  external,
  agenda,
  struktur,
}) {
  return (
    <Home
      berita={berita}
      external={external}
      agenda={agenda}
      struktur={struktur}
    />
  );
});
