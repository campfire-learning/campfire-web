"use client";

import { useState } from "react";
import { MobileColumnAnimation } from "components/column/mobile/MobileColumnAnimation";
import { MobileOpenColumn } from "components/column/mobile/MobileOpenColumn";
import { ProtectedRoute } from "components/routing/ProtectedRoute";
import { PrimaryColumn } from "components/column/primary-column/PrimaryColumn";
import { AppContext } from "components/context/AppContext";

export default function InstitutionLayout({ children }: { children: React.ReactNode }) {
  const [mobileColumnOpen, setMobileColumnOpen] = useState(false);

  return (
    <ProtectedRoute>
      <AppContext>
        <div className="flex h-screen bg-zinc-900">
          {/* Desktop */}
          <div className="flex h-screen py-2">
            <div className="md:w28 hidden overflow-y-auto md:block">
              <PrimaryColumn />
            </div>
          </div>

          {/* Mobile */}
          <MobileColumnAnimation columnOpen={mobileColumnOpen} setColumnOpen={setMobileColumnOpen}>
            <PrimaryColumn />
          </MobileColumnAnimation>

          <div className="relative flex h-screen grow flex-col">
            <MobileOpenColumn setColumnOpen={setMobileColumnOpen} />
            <div className="flex-auto">{children}</div>
          </div>
        </div>
      </AppContext>
    </ProtectedRoute>
  );
}
