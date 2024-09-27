import React from 'react';

export default function TextArea({ id, label, rows = 2, className="sm:col-span-1", onChange}) {
  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-black-700">
        {label}
      </label>
      <textarea
        id={id}
        onChange={onChange}
        rows={rows}
        name={id}
        className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 bg-opacity-50 rounded-lg border border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500"
      ></textarea>
    </div>
  );
}
