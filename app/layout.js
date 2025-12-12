export const metadata = {
  title: "FastChat",
  description: "Your FastChat AI Assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
