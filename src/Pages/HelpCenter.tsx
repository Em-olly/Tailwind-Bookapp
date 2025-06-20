import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, MessageSquare, Phone, Book, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const faqSections = [
    {
      id: 'account',
      title: 'Account & Registration',
      questions: [
        { q: 'How do I create an account?', a: 'Click "Sign Up" and enter your details.' },
        { q: 'How do I reset my password?', a: 'Use the "Forgot Password" link on the login page.' }
      ]
    },
    {
      id: 'reading',
      title: 'Reading & Books',
      questions: [
        { q: 'How do I read books?', a: 'Search for a book and click its cover to open the reader.' },
        { q: 'Why can\'t I read some books?', a: 'Some books aren\'t available due to copyright restrictions.' }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Issues',
      questions: [
        { q: 'What if the reader isn\'t loading?', a: 'Try refreshing the page or clearing your cache.' },
        { q: 'How do I report a bug?', a: 'Contact our support team using the form below.' }
      ]
    }
  ];

  const contactOptions = [
    { icon: <Mail className="w-5 h-5 text-[#711ea2]" />, title: 'Email Us', details: 'support@bookhaven.com' },
    { icon: <MessageSquare className="w-5 h-5 text-[#711ea2]" />, title: 'Live Chat', details: 'Available 9am-5pm EST' },
    { icon: <Phone className="w-5 h-5 text-[#711ea2]" />, title: 'Call Us', details: '+256704321130' }
  ];

  return (
    <div className="min-h-screen bg-white card">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12 px-4 text-center relative">
        <Link 
          to="/" 
          className="absolute top-4 left-4 flex items-center gap-1 p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Help Center</h1>
        <p className="text-lg max-w-xl mx-auto">
          Get answers to your questions and find support resources
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-[#9333ea]">
        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactOptions.map((option, i) => (
            <div key={i} className="bg-[#f3e8ff] rounded-xl shadow p-6 text-center border border-[#d9c2ff]">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                {option.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1 text-[#711ea2]">{option.title}</h3>
              <p>{option.details}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section*/}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#711ea2]">FAQs</h2>
          
          <div className="space-y-4">
            {faqSections.map(section => (
              <div key={section.id} className="bg-[#f3e8ff] rounded-xl shadow border border-[#d9c2ff]">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex justify-between items-center w-full p-5"
                >
                  <h3 className="font-semibold text-[#711ea2]">{section.title}</h3>
                  {activeSection === section.id ? 
                    <ChevronUp className="w-5 h-5 text-[#711ea2]" /> : 
                    <ChevronDown className="w-5 h-5 text-[#711ea2]" />
                  }
                </button>
                
                {activeSection === section.id && (
                  <div className="px-5 pb-5">
                    {section.questions.map((faq, i) => (
                      <div key={i} className="mb-4 last:mb-0">
                        <h4 className="font-medium mb-1 text-[#711ea2]">{faq.q}</h4>
                        <p>{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#f3e8ff] rounded-xl shadow p-6 border border-[#d9c2ff]">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#711ea2]">Contact Us</h2>
          
          {isSubmitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
              Thank you! We'll respond to your message soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Your Name" 
                  className="w-full p-3 border border-[#d9c2ff] rounded-lg focus:ring-2 focus:ring-[#711ea2] focus:outline-none"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Your Email" 
                  className="w-full p-3 border border-[#d9c2ff] rounded-lg focus:ring-2 focus:ring-[#711ea2] focus:outline-none"
                  required
                />
              </div>
              <div>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange}
                  placeholder="Your Message" 
                  rows={4} 
                  className="w-full p-3 border border-[#d9c2ff] rounded-lg focus:ring-2 focus:ring-[#711ea2] focus:outline-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#711ea2] text-white py-3 rounded-lg font-medium hover:bg-[#5a1680] transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

     </div>
  );
};

export default HelpCenter;