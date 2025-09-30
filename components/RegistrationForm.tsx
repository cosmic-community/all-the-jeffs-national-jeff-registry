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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg" role="alert">
          <p className="font-medium">Registration Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name <span className="text-red-600" aria-label="required">*</span>
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
          aria-required="true"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          className="input-field"
          placeholder="jeff@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Location (optional)
        </label>
        <input
          type="text"
          id="location"
          {...register('location', {
            maxLength: {
              value: 100,
              message: 'Location must be less than 100 characters'
            }
          })}
          className="input-field"
          placeholder="City, State"
          aria-invalid={errors.location ? 'true' : 'false'}
          aria-describedby={errors.location ? 'location-error' : undefined}
        />
        {errors.location && (
          <p id="location-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.location.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          Age (optional)
        </label>
        <input
          type="number"
          id="age"
          {...register('age', { 
            min: { value: 1, message: 'Age must be at least 1' },
            max: { value: 150, message: 'Please enter a valid age' }
          })}
          className="input-field"
          placeholder="25"
          aria-invalid={errors.age ? 'true' : 'false'}
          aria-describedby={errors.age ? 'age-error' : undefined}
        />
        {errors.age && (
          <p id="age-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.age.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="inline-block animate-spin mr-2" aria-hidden="true">⏳</span>
            Registering Your Jeffhood...
          </>
        ) : (
          'Register My Jeffhood'
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        By registering, you acknowledge that you are, in fact, a Jeff.
      </p>
    </form>
  )
}