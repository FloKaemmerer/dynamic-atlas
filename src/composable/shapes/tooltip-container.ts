import Konva from 'konva'

export function getTooltipContainer(height: number) {
  return new Konva.Rect({
    fill: '#000',
    width: 250,
    height,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 0,
    opacity: 0.75,
    visible: false,
  })
}
