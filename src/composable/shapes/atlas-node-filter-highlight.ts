import Konva from 'konva'

export function getFilterHighlight(id: string, atlasNodePoint: { x: number; y: number }) {
  return new Konva.Circle({
    id,
    x: atlasNodePoint.x,
    y: atlasNodePoint.y,
    fill: '#ff0000',
    shadowEnabled: true,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOpacity: 1,
    radius: 20,
    opacity: 0,
  })
}
