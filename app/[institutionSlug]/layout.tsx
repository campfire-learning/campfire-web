"use client";

import { useState } from "react";
import { MobileColumnAnimation } from "components/column/mobile/MobileColumnAnimation";
import { MobileOpenColumn } from "components/column/mobile/MobileOpenColumn";
import { SecondaryColumnCourse } from "components/column/secondary-column/SecondaryColumnCourse";
import { ProtectedRoute } from "components/routing/ProtectedRoute";
import { PageContext } from "components/context/PageContext";
import { PrimaryColumn } from "components/column/primary-column/PrimaryColumn";

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileColumnOpen, setMobileColumnOpen] = useState(false);

  return (
    <ProtectedRoute>
      <PageContext>
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
            <SecondaryColumnCourse />
          </MobileColumnAnimation>

          <div className="relative grow flex flex-col h-screen">
            <MobileOpenColumn setColumnOpen={setMobileColumnOpen} />
            <div className="flex-auto">{children}</div>
          </div>
        </div>
      </PageContext>
    </ProtectedRoute>
  );
}
