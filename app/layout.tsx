import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Loading } from "@/components/auth/loading";
import { ModalProvider } from "@/providers/modal-provider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VectorSpace",
  description: "Nex Generation Visual Workspace for Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            <ModalProvider />          
              {children} 
          </ConvexClientProvider> 
        </Suspense>      
      </body>
    </html>
  );
}