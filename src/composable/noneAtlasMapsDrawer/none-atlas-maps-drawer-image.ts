import Konva from 'konva'
import { noneAtlasMapsDrawerCanvasPoint } from '@/composable/noneAtlasMapsDrawer/none-atlas-maps-drawer-point'

export function getNoneAtlasMapsDrawerKonvaImage(noneAtlasMapsDrawerImage: HTMLImageElement) {
  return new Konva.Image({
    id: 'none-atlas-maps-drawer',
    image: noneAtlasMapsDrawerImage,
    x: noneAtlasMapsDrawerCanvasPoint.x,
    y: noneAtlasMapsDrawerCanvasPoint.y,
  })
}
