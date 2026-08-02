/**
 * SVG filter definitions mounted once in the marketing layout.
 *
 * `si-archive` is the maroon-to-cream duotone that unifies the phone-quality
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
            <feFuncR type="table" tableValues="0.4706 0.9804" />
            <feFuncG type="table" tableValues="0 0.9647" />
            <feFuncB type="table" tableValues="0.1412 0.9373" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
