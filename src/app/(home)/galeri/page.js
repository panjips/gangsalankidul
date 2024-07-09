"use client";
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { Galeri } from "@/components/galeri/Galeri";
import { getAllBerita } from "@/lib/firestore";

export default function GaleriPage() {
  const [datas, setData] = useState([]);
  const [galeri, setGaleri] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const datas = await getAllBerita("berita");
      const galeri = await getAllBerita("galeri");
      setData(datas);
      setGaleri(galeri);
    }
    fetchData();
  }, []);

  return (
    <>
      <PageContainer>
        <Galeri dataBerita={datas} dataGaleri={galeri} />
      </PageContainer>
    </>
  );
}
