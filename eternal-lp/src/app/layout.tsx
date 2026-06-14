import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eternal Gift 2.0 | Presentes Digitais Emocionais Premium",
  description: "Crie homenagens digitais memoráveis com fotos, música e mensagens. Transforme sentimentos em um link único e eterno em 5 minutos.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Apply the saved theme before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('eternal-theme');if(t==='dark'){document.documentElement.dataset.theme='dark';}}catch(e){}",
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
