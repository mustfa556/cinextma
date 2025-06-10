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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn("min-h-screen select-none bg-background antialiased", Poppins.className)}>
        {/* Plausible analytics scripts */}
        <Script
          defer
          data-domain="index-voxinappindexcom.vercel.app"
          src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
          strategy="afterInteractive"
        />
        <Script
          id="plausible-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function () {
                (window.plausible.q = window.plausible.q || []).push(arguments)
              }
            `,
          }}
        />
        
        {/* Your app content */}
        <Providers>
          <Disclaimer />
          <TopNavbar />
          <Sidebar>
            <main className="container mx-auto max-w-full px-3 pb-8 pt-8 sm:px-5">{children}</main>
          </Sidebar>
          <BottomNavbar />
        </Providers>
        
        {/* Other scripts */}
        <SpeedInsights debug={false} />
        <Analytics debug={false} />

        {/* ---> ✅ Adsterra Ad Code <--- */}
        <Script
          strategy="lazyOnload"
          src="//pl26884849.profitableratecpm.com/8e/a0/bb/8ea0bb0c08c7fa7d75b809cdabd2c25b.js"
        />
        
      </body>
    </html>
  );
}
