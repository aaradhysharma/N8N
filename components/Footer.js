export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} Terraform Medicine n8n. Built with Next.js & Vercel.
      </div>
    </footer>
  );
} 