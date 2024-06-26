/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //Copied from Stack overflow. DON'T TRUST!
  async redirects() {
    return [
      {
        source: "/account",
        source: "/",
        destination: "/account/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
