import React from 'react';

export default function SelectField({ label, id="", options, className="", onChange}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-black-700">
        {label}
      </label>
      <select
        id={id}
        name={id}
        onChange={onChange}
        className="bg-indigo-50 bg-opacity-50 border border-indigo-200 text-black-600 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
