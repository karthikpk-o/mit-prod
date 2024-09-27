import { Search } from "lucide-react"

export default function InputwButton({id, label, className="", type="text", onChange, onClick}){
    return(
        <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-black-700">{label}</label>
            <div className="relative">
                <input type={type} id={id} name={id} onChange={onChange} className="bg-indigo-50 bg-opacity-50 border border-indigo-200 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" required=""/>
                <button 
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-800"
                aria-label="Search"
                onClick={onClick}
                >
                    <Search className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}
