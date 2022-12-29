"use client";

import { useState } from "react";
import { MobileColumnAnimation } from "components/column/mobile/MobileColumnAnimation";
import { MobileOpenColumn } from "components/column/mobile/MobileOpenColumn";
import { ProtectedRoute } from "components/routing/ProtectedRoute";
import { PrimaryColumn } from "components/column/primary-column/PrimaryColumn";
import { AppContext } from "components/context/AppContext";

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileColumnOpen, setMobileColumnOpen] = useState(false);

  return (
    <ProtectedRoute>
      <AppContext>
        <div className="flex h-screen bg-zinc-900">
          {/* Desktop */}
          <div className="flex h-screen py-2">
            <div className="hidden overflow-y-auto md:block md:w28">
              <PrimaryColumn />
            </div>
          </div>

          {/* Mobile */}
          <MobileColumnAnimation
            columnOpen={mobileColumnOpen}
            setColumnOpen={setMobileColumnOpen}
          >
            <PrimaryColumn />
          </MobileColumnAnimation>

          <div className="relative grow flex flex-col h-screen">
            <MobileOpenColumn setColumnOpen={setMobileColumnOpen} />
            <div className="flex-auto">{children}</div>
          </div>
        </div>
      </AppContext>
    </ProtectedRoute>
  );
}
