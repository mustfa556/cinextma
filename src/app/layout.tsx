import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Poppins } from "@/utils/fonts";
import "../styles/globals.css";
import Providers from "./providers";
import TopNavbar from "@/components/ui/layout/TopNavbar";
import BottomNavbar from "@/components/ui/layout/BottomNavbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import Disclaimer from "@/components/ui/overlay/Disclaimer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/utils/helpers";
import Script from "next/script";

export const metadata: Metadata = {
  title: siteConfig.name,
  applicationName: siteConfig.name,
  description: siteConfig.description,
  manifest: "/manifest.json",
  icons: {
    icon: siteConfig.favicon,
  },
  twitter: {
    card: "summary",
    title: {
      default: siteConfig.name,
      template: siteConfig.name,
    },
    description: siteConfig.description,
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: {
      default: siteConfig.name,
      template: siteConfig.name,
    },
    description: siteConfig.description,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0C0F" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* ✅ Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2627988096866482"
          crossOrigin="anonymous"
        ></script>

        {/* ✅ Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="RdURBeCCCPWS5l2PDhYe3rbVYrnDhgaiIV2sEY9qCfs"
        />

        {/* ✅ Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XGGRPXZ5FS"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XGGRPXZ5FS');
          `}
        </Script>

        {/* ✅ Matomo Analytics */}
        <Script id="matomo" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://indexapnetlifyapp.matomo.cloud/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src='https://cdn.matomo.cloud/indexapnetlifyapp.matomo.cloud/matomo.js'; 
              s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>

        {/* ✅ Adstreat Ads Script */}
        <Script
          id="adstreat"
          strategy="afterInteractive"
          src="//cattleforcedlit.com/76/37/f6/7637f684be4d11f9e9fb6ff422bd5143.js"
        />
      </head>
      <body
        className={cn(
          "min-h-screen select-none bg-background antialiased",
          Poppins.className
        )}
      >
        <Providers>
          <Disclaimer />
          <TopNavbar />
          <Sidebar>
            <main className="container mx-auto max-w-full px-3 pb-8 pt-8 sm:px-5">
              {children}
            </main>
          </Sidebar>
          <BottomNavbar />
        </Providers>
        <SpeedInsights debug={false} />
        <Analytics debug={false} />
      </body>
    </html>
  );
        }
