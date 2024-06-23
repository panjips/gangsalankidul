"use client";
import React, { memo, useState, useEffect } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { Profil } from "@/components/profil/Profil";
import { Footer } from "@/components/shared/Footer";
import { getAllBerita } from "@/lib/firestore";

export default function ProfilPage() {
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBerita("profil");
      setCollectionData(data.reverse());
    };
    fetchData();
  }, []);

  return (
    <>
      <PageContainer>
        <ProfilCompenent data={collectionData} />
      </PageContainer>
      <Footer />
    </>
  );
}

const ProfilCompenent = memo(function ProfilCompenent({ data }) {
  return <Profil data={data} />;
});
