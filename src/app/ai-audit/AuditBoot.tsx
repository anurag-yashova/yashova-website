"use client";

import { useEffect } from "react";

/** Re-wires the audit app after client-side navigation (the script itself
 *  only auto-runs on first load; wireForm is guarded against double-wiring). */
export default function AuditBoot() {
  useEffect(() => {
    const w = window as unknown as { __audit?: { wireForm?: () => void } };
    w.__audit?.wireForm?.();
  }, []);
  return null;
}
