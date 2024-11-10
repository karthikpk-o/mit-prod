import { useState, useEffect, useCallback } from "react"
import { ChevronDown, ChevronUp, Eye } from "lucide-react"
import NavBar from "../components/NavBar"
import axios from "axios"

export default function VoucherApproval() {
  const [vouchers, setVouchers] = useState([]);
  const [expandedVoucher, setExpandedVoucher] = useState(null)
  const [isApproving, setIsApproving] = useState(false)
  const [toast, setToast] = useState(null);

  const fetchVouchers = useCallback(async () => {
    try {
      const response = await axios.get(`https://mit-prod-q12j.vercel.app/api/v1/user/vouchers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setVouchers(response.data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      setToast({ type: 'error', message: `Failed to fetch vouchers: ${error.message}` });
    }
  }, []);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  const toggleVoucherDetails = (VoucherID) => {
    setExpandedVoucher(expandedVoucher === VoucherID ? null : VoucherID)
  }

  const approveVoucher = async (VoucherID) => {
    setIsApproving(true)
    try {
      const approvalDate = new Date().toISOString();

      const response = await axios.post(`https://mit-prod-q12j.vercel.app/api/v1/user/voucherapproval`, 
        {
          VoucherID: VoucherID,
          ApprovedDate: approvalDate,
        },
        {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      if (response.data.success) {
        setToast({ type: 'success', message: response.data.message })
        await fetchVouchers();
      } else {
        throw new Error(response.data.message)
      }
    } catch (error) {
      setToast({ type: 'error', message: `Failed to approve voucher: ${error.message}` })
    } finally {
      setIsApproving(false)
    }
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const DisplayField = ({ label, value }) => (
    <div className="mb-2">
      <span className="font-semibold">{label}:</span>
      <span className="ml-2">{value}</span>
    </div>
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-100 to-indigo-100">
        <NavBar/>
        <main className="flex-1 overflow-y-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Voucher Approval</h1>
        <div className="overflow-x-auto mt-10">
            <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voucher ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voucher Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {vouchers.map((voucher) => (
                <>
                    <tr key={voucher.VoucherID}>
                    <td className="px-6 py-4 whitespace-nowrap">{voucher.BusinessUnit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{voucher.VoucherID}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{voucher.VendorID}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{voucher.VoucherType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{voucher.InvoiceAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{voucher.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => toggleVoucherDetails(voucher.VoucherID)}
                        >
                        <Eye className="h-4 w-4 inline-block mr-2" />
                        View
                        {expandedVoucher === voucher.VoucherID ? (
                            <ChevronUp className="h-4 w-4 inline-block ml-2" />
                        ) : (
                            <ChevronDown className="h-4 w-4 inline-block ml-2" />
                        )}
                        </button>
                    </td>
                    </tr>
                    {expandedVoucher === voucher.VoucherID && (
                    <tr>
                        <td colSpan={7}>
                        <div className="p-4 bg-white rounded-md">
                            <div className="grid gap-4 sm:grid-cols-1 sm:gap-6">
                            {/* Basic Information */}
                            <div className="sm:col-span-1 bg-blue-100 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-black mb-4">Basic Information</h3>
                                <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                                <DisplayField label="Business Unit" value={voucher.BusinessUnit} />
                                <DisplayField label="Voucher ID" value={voucher.VoucherID} />
                                <DisplayField label="Invoice Type" value={voucher.IsInwardRCM === "Y" ? "Inward Invoice" : "NonInward Invoice"} />
                                </div>
                            </div>

                            {/* Voucher Details */}
                            <div className="sm:col-span-1 bg-red-100 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-black mb-4">Voucher Details</h3>
                                <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                                <DisplayField label="Voucher Type" value={voucher.VoucherType} />
                                <DisplayField label="Is RCM Inward" value={voucher.IsInwardRCM} />
                                <DisplayField label="Voucher Style" value={voucher.VoucherStyle} />
                                <DisplayField label="Voucher Source" value={voucher.VoucherSource} />
                                <DisplayField label="Inward Invoice No" value={voucher.Inward_No} />
                                <DisplayField label="Invoice Date" value={voucher.InvoiceDate} />
                                </div>
                            </div>

                            {/* Vendor Information */}
                            <div className="sm:col-span-1 bg-yellow-100 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-black mb-4">Vendor Information</h3>
                                <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                                <DisplayField label="Vendor ID" value={voucher.VendorID} />
                                <DisplayField label="State Code" value={voucher.StateCode} />
                                <DisplayField label="Vendor Tax Classification" value={voucher.VendorTaxClassification} />
                                <DisplayField label="GST Code" value={voucher.GSTIN} />
                                <DisplayField label="Vendor Name" value={voucher.VendName} />
                                <DisplayField label="Vendor Address" value={voucher.VAddress1} />
                                <DisplayField label="Pan No" value={voucher.PanNo} />
                                <DisplayField label="Bank Name" value={voucher.BankName} />
                                <DisplayField label="Branch Name" value={voucher.BranchName} />
                                <DisplayField label="Account No" value={voucher.AccountNum} />
                                <DisplayField label="IFSC Code" value={voucher.IFSCCode} />
                                </div>
                            </div>

                            {/* Financial Details */}
                            <div className="sm:col-span-1 bg-green-100 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-black mb-4">Financial Details</h3>
                                <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                                <DisplayField label="Accounting Date" value={voucher.AccountingDate} />
                                <DisplayField label="Short Narration" value={voucher.LineNarration} />
                                <DisplayField label="Invoice Amount" value={voucher.InvoiceAmount} />
                                <DisplayField label="Hold Amount" value={voucher.HoldAmount} />
                                <DisplayField label="Hold Reason" value={voucher.HoldReason} />
                                <DisplayField label="TDS" value={voucher.hasTDS} />
                                <DisplayField label="Mis Amount" value={voucher.Misamount} />
                                <DisplayField label="IGST" value={voucher.IGST} />
                                <DisplayField label="CGST" value={voucher.CGST} />
                                <DisplayField label="SGST" value={voucher.SGST} />
                                <DisplayField label="Cess" value={voucher.Cess} />
                                <DisplayField label="Tcs Amount" value={voucher.TCSAmount} />
                                <DisplayField label="Input Tax" value={voucher.InputTax} />
                                <DisplayField label="Approver Unit" value={voucher.ApprovalUnit} />
                                <DisplayField label="Sundry Creditor Institute" value={voucher.SC_Institute} />
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="sm:col-span-1 bg-purple-100 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-black mb-4">Additional Information</h3>
                                <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                                <DisplayField label="Created By" value={voucher.UserID} />
                                <DisplayField label="Created Date" value={voucher.Datem} />
                                <DisplayField label="Entered By" value={voucher.EnteredBy} />
                                <DisplayField label="Approved By" value={voucher.ApprovedBy} />
                                <DisplayField label="Approved Date" value={voucher.ApprovedDate} />
                                <DisplayField label="Is MIS Bill" value={voucher.Ismis} />
                                <DisplayField label="Is MIS Uploaded" value={voucher.isMisUploaded} />
                                <DisplayField label="Is Service Charges" value={voucher.IsServiceCharge} />
                                <DisplayField label="RCM" value={voucher.RCM} />
                                <DisplayField label="Defer Capitalization" value={voucher.DeferCap} />
                                <DisplayField label="Defer Investment" value={voucher.DeferInv} />
                                <DisplayField label="Has Asset" value={voucher.HasAsset} />
                                <DisplayField label="Unposted" value={voucher.unposted} />
                                <DisplayField label="Is Prepaid" value={voucher.IsPrepaid} />
                                <DisplayField label="Email Category" value={voucher.EmailCategory} />
                                <DisplayField label="Is Sub Vendor" value={voucher.IsSubVendor} />
                                <DisplayField label="Goods/Services" value={voucher.Goods_Services} />
                                <DisplayField label="Entry No" value={voucher.Entry_no} />
                                <DisplayField label="Invoice Status" value={voucher.InvoiceStatus} />
                                <DisplayField label="Voucher Link" value={voucher.VoucherLink} />
                                </div>
                            </div>
                            </div>
                            <button
                            className={`mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isApproving ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => approveVoucher(voucher.VoucherID)}
                            disabled={isApproving}
                            >
                            {isApproving ? "Approving..." : "Approve Voucher"}
                            </button>
                        </div>
                        </td>
                    </tr>
                    )}
                </>
                ))}
            </tbody>
            </table>
        </div>
    </main>
        {toast && (
            <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {toast.message}
            </div>
        )}
    </div>
  )
}