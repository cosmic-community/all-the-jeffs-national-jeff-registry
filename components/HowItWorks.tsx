export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Type your name',
      description: 'Must be Jeff',
      icon: '✍️'
    },
    {
      number: 2,
      title: 'Get your Jeff Number',
      description: 'Unique sequential ID',
      icon: '🔢'
    },
    {
      number: 3,
      title: 'Download & share',
      description: 'Certificate and social image',
      icon: '📜'
    }
  ]

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Step {step.number}: {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}