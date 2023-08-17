import Konva from 'konva'

export function getTooltipBaseText() {
  return new Konva.Text({
    text: '',
    fontSize: 16,
    fontFamily: '"Roboto", sans-serif',
    fill: '#fff8e1',
    width: 250,
    padding: 20,
    align: 'center',
    visible: false,
  })
}
