"use client";

import Script from "next/script";

export default function KakaoAdFit() {
  return (
    <div className="flex justify-center py-8 my-8 border-t border-white/10">
      <div className="w-full max-w-[320px]">
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit="DAN-ghFI97WpfouINFuQ"
          data-ad-width="320"
          data-ad-height="100"
        />
        <Script
          async
          src="//t1.daumcdn.net/kas/static/ba.min.js"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}
