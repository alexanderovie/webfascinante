import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
        }}
      >
        <div
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          FD
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
