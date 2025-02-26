import React, { use, useEffect, useState } from "react";
import Logo from "./assets/message.svg";
import Copy from "./assets/copy.svg";

function App() {
  const [template, setTemplate] = useState("");
  const [templateLength, setTemplateLength] = useState(0);
  const [formData, setFormData] = useState({});
  const [copyTooltip, setCopyTooltip] = useState("Copy");
  const [characterCountTooltip, setCharacterCountTooltip] = useState(templateLength > 300 ? "Message too long!" : "You are good!");

  const placeholders = Array.from(template.matchAll(/\[(.*?)\]/g), (m) => m[1]);

  useEffect(() => {
    setTemplateLength(template.length);
    setCharacterCountTooltip(template.length > 300 ? "Message too long" : "You are good");
  }, [template]);

  const handleInputChange = (e, placeholder) => {
    setFormData({
      ...formData,
      [placeholder]: e.target.value,
    });
    setTemplateLength(template.length);
    setCharacterCountTooltip(template.length > 300 ? "Message too long" : "You are good");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      renderMessage()
        .map((el) => el.props.children)
        .join("")
    );
    setCopyTooltip("Text Copied!");
    setTimeout(() => setCopyTooltip("Copy"), 2000);
  };

  const renderMessage = () => {
    return template.split(/(\[.*?\])/g).map((part, index) => {
      const match = part.match(/\[(.*?)\]/);
      if (match) {
        const placeholder = match[1];
        const value = formData[placeholder] || `[${placeholder}]`;
        return (
          <span
            key={index}
            className={
              value === `[${placeholder}]`
                ? "font-semibold text-red-500"
                : "text-black"
            }
          >
            {value}
          </span>
        );
      }
      return (
        <span key={index} className="text-black">
          {part}
        </span>
      );
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-w-screen min-h-screen text-black">
      <img src={Logo} alt="Logo" className="w-12 h-12 mx-auto mb-1" />
      <h1 className="text-3xl text-center font-semibold mb-6">
        {" "}
        Format Message{" "}
      </h1>
      <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Message Template</h2>
        <textarea
          className="w-full p-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:border-blue-500 text-black"
          value={template}
          placeholder="Enter message template"
          onChange={(e) => setTemplate(e.target.value)}
          rows={4}
        />
      </div>

      <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Dynamic Form</h2>
        <div className="grid grid-cols-3 gap-4">
          {placeholders.map((placeholder) => (
            <div key={placeholder} className="mb-4">
              <label className="block text-md font-medium mb-1">
                {placeholder}
              </label>
              <input
                type="text"
                placeholder={`Enter ${placeholder}`}
                value={formData[placeholder] || ""}
                onChange={(e) => handleInputChange(e, placeholder)}
                className="w-full p-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:border-blue-500 text-black"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-semibold mb-4">Output</h2>
          <div className="flex relative group">
            <p
                className={`text-xl mb-4 ${
                templateLength > 300 ? "text-red-500 font-semibold" : ""
                }`}
            >
                {templateLength}
            </p>
            <span className="text-xl mb-4"> /300</span>
            <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {characterCountTooltip}
            </span>
        </div>
          
          <div className="cursor-pointer relative group">
            <img
              src={Copy}
              alt="Copy"
              className="w-6 h-6"
              onClick={handleCopy}
            />
            <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {copyTooltip}
            </span>
          </div>
        </div>
        <p className="p-4 bg-gray-100 border rounded-lg shadow-sm whitespace-pre-wrap">
          {renderMessage()}
        </p>
      </div>
    </div>
  );
}

export default App;
