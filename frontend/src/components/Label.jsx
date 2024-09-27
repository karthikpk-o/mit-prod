export default function Label({ id, label, value="", }) {
    return (
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium text-black-700">{label}</label>
        <div
          id={id}
          name={id}
          className="bg-indigo-50 bg-opacity-50 border border-indigo-200 text-indigo-900 text-sm rounded-lg block w-full p-2.5"
        >
          {value}
        </div>
      </div>
    );
  }
  