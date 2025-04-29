import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ClipboardIcon } from "@heroicons/react/24/outline";

export default function FormatMessage() {
  const [template, setTemplate] = useState("");
  const [formData, setFormData] = useState({});
  const [copyTooltip, setCopyTooltip] = useState("Copy");
  const [characterCountTooltip, setCharacterCountTooltip] = useState("You are good!");

  const placeholders = Array.from(template.matchAll(/\[(.*?)\]/g), (m) => m[1]);

  const getFinalMessage = () => {
    return template.split(/(\[.*?\])/g).map((part) => {
      const match = part.match(/\[(.*?)\]/);
      return match ? formData[match[1]] || `[${match[1]}]` : part;
    }).join("");
  };

  useEffect(() => {
    const finalMessage = getFinalMessage();
    setCharacterCountTooltip(finalMessage.length > 300 ? "Message too long!" : "You are good!");
  }, [template, formData]);

  const handleInputChange = (e, placeholder) => {
    setFormData({ ...formData, [placeholder]: e.target.value });
  };

  const renderMessage = () => {
    const regex = /\[(.*?)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;
  
    while ((match = regex.exec(template)) !== null) {
      const [fullMatch, placeholder] = match;
      const matchStart = match.index;
  
      if (lastIndex < matchStart) {
        parts.push(
          <span key={lastIndex} className="text-gray-900">
            {template.slice(lastIndex, matchStart)}
          </span>
        );
      }
  
      const value = formData[placeholder] || `[${placeholder}]`;
      parts.push(
        <span key={matchStart} className={value.startsWith("[") ? "font-semibold text-red-500" : "text-gray-900"}>
          {value}
        </span>
      );
  
      lastIndex = matchStart + fullMatch.length;
    }
  
    if (lastIndex < template.length) {
      parts.push(
        <span key={lastIndex} className="text-gray-900">
          {template.slice(lastIndex)}
        </span>
      );
    }
  
    return parts;
  };

  const handleCopy = () => {
    const text = getFinalMessage();
    navigator.clipboard.writeText(text);
    setCopyTooltip("Copied!");
    setTimeout(() => setCopyTooltip("Copy"), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="divide-y divide-gray-900/10">

          {/* Template Section */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold text-gray-900">Message Template</h2>
              <p className="mt-1 text-sm text-gray-600">Enter the template message with placeholders in [brackets].</p>
              <p className="mt-1 text-xs text-gray-600">Template: Hello [name], I am reaching out to you about [position].</p>
              <p className="mt-1 text-xs text-gray-600">Output: Hello John Doe, I am reaching out to you about SDE.</p>
            </div>
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <textarea
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                      rows={4}
                      className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline -outline-offset-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                      placeholder="Type your template here..."
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Dynamic Fields Section */}
          {placeholders.length > 0 && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold text-gray-900">Fill Placeholders</h2>
                <p className="mt-1 text-sm text-gray-600">Provide values for the placeholders.</p>
              </div>
              <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {placeholders.map((placeholder) => (
                      <div key={placeholder}>
                        <label className="block text-sm font-medium text-gray-900 mb-1">{placeholder}</label>
                        <input
                          type="text"
                          value={formData[placeholder] || ""}
                          onChange={(e) => handleInputChange(e, placeholder)}
                          className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline -outline-offset-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                          placeholder={`Enter ${placeholder}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Preview Section */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold text-gray-900">Preview & Copy</h2>
              <p className="mt-1 text-sm text-gray-600">See your final message and copy it easily.</p>
            </div>
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-700">
                    {getFinalMessage().length}/300
                    <span className="ml-2 text-xs text-gray-500">{characterCountTooltip}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    <ClipboardIcon className="h-5 w-5" />
                    {copyTooltip}
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-md text-gray-900 whitespace-pre-wrap">
                  {renderMessage()}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}