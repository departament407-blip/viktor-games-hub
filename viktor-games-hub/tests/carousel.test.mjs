import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const source = readFileSync(
  new URL("../src/features/club/carousel.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2022 },
}).outputText;
const { carouselOffset, wrapIndex } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
test("all ten games can become the unique centre with exactly two visible neighbours", () => {
  for (let active = 0; active < 10; active++) {
    const offsets = Array.from({ length: 10 }, (_, i) =>
      carouselOffset(i, active, 10),
    );
    assert.equal(offsets[active], 0);
    assert.equal(offsets.filter((x) => x === 0).length, 1);
    assert.deepEqual(
      offsets.filter((x) => Math.abs(x) <= 1).sort(),
      [-1, 0, 1],
    );
    assert.equal(offsets[wrapIndex(active - 1, 10)], -1);
    assert.equal(offsets[wrapIndex(active + 1, 10)], 1);
  }
});
test("empty, one, two and three-game catalogs remain finite and wrap in both directions", () => {
  assert.equal(wrapIndex(-1, 0), 0);
  assert.equal(carouselOffset(0, 0, 1), 0);
  for (const count of [1, 2, 3]) {
    assert.equal(wrapIndex(-1, count), count - 1);
    assert.equal(wrapIndex(count, count), 0);
    for (let active = 0; active < count; active++)
      assert.equal(
        Array.from({ length: count }, (_, i) =>
          carouselOffset(i, active, count),
        ).filter((x) => x === 0).length,
        1,
      );
  }
});
