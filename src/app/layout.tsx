// provider
import Providers from "./provider";

// components
import PublicLayoutClient from "./PublicLayoutClient";

// template
import { HwasanchaeData } from "./template/hwasanchae/hwasanchae"; // ✅
import { Developer } from "./template/other/developer"; // ✅ 
import { externalList } from "./template/other/external"; // ✅ 

// font
import { Nunito } from 'next/font/google';
const nunito = Nunito({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

// metadata
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: {
        template: `Hwasanchae | %s`,
        default: `Hwasanchae`
    },
    description: `This site is public repository transliteration of web novel and self-published novel`,
    icons: {
      icon: `/image/logo.png`,
      shortcut: `/image/logo.png`,
      apple: `/image/logo.png`
    }
}

async function getData() {
  const baseUrl = process.env.BASE_URL!;
  const [hwasanchae, developer] = await Promise.all([
    fetch(`${baseUrl}/api/hwasanchae`, { next: { tags: [`hwasanchae`] } }).then(res => res.json()),
    fetch(`${baseUrl}/api/developer`, { next: { revalidate: 60 } }).then(res => res.json())
  ]);

  return {
    hwasanchae: hwasanchae.data as HwasanchaeData,
    developer: developer.data as Developer
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const external = externalList.filter(external => external.link).sort((a, b) => a.name.localeCompare(b.name));
  const baseData = await getData();
  
  const data = {
    external: external,
    ...baseData
  }

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <PublicLayoutClient
            data={data}
          >
            { children }
          </PublicLayoutClient>
        </Providers>
      </body>
    </html>
  )
}
