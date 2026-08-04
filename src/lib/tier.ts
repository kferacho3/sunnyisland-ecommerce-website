type NetworkInformation = { saveData?: boolean };

let cachedCpuProbe: boolean | null = null;

/**
 * A small, bounded capability calibration for costs the platform APIs do not
 * expose (most importantly CPU throttling and old desktop cores). On an M4 it
 * takes ~7ms; the 4× QA profile takes ~28ms. Failing the probe selects the
 * complete static island before Three, Draco, a canvas, or a pin is mounted.
 */
function cpuCanDecodeRichScene(): boolean {
  if (cachedCpuProbe !== null) return cachedCpuProbe;
  const start = performance.now();
  let checksum = 0;
  for (let index = 0; index < 2_000_000; index += 1) {
    checksum = (checksum + index) % 1_000_003;
  }
  // Keep the loop observable without leaking a debug global.
  cachedCpuProbe = checksum === 21 && performance.now() - start <= 18;
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
