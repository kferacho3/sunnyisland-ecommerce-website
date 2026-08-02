/**
 * SVG filter definitions mounted once in the marketing layout.
 *
 * `si-archive` is the warm sepia duotone that unifies the phone-quality
 * kitchen photography into archive material (creative direction §6). Values
 * from the research audit's gradient-map recipe.
 */
export function BrandFilters() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="si-archive" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            {/* Warm near-black → amber. The previous maroon→cream ramp put
                magenta in the midtones, which read as hot pink against the
                dark ground rather than as archive material. */}
            <feFuncR type="table" tableValues="0.055 0.949" />
            <feFuncG type="table" tableValues="0.031 0.671" />
            <feFuncB type="table" tableValues="0.020 0.353" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
