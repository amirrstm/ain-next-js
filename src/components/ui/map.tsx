'use client'

import clsx from 'clsx'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRef } from 'react'
import MapComponent from 'react-map-gl'

import type React from 'react'

type Props = { children?: React.ReactNode; className?: string }
const AppMap: React.FC<Props> = ({ children, className }) => {
  const mapRef = useRef(null)
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  return (
    <main className={clsx('relative h-[300px] overflow-hidden rounded-md sm:h-[700px]', className)}>
      <MapComponent
        initialViewState={{ latitude: 52.52, longitude: 13.405, zoom: 6 }}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        ref={mapRef}
        style={{ height: '100%' }}
      >
        {children}
      </MapComponent>
    </main>
  )
}

export default AppMap
