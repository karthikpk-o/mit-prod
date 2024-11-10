import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField'
import SelectField from '../components/SelectField'
import TextArea from '../components/TextArea'
import NavBar from '../components/NavBar'
import axios from 'axios'
import Label from '../components/Label'
import InputwButton from '../components/InputwButton'
import VoucherAccountingForm from '../components/VoucherAccounting'

export default function VoucherEntryPage() {

  //state variables corresponding to voucher entry fields
  const [formData, setFormData] = useState({
    BusinessUnit: "GFIVV",
    VoucherID: "",
    VendorID: "",
    VoucherType: "APO",
    IsInwardRCM: "Y", 
    VoucherStyle: "AP",
    VoucherSource: "ALC",
    InvoiceDate: null,
    StateCode: null,
    VendorTaxClassification: null,
    GSTIN: null,
    AccountingDate: null,
    LineNarration: null,
    InvoiceAmount: 0.0,
    HoldAmount: 0.0,
    HoldReason: null,
    hasTDS: null,
    Inward_No: null,
    Misamount: 0.0,
    IGST: 0.0,
    CGST: 0.0,
    SGST: 0.0,
    Cess: 0.0,
    TCSAmount: 0.0,
    InputTax: "N",
    ApprovalUnit: null,
    SC_Institute: null,
    UserID: null,
    Datem: null,
    ApprovedBy: null,
    ApprovedDate: null,
    Ismis: "N",
    isMisUploaded: "N",
    IsServiceCharge: "N",
    RCM: "N",
    DeferCap: "N",
    DeferInv: "N",
    HasAsset: "N",
    unposted: "N",
    IsPrepaid: "N",
    EmailCategory: "N",
    IsSubVendor: null,
    Goods_Services: "N",
    GSTR1unit: "N",
    Entry_no: 2,
    InvoiceStatus: "N",
    VoucherLink: "NV",
    EnteredBy: ""
  })

  //state variables of vendor
  const [StateCode, setStateCode] = useState("")
  const [VendorTaxClassification, setVendorTax] = useState("")
  const [GSTIN, setGSTIN] = useState("")
  const [VendName, setVendName] = useState("")
  const [PanNo, setPanNo] = useState("")
  const [BankName, setBankName] = useState("")
  const [BranchName, setBranchName] = useState("")
  const [AccountNum, setAccountNum] = useState("")
  const [IFSCCode, setIFSC] = useState("")
  const [VAddress1, setVAddress] = useState("");

  //userid state variables
  const [userid, setUserID] = useState({
    CreatedBy: null,
    EnteredBy: null,
  });

  //voucher accounting state variables
  const [voucherData, setVoucherData] = useState({
    debitEntry: {
      BusinessUnit: formData.BusinessUnit, 
      VoucherID: formData.VoucherID, 
      Account: '',
      DebitCredit: 'D',
      Amount: '',
      VoucherLine: 1
    },
    creditEntry: {
      BusinessUnit: formData.BusinessUnit,
      VoucherID: formData.VoucherID,
      Account: '',
      DebitCredit: 'C',
      Amount: '',
      VoucherLine: 2
    }
  });

  // This function will be called by VoucherAccountingForm to update voucherData
  const updateVoucherData = (updatedData) => {
    setVoucherData(updatedData);
  };

  useEffect(() => {
    const fetchVoucherID = async () => {
      try {
        const response = await axios.get(`https://mit-prod-q12j.vercel.app/api/v1/user/voucherid`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          }
        });
        if (response.data && response.data.VoucherID) {
          setFormData(prevData =>({
            ...prevData,
            VoucherID: response.data.VoucherID,
            UserID: response.data.User,
            EnteredBy: response.data.User
          }))
          setUserID(prevData =>({
            ...prevData,
            CreatedBy: response.data.User,
            EnteredBy: response.data.User,
          }))
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchVoucherID();
  }, []);

  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])
  
  //function to handle input change of state variables
  const handleInputChange = async(e) => {
    const { name, value } = e.target;
    setFormData(prevData =>({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    // Convert the datetime-local value to ISO 8601 format
    const isoDateTime = new Date(value).toISOString();
    setFormData(prevData => ({
      ...prevData,
      [name]: isoDateTime
    }));
  };
  
  //on search function for vendor details: gets them from backend
  const onSearch = async(e)=>{
    const { name, value } = e.target;
    try{
      const response = await axios.get(`https://mit-prod-q12j.vercel.app/api/v1/user/vendordetails`, value)
      setStateCode(response.data.StateCode)
      setVendorTax(response.data.VendorTaxClassification)
      setGSTIN(response.data.GSTIN)
      setVendName(response.data.VendName)
      setPanNo(response.data.PanNo)
      setBankName(response.data.BankName)
      setBranchName(response.data.BranchName)
      setAccountNum(response.data.AccountNum)
      setIFSC(response.data.IFSCCode)
      setVAddress(response.data.VAddress1)

      setFormData(prevData=>({
        ...prevData,
        StateCode: response.data.StateCode,
        VendorTaxClassification: response.data.VendorTaxClassification,
        GSTIN: response.data.GSTIN
      }));
    }catch(error){
      console.log(error.message)
    }
  }

  //function for handling form submit, send voucher entry to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedData = {
      formData: formData,
      voucherData: voucherData,
    }
    try {
      const response = await axios.post(`https://mit-prod-q12j.vercel.app/api/v1/user/entry`,
        combinedData,
        {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );
      setToast({type: "success", message: response.data.message})
      window.location.reload()
    } catch (error) {
      console.error('Error saving voucher:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-100 to-indigo-100">
      <NavBar/>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="bg-white bg-opacity-50 px-6 py-4 mb-6 rounded-lg">
          <h2 className="text-2xl font-bold text-black">Voucher Entry</h2>
        </div>
        <form className="px-6 py-6 bg-white rounded-lg shadow-md">
          <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
            {/* Basic Information */}
            <div className="sm:col-span-5 bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-black mb-4">Basic Information</h3>
              <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
                <SelectField
                  label="Business Unit"
                  onChange={handleInputChange}
                  id="BusinessUnit"
                  options={[
                    {value: "GFIVV", label: "GFIVV"},
                    {value: "GHKRL", label: "GHKRL"},
                    {value: "GHMNG", label: "GHMNG"},
                    {value: "GHMPL", label: "GHMPL"},
                    {value: "GHUDP", label: "GHUDP"},
                    {value: "GKMCM", label: "GKMCM"},
                    {value: "GMAHE", label: "GMAHE"},
                    {value: "GMBLR", label: "GMBLR"},
                    {value: "GMUCW", label: "GMUCW"},
                    {value: "GMURU", label: "GMURU"},
                  ]}
                />
                <Label value={formData.VoucherID} label="Voucher ID" id="VoucherID"/>
                <div className="w-full flex-col">
                  <div>
                    <input
                      id="inward-invoice"
                      type="radio"
                      value="inward"
                      name="invoice-type"
                      className="w-4 h-4 text-black bg-blue-50 border-blue-200 focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="inward-invoice"
                      className="ml-2 text-sm font-medium text-black"
                    >
                      Inward Invoice
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="non-inward-invoice"
                      type="radio"
                      value="non-inward"
                      name="invoice-type"
                      className="w-4 h-4 text-black bg-blue-50 border-blue-200 focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="non-inward-invoice"
                      className="ml-2 text-sm font-medium text-black"
                    >
                      NonInward Invoice
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Voucher Details */}
            <div className="sm:col-span-5 bg-red-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-black mb-4">Voucher Details</h3>
              <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
                <SelectField
                  onChange={handleInputChange}
                  label="Voucher Type"
                  id="VoucherType"
                  options={[
                    {value: "APO", label: "Advance PO"},
                    {value: "AWO", label: "Advance WO"},
                    {value: "CMG", label: "Composite GRN"},
                    {value: "COM", label: "Composite SRN"},
                    {value: "GWO", label: "PGS-WO Reference"},
                    {value: "NON", label: "Without PO Reference"},
                    {value: "PO", label: "With PO Reference"},
                    {value: "WO", label: "WO Reference"},
                  ]}
                />
                <SelectField
                  label="IsRCM Inward"
                  id="IsInwardRCM"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "NO"},
                    {value:"Y", label: "YES"},
                    
                  ]}
                />
                <SelectField
                  label="Voucher Style:"
                  id="VoucherStyle"
                  onChange={handleInputChange}
                  options={[
                    {value: "AP", label: "AP"},
                    {value: "APJ", label: "APJ"},
                    {value: "APR", label: "APR"},
                    {value: "APD", label: "APD"},
                  ]}
                />
                <InputField id="VoucherReferenceID" label="Reference Voucher ID:"/>
                <SelectField
                  label="Voucher Source:"
                  id="VoucherSource"
                  onChange={handleInputChange}
                  options={[
                    {value: "ALC", label: "ALC"},{value: "AMC", label: "AMC"},{value: "CP", label: "CP"},
                    {value: "HKR", label: "HOSKR"},{value: "HP1", label: "HP1"},{value: "HP2", label: "HP2"},
                    {value: "HP3", label: "HP3"},{value: "HP4", label: "HP4"},{value: "HP5", label: "HP5"},
                    {value: "HP6", label: "HP6"},{value: "OTH", label: "OTHERS"},{value: "PV", label: "PV"},
                    {value: "SSB", label: "SSB"},{value: "SV", label: "SV"}
                  ]}
                />
                <TextArea id="Inward_No" label="Inward Invoice No:" rows={2}/>
                <TextArea label="Inward Description:" rows={2}/>  {/*noprisma*/}
                <InputField onChange={handleDateTimeChange} id="InvoiceDate" label="Invoice Date" type="date"
                value={formData.InvoiceDate? formData.InvoiceDate.slice(0, 16): ""}/>
                <InputField label="Non Inward Invoice No:"/> {/*noprisma*/}
              </div>
            </div>

            {/* Vendor Information */}
            <div className="sm:col-span-5 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-black mb-4">Vendor Information</h3>
              <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
                <InputwButton onClick={onSearch} onChange={handleInputChange} id="VendorID" label="Vendor ID:"/>
                <Label id="VendName" label="Vendor Name:" value={VendName}/>
                <Label id="VAddress1" label="Vendor Address:" rows={2} value={VAddress1}/>
                <Label id="PanNo" label="Pan No:" value={PanNo}/> {/*VM*/}
                <Label id="GSTIN" label="GST Code:"value={GSTIN}/>
                <Label id="StateCode" label="State Code:" value={StateCode}/>  {/*VD*/}
                <Label id="VendorTaxClassification" label="Vendor Tax Classification:" value={VendorTaxClassification}/>  {/*VM*/}
                <InputField label="Vendor Specified Person(Y/N)"/> {/*have to resolve*/}
                <Label id="BankName" label="Bank Name:" value={BankName}/> {/*VD*/}
                <Label id="BranchName" label="Branch Name:" value={BranchName}/>{/*VD*/}
                <Label id="AccountNum" label="Account No:" value={AccountNum}/> {/*VD*/}
                <Label id="IFSCCode" label="IFSC Code:" value={IFSCCode}/> {/*VD*/}
              </div>
            </div>

            {/* Financial Details */}
            <div className="sm:col-span-5 bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-black mb-4">Financial Details</h3>
              <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
                <InputField onChange={handleDateTimeChange} id="AccountingDate" label="Accounting Date:" type='date'/>
                <TextArea onChange={handleInputChange} id="LineNarration" label="Short Narration:"/>
                <InputField label="Voucher Amount:" type='number'/>
                <InputField label="Approval Status:"/> {/*read only element*/}
                <InputField onChange={handleInputChange} id="InvoiceAmount" label="Invoice Amount:" type='number'/>
                <InputField onChange={handleInputChange} id="HoldAmount" label="Hold Amount:"/>
                <InputField onChange={handleInputChange} id="HoldReason" label="Hold Reason:"/>
                <InputField onChange={handleInputChange} id="hasTDS" label="TDS"/>
                <InputField onChange={handleInputChange} id="Inward_No" label="Inward No:" type='number'/>
                <InputField onChange={handleInputChange} id="Misamount" label="Mis Amount:"/>
                <InputField onChange={handleInputChange} id="IGST" label="IGST"/>
                <InputField onChange={handleInputChange} id="CGST" label="CGST"/>
                <InputField onChange={handleInputChange} id="SGST" label="SGST"/>
                <InputField onChange={handleInputChange} id="Cess" label="Cess"/>
                <InputField onChange={handleInputChange} id="TCSAmount" label="Tcs Amount"/>
                <SelectField
                  id='InputTax'
                  label="Input Tax:"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <InputField onChange={handleInputChange} id="ApprovalUnit" label="Approver Unit:"/>
                <InputField onChange={handleInputChange} is="SC_Institute" label="Sundry Creditor Institute"/>
              </div>
            </div>

            {/* Additional Information */}
            <div className="sm:col-span-5 bg-purple-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-black mb-4">Additional Information</h3>
              <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
                <Label value={userid.CreatedBy} id="UserID" label="Created By:"/>
                <InputField onChange={handleDateTimeChange} id="Datem" label="Created Date:" type='date'/>
                <Label value={userid.EnteredBy} id="EnteredBy" label="Entered By:"/>
                <InputField onChange={handleInputChange} id="ApprovedBy" label="Approved By:"/>
                <InputField onChange={handleInputChange} id="ApprovedDate" label="Approved Date:" type='date'/>
                <SelectField
                  id='Ismis'
                  label="Is MIS Bill"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <SelectField
                  id='isMisUploaded'
                  label="Is MIS Uploaded"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <SelectField
                  id='IsServiceCharge'
                  label="Is Service Charges"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <TextArea id="LongNarration" className='sm:col-span-5' label="Long Narration:"/>
                <SelectField
                  label="RCM"
                  id="RCM"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                  ]}
                />
                <SelectField
                  label="Defer Capitalization:"
                  id='DeferCap'
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <SelectField
                  label="Defer Investment:"
                  onChange={handleInputChange}
                  id='DeferInv'
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <SelectField
                  label="Has Asset:"
                  id='HasAsset'
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <SelectField
                  label="Unposted:"
                  id="unposted"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <SelectField
                  label="IsPrepaid:"
                  id="IsPrepaid"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <InputField id="PrepaidID" label="Prepaid ID"/>
                <SelectField
                  id="EmailCategory"
                  label="Email Category:"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <SelectField
                  label="IsSubVendor:"
                  onChange={handleInputChange}
                  id="IsSubVendor"
                  options={[
                    {value: "N", label: "No"},
                    {value: "Y", label: "Yes"},
                    
                  ]}
                />
                <SelectField
                  id='Goods_Services'
                  label="Goods/Services:"
                  onChange={handleInputChange}
                  options={[
                    {value: "N", label: "No"},
                    {value: "other", label: "Other"},
                    
                  ]}
                />
                <InputField id="GRNSRNDate" label="GRN/SRN Date"/>
                <InputField id="DueDate" label="Due Date"/>
                <SelectField
                  id="GSTR1unit"
                  label="GSTR2 unit:"
                  onChange={handleInputChange}
                  options={[
                    {value: "No", label: "No"},
                    {value: "MAHEU", label: "MAHEU"}
                  ]}
                />
              </div>
            </div>

            {/*Voucher Accounting*/}
            <VoucherAccountingForm voucherID={formData.VoucherID} businessUnit={formData.BusinessUnit}
              onUpdate={updateVoucherData}/>
          </div>
          <button onClick={handleSubmit} type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-gray-200 hover:bg-gray-800">
            Save
          </button>
        </form>
      </main>
      {toast && (
            <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {toast.message}
            </div>
        )}
    </div>
  )
}