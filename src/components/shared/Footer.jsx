import React from "react";
import { PageContainer } from "@/components/shared/PageContainer";

export const Footer = () => {
  return (
    <div className="bg-slate-50 w-full h-16 mt-12">
      <PageContainer>
        <div className="w-full h-full px-6 flex justify-between items-center">
          <p className="font-bold text-slate-950">KKN 85 UAJY</p>
          <p className="text-sm text-slate-400 font-light">
            Copyright © 2024 | Panji Pusaka
          </p>
        </div>
      </PageContainer>
    </div>
  );
};
