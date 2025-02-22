"use client";
import React from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { TableAgenda } from "@/components/agenda/TableAgenda";

export default function AgendaPage() {
  return (
    <PageContainer>
      <TableAgenda />
    </PageContainer>
  );
}
