import Konva from 'konva'
import type { Point } from '@/model/point'

export function getFilterHighlightWedge(point: Point, totalNumberOfWedges: number, rotationIndex: number, color: string) {
  return new Konva.Wedge({
    x: point.x,
    y: point.y,
    radius: 20,
    angle: 360 / totalNumberOfWedges,
    fill: color,
    stroke: 'black',
    strokeWidth: 1,
    rotation: 360 / totalNumberOfWedges * rotationIndex,
  })
}
