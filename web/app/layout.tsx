import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export const metadata = {
  title: "CRYPTOBALI Ocean",
  description: "TON miniapp for TON/Jetton with QR and AML",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const manifestUrl = `${process.env.NEXT_PUBLIC_WEBAPP_URL || "http://localhost:3000"}/tonconnect-manifest.json`;
  return (
    <html lang="ru">
      <body>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <div className="wrap">{children}</div>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
