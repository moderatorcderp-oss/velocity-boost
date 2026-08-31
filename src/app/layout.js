// src/app/layout.js
import {
  Lato,
  Rubik,
  Fraunces,
  Inter,
  JetBrains_Mono,
  Bricolage_Grotesque,
} from "next/font/google";
import Script from "next/script";
import { Partytown } from "@builder.io/partytown/react";
import "./globals.css";

// import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";
import ServerPing from "@/components/ServerPing";

import ConditionalAuthProvider from "@/app/conditionalprovider";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Navbar2 from "@/components/Common/Navbar2";
// --- Font Setup ---
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const rubik = Rubik({
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

// --- Constants ---
const GTM_ID = "GTM-MB68QM2V";
const FB_PIXEL_ID = "3414178115554916";
const AHREFS_KEY = "4r3vxTcyxECWaXnhKBGH5g"; //4r3vxTcyxECWaXnhKBGH5g

// Verification metadata (kept here as it's typically site-wide)
//new ahref added
export const metadata = {
  verification: {
    google: "KRKFsO9AAW2a8qImif8Wj4uzzjmWGA0R6o7IZFJcmPo",
    other: {
      "ahrefs-site-verification":
        "4070e6d7714dfaee0c76bc5ff82e1a124b5fccc37316e2b02ff78d8560fac756",// new code
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${rubik.variable} ${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${bricolage.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        <Partytown
          debug={false}
          forward={["fbq"]}
          lib="/~partytown/"
        />

        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="theme-color" content="#1a365d" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msvalidate.01" content="9ACF89BD41333B26F8C154D46FDD8E5D" />
      </head>
      <body className={`body bg-black`}>
        {/* GTM noscript fallback */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        {/* Optional Server Ping */}
        {process.env.NEXT_PUBLIC_ENABLE_PING === "true" && <ServerPing />}
        {/* <BackgroundAnimation />  */}
        {/* Static Components */}
        <CallAdvisorsStrip />
        <Navbar2 />
        <Marquee />

        {/* Client-Side Wrapper */}
        <ConditionalAuthProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ConditionalAuthProvider>

        <div className="app-footer">
          <Footer />
        </div>


        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        {/* Facebook Pixel - Offloaded to Web Worker */}
        <Script
          id="facebook-pixel"
          type="text/partytown"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* ✅ FIXED: Ahrefs WITHOUT Partytown (API routes don't work in web workers) */}
        <Script
          id="ahrefs-analytics"
          src="/api/ahrefs"
          data-key={AHREFS_KEY}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
