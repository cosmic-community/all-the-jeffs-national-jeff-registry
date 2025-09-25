'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { RegistrationFormData } from '@/types'

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationFormData>()

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      // Redirect to success page
      router.push(`/success/${result.jeffNumber}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { 
            required: 'Name is required',
            pattern: {
              value: /^jeff$/i,
              message: 'This registry is for Jeffs only. Please enter Jeff.'
            }
          })}
          className="input-field"
          placeholder="Jeff"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="input-field"
          placeholder="jeff@example.com"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Location (optional)
        </label>
        <input
          type="text"
          id="location"
          {...register('location')}
          className="input-field"
          placeholder="City, State"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          Age (optional)
        </label>
        <input
          type="number"
          id="age"
          {...register('age', { min: 1, max: 150 })}
          className="input-field"
          placeholder="25"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">Please enter a valid age</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Registering Your Jeffhood...' : 'Register My Jeffhood'}
      </button>

      <p className="text-center text-sm text-gray-500">
        By registering, you acknowledge that you are, in fact, a Jeff.
      </p>
    </form>
  )
}