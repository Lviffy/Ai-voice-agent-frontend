import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The AI voice agent has transformed how we handle parent inquiries. Response times dropped from days to minutes, and parents can now get answers in their preferred language 24/7.",
      author: "Dr. Priya Sharma",
      position: "Director of Student Services at Delhi University",
      avatar: "bg-primary/30"
    },
    {
      quote: "Our multilingual support has improved parent satisfaction by 85%. The AI handles routine queries perfectly, allowing our staff to focus on complex student cases.",
      author: "Prof. Rajesh Kumar",
      position: "Dean of Admissions at IIT Madras",
      avatar: "bg-primary/20"
    },
    {
      quote: "Implementation was seamless and the ROI was immediate. We've reduced our administrative workload significantly while providing better service to our diverse community.",
      author: "Ms. Lakshmi Venkatesh",
      position: "IT Director at Anna University",
      avatar: "bg-primary/40"
    }
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-card relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Trusted by Leading Educational Institutions
          </h2>
          <p className="text-muted-foreground text-lg">
            See how our AI voice agent is transforming student and parent support across universities and colleges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-background/80 backdrop-blur-sm hover:border-border/60 transition-all duration-300"
            >
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary inline-block mr-1">★</span>
                ))}
              </div>
              <p className="text-lg mb-8 text-foreground/90 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${testimonial.avatar} bg-muted`}></div>
                <div>
                  <h4 className="font-medium text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;