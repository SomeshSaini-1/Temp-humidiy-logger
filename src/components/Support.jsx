import { useRef, useCallback, useMemo } from 'react';
import {
  FaLifeRing,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaRegCommentDots,
} from 'react-icons/fa';
import Sidebar from '../assets/Sidebar';
import Header from '../assets/Header';
import { Link } from 'react-router-dom';

const Support = () => {
  // 1. Using useRef for form inputs to avoid re-renders
  const nameRef = useRef();
  const mobileRef = useRef();
  const messageRef = useRef();

  // 2. Using useCallback to memoize the form submission handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const mobile = mobileRef.current.value;
    const message = messageRef.current.value;

    console.log({
      name,
      mobile,
      message,
    });

    // Here you would typically perform an API call to submit the support request
    alert('Support request submitted! Check the console for details.');

    // Optional: Clear the form inputs after submission
    nameRef.current.value = '';
    mobileRef.current.value = '';
    messageRef.current.value = '';
  }, []); // Empty dependency array as the refs are stable

  // 3. Using useMemo to memoize the FAQ data
  const faqs = useMemo(
    () => [
      {
        question: 'How long does support take to respond?',
        answer: 'Typically within 24 hours during working days.',
      },
      {
        question: 'Where can I check system status?',
        answer: 'Visit our <a href="/" class="text-blue-500 underline">Status Page</a> for live updates.',
      },
      {
        question: 'Can I request a feature?',
        answer:
          'Yes, use the contact form and include "Feature Request" in the subject.',
      },
    ],
    []
  );

  return (
    <div className="flex h-screen bg-[var(--secondary)] text-[var(--text)]">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Header Name="Support" />

        {/* Support Form Section */}
        <div className="bg-[var(--bg)] rounded-xl shadow p-6 w-full mb-6">
          <div className="w-full flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            {/* Illustration */}
            <div className="md:w-1/2 bg-[#EDF2F7] p-6 flex flex-col items-center justify-center">
              <img
                src="https://www.itarian.com/images/service-desk/service-desk-definition.png"
                alt="Help Illustration"
                className="w-72"
              />
              <p className="text-center mt-4 text-sm text-gray-700">
                Our support team is here to assist you. Fill the form and we'll
                get back shortly.
              </p>
            </div>

            {/* Form */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Need Some Help?
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Fill in the details below and we’ll get in touch.
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Your Name
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaUser className="text-gray-400 mr-2" />
                    <input
                      ref={nameRef}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full text-sm focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Mobile No.
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaPhoneAlt className="text-gray-400 mr-2" />
                    <input
                      ref={mobileRef}
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="w-full text-sm focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Your Message
                  </label>
                  <div className="flex items-start border border-gray-300 rounded-md px-3 py-2">
                    <FaRegCommentDots className="text-gray-400 mt-1 mr-2" />
                    <textarea
                      ref={messageRef}
                      rows="4"
                      placeholder="Write your message here..."
                      className="w-full text-sm focus:outline-none bg-transparent resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-5 py-2 rounded-md text-sm hover:bg-indigo-600 transition"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info & FAQ */}
        <div className="bg-[var(--bg)] rounded-xl shadow p-6 w-full">
          <div className="flex items-center space-x-3 mb-6">
            <FaLifeRing className="text-blue-500 text-2xl" />
            <h2 className="text-2xl font-bold">Support Info</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Need help?</h3>
              <p className="text-sm text-[var(--muted-text)]">
                Reach out to our support team and we’ll respond as soon as
                possible.
              </p>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-500" />
                <span>gaurav.oytechnology@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-blue-500" />
                <span>+91 9876543210</span>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {/* Dynamically render FAQs using the memoized array */}
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-medium">{faq.question}</h4>
                    <p
                      className="text-sm text-[var(--muted-text)]"
                      // NOTE: We're using dangerouslySetInnerHTML here because the FAQ answer
                      // contains an HTML link. This should be used with caution.
                      // For this specific use case, it is generally safe.
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    ></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;