type NetworkInformation = { saveData?: boolean };

let cachedCpuProbe: boolean | null = null;

/**
 * A small, bounded capability calibration for costs the platform APIs do not
 * expose (most importantly CPU throttling and old desktop cores). On an M4 it
 * takes ~7ms; the 4× QA profile takes ~27ms. Failing the probe selects the
 * complete static island before Three, Draco, a canvas, or a pin is mounted.
 *
 * BUDGET (raised from 10ms, 2026-08-09). The probe measures the machine's
 * CURRENT contention, not its capability, and 10ms sat far too close to a
 * capable machine's clean time. Measured on this M4: 6.9ms and 8.7ms idle —
 * but a background production build, or instrumentation, or simply a browser
 * with real tabs open, pushed it past 10ms and silently served the static
 * island to a machine entirely able to run the scene. That failure is invisible
 * (there is no error, just no world), so it was costing real visitors the
 * centrepiece for no reason. 18ms still sits well clear of the 27ms throttled
 * profile the gate exists to exclude, while tolerating ordinary load.
 */
const CPU_PROBE_BUDGET_MS = 18;

function cpuCanDecodeRichScene(): boolean {
  if (cachedCpuProbe !== null) return cachedCpuProbe;
  const start = performance.now();
  let checksum = 0;
  for (let index = 0; index < 2_000_000; index += 1) {
    checksum = (checksum + index) % 1_000_003;
  }
  // Keep the loop observable without leaking a debug global.
  cachedCpuProbe =
    checksum === 21 && performance.now() - start <= CPU_PROBE_BUDGET_MS;
  return cachedCpuProbe;
}

/** Shared capability probe for expensive visual layers. */
export function allowsRichVisuals(minWidth: number): boolean {
  if (window.innerWidth < minWidth) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;

  const nav = navigator as Navigator & {
    connection?: NetworkInformation;
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4)
    return false;
  return cpuCanDecodeRichScene();
}
