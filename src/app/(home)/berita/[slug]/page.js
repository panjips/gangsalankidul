"use client";
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { deslugify } from "@/lib/constants";
import { getBeritaByJudul } from "@/lib/firestore";
import { DetailBerita } from "@/components/berita/DetailBerita";
import { Footer } from "@/components/shared/Footer";
import { StaggeredFadeLoader } from "@/components/shared/StaggeredFadeLoader";

export default function DetailPage({ params }) {
  const { slug } = params;
  const [berita, setBerita] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBeritaByJudul(slug);
      setBerita(data);
    };
    fetchData();
  }, [slug]);

  return (
    <div>
      <PageContainer>
        {berita === null ? (
          <div className="h-dvh flex justify-center items-center">
            <StaggeredFadeLoader />
          </div>
        ) : (
          <DetailBerita berita={berita} />
        )}
      </PageContainer>
      <Footer />
    </div>
  );
}
