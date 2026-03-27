import type { Graphics as PixiGraphics } from "pixi.js";
import { COLORS, ISO_TILE_W, ISO_TILE_H } from "./palette";
import { toIso, isoTile, isoBox } from "./isoUtils";

const TILE_COLORS = [
  COLORS.tileWood1,
  COLORS.tileWood2,
  COLORS.tileWood3,
  COLORS.tileWood4,
];

export function drawFloor(
  g: PixiGraphics,
  cols: number,
  rows: number,
  originX: number,
  originY: number
): void {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const p = toIso(c, r, originX, originY);
      const color = TILE_COLORS[(r * 5 + c * 3) % TILE_COLORS.length];
      isoTile(g, p.x, p.y, ISO_TILE_W, ISO_TILE_H, color);
      // Plank grain lines
      g.moveTo(p.x - ISO_TILE_W / 4, p.y - 2);
      g.lineTo(p.x + ISO_TILE_W / 4, p.y - 2);
      g.stroke({ color: COLORS.tileGrain, alpha: 0.15, width: 1 });
      g.moveTo(p.x - ISO_TILE_W / 4 + 7, p.y + 3);
      g.lineTo(p.x + ISO_TILE_W / 4 + 7, p.y + 3);
      g.stroke({ color: COLORS.tileGrain, alpha: 0.12, width: 1 });
    }
  }
}

const WALL_HEIGHT = 72;

export function drawWalls(
  g: PixiGraphics,
  cols: number,
  rows: number,
  originX: number,
  originY: number
): void {
  // Back wall (along row=0)
  for (let c = 0; c < cols; c++) {
    const p = toIso(c, 0, originX, originY);
    const wx = p.x - ISO_TILE_W / 4;
    const wy = p.y - ISO_TILE_H / 4;
    isoBox(g, wx, wy, ISO_TILE_W / 2 + 2, ISO_TILE_H / 2, WALL_HEIGHT,
      COLORS.wallFaceIso, COLORS.wallLeftIso, COLORS.wallRightIso);
    g.moveTo(wx - ISO_TILE_W / 4 - 1, wy);
    g.lineTo(wx, wy + ISO_TILE_H / 4);
    g.lineTo(wx, wy + ISO_TILE_H / 4 + 5);
    g.lineTo(wx - ISO_TILE_W / 4 - 1, wy + 5);
    g.closePath();
    g.fill({ color: COLORS.baseboard });
  }
  // Left wall (along col=0)
  for (let r = 0; r < rows; r++) {
    const p = toIso(0, r, originX, originY);
    const wx = p.x - ISO_TILE_W / 4;
    const wy = p.y - ISO_TILE_H / 4;
    isoBox(g, wx, wy, ISO_TILE_W / 2 + 2, ISO_TILE_H / 2, WALL_HEIGHT,
      COLORS.wallFaceIso, COLORS.wallLeftIso + 0x040404, COLORS.wallRightIso - 0x040404);
    g.moveTo(wx, wy + ISO_TILE_H / 4);
    g.lineTo(wx + ISO_TILE_W / 4, wy);
    g.lineTo(wx + ISO_TILE_W / 4, wy + 5);
    g.lineTo(wx, wy + ISO_TILE_H / 4 + 5);
    g.closePath();
    g.fill({ color: COLORS.baseboard });
  }
}

export function drawRug(
  g: PixiGraphics,
  centerCol: number,
  centerRow: number,
  originX: number,
  originY: number
): void {
  const p = toIso(centerCol, centerRow, originX, originY);
  isoTile(g, p.x, p.y, ISO_TILE_W * 4.5, ISO_TILE_H * 4.5, COLORS.rugCenter, 0.16);
  isoTile(g, p.x, p.y, ISO_TILE_W * 3.5, ISO_TILE_H * 3.5, COLORS.rugMiddle, 0.10);
  isoTile(g, p.x, p.y, ISO_TILE_W * 2.5, ISO_TILE_H * 2.5, COLORS.rugOuter, 0.06);
}
