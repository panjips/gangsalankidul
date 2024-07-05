"use client";
import React from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { TableDataPadukuhan } from "@/components/data-padukuhan/TableDataPadukuhan";

export default function Page() {
  return (
    <PageContainer>
      <TableDataPadukuhan />
    </PageContainer>
  );
}
