"use client";
import React, { useState, useEffect } from "react";
import { UbahBerita } from "@/components/berita/UbahBerita";
import { getBerita } from "@/lib/firestore";
import { getFile } from "@/lib/storage";
import { PageContainer } from "@/components/shared/PageContainer";

export default function Page({ params }) {
  const { id } = params;
  const [value, setValue] = useState({});
  const [updateValue, setUpdateValue] = useState(value);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBerita(id);
      setValue(data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setUpdateValue(value);
  }, [value]);

  return (
    <PageContainer>
      <UbahBerita
        value={value}
        setValue={setValue}
        setUpdateValue={setUpdateValue}
        updateValue={updateValue}
      />
    </PageContainer>
  );
}
