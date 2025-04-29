import Navbar from '../components/Navbar'

const navigation = [
  { name: 'Generate Message', href: '/generate' },
  { name: 'Format Message', href: '/format' },
]

export default function Home() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Build Beautiful Messages Effortlessly
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Create and format recruiter or referral messages easily with AI-powered templates and guidance. Save time, get noticed.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/generate"
              className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Started
            </a>
            <a href="/format" className="text-sm/6 font-semibold text-gray-900">
              Format Message <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}