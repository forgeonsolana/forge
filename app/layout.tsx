import type React from "react"
import "@/app/globals.css"
import { Press_Start_2P } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
})

export const metadata = {
  title: "FORGE - Your Tokens. Your Mines. Your Fortune.",
  description: "A tokenized Web3 mining game built on Solana. Stake, mine, and raid to grow your wealth.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/forge-logo.png" />
      </head>
      <body className={`${pixelFont.variable} font-pixel bg-black text-amber-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="grid-overlay"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
