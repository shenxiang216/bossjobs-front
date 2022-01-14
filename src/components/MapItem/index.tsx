import { Map, Marker } from 'react-amap'
interface Props {
  data: { longitude: number; latitude: number }
}
export default function MapItem(props: Props) {
  return (
    <div style={{ width: '100%', height: '200px' }}>
      <Map
        amapkey={'0dd8d9f741f2d323ac4e725b1de13bda'}
        center={props.data}
        scrollWheel={true}
        zoom={15}
      >
        <Marker position={props.data} />
      </Map>
    </div>
  )
}
