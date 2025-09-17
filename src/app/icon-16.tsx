import { ImageResponse } from 'next/og'

export const size = { width: 16, height: 16 }
export const contentType = 'image/png'

export default function Icon16() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 12,
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '3px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        FD
      </div>
    ),
    { ...size }
  )
}
