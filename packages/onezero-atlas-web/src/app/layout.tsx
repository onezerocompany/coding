import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const options = [
  {
    icon: '📝',
    name: 'Project Overview',
    href: '/',
  },
  {
    icon: '📁',
    name: 'Files',
    href: '/files',
  },
  {
    icon: '📊',
    name: 'Processes',
    href: '/',
  },
  {
    icon: '📦',
    name: 'Commit Changes',
    href: '/commit',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex gap-4 min-h-screen p-6">
          <ul className="flex flex-col gap-2 bg-gray-50 border bg-opacity-60 p-4 rounded-xl w-96">
            {options.map((option) => (
              <li
                key={option.name}
                className="text-lg font-semibold hover:text-gray-400 text-gray-600 px-6 py-4 rounded-xl bg-gray-100 bg-opacity-60 border"
              >
                <a href={option.href}>
                  <span className="mr-2">{option.icon}</span>
                  {option.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="p-8 bg-gray-50 w-full font-bold border rounded-xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
