//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#5e4526" d="M3,3H21V21H3V3M5,5V19H19V5H5Z" /></svg>
import { h } from 'vue'

export default () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
}, [
  h('path', {
    fill: '#5e4526',
    d: 'M3,3H21V21H3V3M5,5V19H19V5H5Z',
  }),
])
