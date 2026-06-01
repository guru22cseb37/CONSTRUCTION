import type { Metadata } from 'next';
import { Cormorant_Garamond, Bebas_Neue, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiAssistant from '@/components/AiAssistant';
import SmoothScroll from '@/components/SmoothScroll';

// Load Cormorant Garamond for regal editorial headlines
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// Load Bebas Neue for strong industrial headers
const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: ['400'],
  display: 'swap',
});

// Load DM Sans for clean technical body text
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

// Load JetBrains Mono for micro accents and labels
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CSK Constructions | Building Tomorrow\'s Landmarks Today',
  description: 'CSK Constructions delivers exceptional residential, commercial, and massive infrastructure projects through precision engineering, cutting-edge innovation, and uncompromising quality.',
  keywords: 'CSK, construction company, building landmarks, brutalist luxury, luxury villas, infrastructure contractors, engineering, high-rise builders',
  openGraph: {
    title: 'CSK Constructions | Building Tomorrow\'s Landmarks Today',
    description: 'CSK Constructions is a legacy builder specializing in architectural precision, high-end cantilevered villas, and industrial structures.',
    url: 'https://cskconstructions.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSK Constructions | Building Tomorrow\'s Landmarks Today',
    description: 'CSK Constructions delivers architectural masterworks with military precision and zero noise.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${bebas.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-platinum">
        {/* Cinematic Film-Grain Texture Overlay */}
        <div className="grain-overlay" />
        
        {/* Lenis Smooth Scrolling Context */}
        <SmoothScroll>
          <Navbar />
          
          <main className="flex-grow pt-24 min-h-screen">
            {children}
          </main>
          
          <Footer />
          <AiAssistant />
        </SmoothScroll>
      </body>
    </html>
  );
}
