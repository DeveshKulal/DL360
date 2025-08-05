import { useState } from 'react';
import { Menu, X, Car, FileText, Shield, Check, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Abstract3DCard = ({ children, className = "" }) => (
  <div className={`relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 transition-all duration-500 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl" />
    <div className="relative z-10">{children}</div>
  </div>
);

const FloatingIcon = ({ Icon, color = "text-blue-500" }) => (
  <div className={`w-16 h-16 ${color} mb-6 relative`}>
    <div className="absolute inset-0 bg-current opacity-10 rounded-2xl" />
    <div className="absolute inset-2 bg-current opacity-20 rounded-xl" />
    <Icon className="relative z-10 w-full h-full p-3" />
  </div>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-x-hidden">

      {/* Navigation */}
      <nav className="relative z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DL360
            </div>

            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Features', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  {item}
                </a>
              ))}
            </div>

            <button 
              className="hidden md:block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/login')}
            >
              Login
            </button>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id='home' className="min-h-screen flex items-center justify-center pt-20 pb-32 bg-white">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              <div>
                A Smarter Way to{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Manage
                </span>
              </div>
              <div className="pt-4">
                Driving Licenses and Vehicles
              </div>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mx-auto max-w-xl">
              Empowering users, staff, and administrators with a secure digital platform
              for all license and vehicle-related services.
            </p>

            <div className="flex justify-center gap-6 pt-4 flex-wrap">
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
                onClick={() => window.location.href = '/login'}
              >
                Get Started
              </button>

              <button
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl hover:border-blue-500 transition-all duration-300 font-semibold"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Abstract3DCard>
              <FloatingIcon Icon={Car} color="text-red-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital License Application & Renewal</h3>
              <p className="text-gray-600 leading-relaxed">
                Streamlined process for applying and renewing driving licenses with digital verification.
              </p>
            </Abstract3DCard>

            <Abstract3DCard>
              <FloatingIcon Icon={FileText} color="text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">FIR & Emission Test Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Efficient handling of FIR and vehicle emission tests through our digital platform.
              </p>
            </Abstract3DCard>

            <Abstract3DCard>
              <FloatingIcon Icon={Shield} color="text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Role-Based Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced security with role-based access control for administrators, staff, and users.
              </p>
            </Abstract3DCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "10,000+", label: "Users Registered" },
              { number: "5,000+", label: "DL Renewals Approved" },
              { number: "2,000+", label: "FIRs Managed" },
              { number: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold">{stat.number}</div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">About DL360</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              DL360 is revolutionizing the way driving licenses and vehicle compliance are managed. Our platform brings together users, administrators, and staff in a seamless digital ecosystem.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're committed to making vehicle-related administrative processes more efficient, transparent, and accessible for everyone involved.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Check, text: "Fast Processing" },
                { icon: Check, text: "Verified Records" },
                { icon: Check, text: "User-Friendly" },
                { icon: Check, text: "Secure Platform" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <item.icon className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Abstract3DCard className="transform hover:scale-105 transition-transform duration-500">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
                <div className="text-6xl text-blue-500 opacity-50">📋</div>
              </div>
            </Abstract3DCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Abstract3DCard>
              <form>
                <div className="space-y-6">
                  <div>
                    <div className="block text-gray-700 font-medium mb-2">Name</div>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700">
                      Your name
                    </div>
                  </div>
                  <div>
                    <div className="block text-gray-700 font-medium mb-2">Email</div>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700">
                      Your email
                    </div>
                  </div>
                  <div>
                    <div className="block text-gray-700 font-medium mb-2">Message</div>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 h-24">
                      Your message
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer">
                    Send Message
                  </button>
                </div>
              </form>
            </Abstract3DCard>

            <div className="space-y-8">
              <Abstract3DCard>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
                  </div>
                </div>
              </Abstract3DCard>

              <Abstract3DCard>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600">+91 8050696452<br />Available</p>
                  </div>
                </div>
              </Abstract3DCard>

              <Abstract3DCard>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600">deveshkulal27@.com</p>
                  </div>
                </div>
              </Abstract3DCard>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DL360
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolutionizing driving license and vehicle management through digital innovation.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {['About', 'Features', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="block text-gray-400 hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            © 2025 DL360. All rights reserved.
          </div>
          <div className="mt-2 text-center text-gray-400">
            Developed by Devesh
          </div>
        </div>
      </footer>
    </div>
  );
}
