/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  images: { qualities: [75, 80, 85] },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
    ] }];
  },
};
export default config;
