export default function InputField({id, label, className="", type="text", onChange}){
    return(
        <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-black-700">{label}</label>
            <input type={type} id={id} name={id} onChange={onChange} className="bg-indigo-50 bg-opacity-50 border border-indigo-200 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder={name} required=""/>
        </div>
    )
}
