/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/public/kids",
        destination: "https://api.kcisa.kr/openapi/API_CIA_085/request",
      },
      {
        source: "/api/public/pet",
        destination: "https://api.kcisa.kr/openapi/API_TOU_050/request", // 585번 API 주소
      },
    ];
  },
};

module.exports = nextConfig;
