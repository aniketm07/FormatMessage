'use client';

import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { ClipboardIcon } from "@heroicons/react/24/outline";
import Navbar from '../components/Navbar';
import MessageTypeSelector from '../components/MessageTypeSelector';
import generateMessage from '../lib/generateMessageGemini';
import { ToastContainer, toast } from 'react-toastify';

export default function GenerateMessageAI() {
  const [messageType, setMessageType] = useState('Recruiter LinkedIn');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target.closest('form');
    const formData = {
      name: form.name.value,
      company: form.company.value,
      role: form.role.value,
      charLimit: form.charLimit.value,
      jobDescription: form.jobDescription.value,
      additionalInstructions: form.instructions?.value || '',
      messageType,
    };

    try {
      setLoading(true);
      const aiResponse = await generateMessage(formData);
      setGeneratedMessage(aiResponse);
      toast.success("Message generated successfully!");
    } catch (error) {
      console.error('Error generating message:', error);
      setGeneratedMessage('Failed to generate message.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = generatedMessage;
    navigator.clipboard.writeText(text);
    toast.success("Message copied!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base/7 font-semibold text-gray-900">Generate message using AI</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Fill in the details to generate a personalized message.
              </p>

            {/* Generated Message Section */}
            {generatedMessage && (
                <div className="my-10 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <div className="flex justify-between items-center mb-7">
                    <h3 className="text-lg font-semibold text-gray-900">Generated Message</h3>
                    <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        <ClipboardIcon className="h-5 w-5" />
                    </button>
                </div>
                <p className="whitespace-pre-line text-gray-800">{generatedMessage}</p>
                </div>
            )}
            </div>

            {/* FORM */}
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleSubmit}>
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                  {/* Name */}
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Your Name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="sm:col-span-3">
                    <label htmlFor="company" className="block text-sm/6 font-medium text-gray-900">Company Name</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        required
                        placeholder="Company Name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="sm:col-span-3">
                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">Role Name</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="role"
                        id="role"
                        required
                        placeholder="Software Engineer"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Character Limit */}
                  <div className="sm:col-span-3">
                    <label htmlFor="charLimit" className="block text-sm/6 font-medium text-gray-900">Character Limit</label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="charLimit"
                        id="charLimit"
                        placeholder="300"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="col-span-full">
                    <label htmlFor="jobDescription" className="block text-sm/6 font-medium text-gray-900">Job Description</label>
                    <div className="mt-2">
                      <textarea
                        id="jobDescription"
                        name="jobDescription"
                        required
                        rows={3}
                        placeholder="Describe the job you are applying for."
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Message Type */}
                  <div className="sm:col-span-3">
                    <MessageTypeSelector onChange={setMessageType} />
                  </div>

                    {/* TODO: Add resume upload */}
                  {/* Resume Upload (Optional)
                  <div className="col-span-full">
                    <label htmlFor="resume-upload" className="block text-sm/6 font-medium text-gray-900">Upload Resume</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                        <div className="mt-4 flex text-sm/6 text-gray-600">
                          <label
                            htmlFor="resume-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
                          >
                            <span>Upload a file</span>
                            <input id="resume-upload" name="resume-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-600">PDF, DOCX up to 5MB</p>
                      </div>
                    </div>
                  </div> */}

                </div>
              </div>

              {/* Form Footer */}
              <div className="flex items-center justify-end gap-x-4 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button type="reset" className="rounded-md text-sm/6 px-3 py-2 shadow-sm font-semibold text-gray-900 hover:bg-gray-100">
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  {loading ? 'Generating...' : generatedMessage ? 'Regenerate' : 'Generate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}