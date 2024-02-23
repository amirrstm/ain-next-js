'use client'

import clsx from 'clsx'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useRef } from 'react'
import Map from 'react-map-gl'

type Props = { children?: React.ReactNode; className?: string }
const AppMap: React.FC<Props> = ({ children, className }) => {
  const mapRef = useRef(null)
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  return (
    <main className={clsx('overflow-hidden relative rounded-md h-[300px] sm:h-[700px]', className)}>
      <Map
        ref={mapRef}
        style={{ height: '100%' }}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{ zoom: 6, latitude: 52.52, longitude: 13.405 }}
      >
        {children}
      </Map>
    </main>
  )
}

export default AppMap
