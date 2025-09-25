import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RegistrationForm } from '@/components/RegistrationForm'

export const metadata = {
  title: 'Register Your Jeffhood - All The Jeffs',
  description: 'Register as a Jeff and receive your official Jeff Number and Certificate of Jeffthenticity. Join the National Jeff Registry today!',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Register Your Jeffhood
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              We only accept Jeff. Capitalization does not matter. Spirit does.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="card p-8">
            <RegistrationForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}