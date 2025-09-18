import React from 'react';

const ValueProposition = () => {
  const benefits = [
    {
      title: "Reduced Staff Workload",
      description: "Handle routine inquiries automatically, freeing staff to focus on complex issues and strategic initiatives.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Improved Parent Satisfaction",
      description: "24/7 availability and instant responses in preferred languages lead to happier parents and better engagement.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0614 3.41708C18.3999 3.14052 17.5973 2.99826 16.785 2.99826C15.9727 2.99826 15.1701 3.14052 14.5086 3.41708C13.8472 3.69364 13.2408 4.099 12.73 4.61L12 5.34L11.27 4.61C10.2449 3.58505 8.85216 3.00863 7.415 3.00863C5.97784 3.00863 4.58509 3.58505 3.56 4.61C2.53491 5.63505 1.95849 7.02784 1.95849 8.465C1.95849 9.90216 2.53491 11.2949 3.56 12.32L4.29 13.05L12 20.76L19.71 13.05L20.44 12.32C20.951 11.8092 21.3564 11.2028 21.6329 10.5414C21.9095 9.87989 22.0517 9.07732 22.0517 8.265C22.0517 7.45268 21.9095 6.65011 21.6329 5.98864C21.3564 5.3272 20.951 4.7208 20.44 4.21L20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Easy Onboarding & Maintenance",
      description: "Quick setup with minimal IT resources required. Continuous learning improves responses over time.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 6.5L15 8L20.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Transform Your Institution's Communication
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience improvements in efficiency, satisfaction, and operational excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-background rounded-xl p-8 border border-border hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                {benefit.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;