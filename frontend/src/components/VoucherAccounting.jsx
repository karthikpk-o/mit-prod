import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import InputwButton from './InputwButton';
import Label from './Label';
import axios from 'axios';

export default function VoucherAccountingForm({ voucherID, businessUnit, onUpdate }) {
  const [voucherData, setVoucherData] = useState({
    debitEntry: {
      BusinessUnit: businessUnit || '',
      VoucherID: voucherID || '',
      Account: '',
      DebitCredit: 'D',
      Amount: '',
      VoucherLine: 1
    },
    creditEntry: {
      BusinessUnit: businessUnit || '',
      VoucherID: voucherID || '',
      Account: '',
      DebitCredit: 'C',
      Amount: '',
      VoucherLine: 2
    }
  });
  const [debitAccountName, setDebitAccountName] = useState('');
  const [creditAccountName, setCreditAccountName] = useState('');

  const handleInputChange = (e, entryType) => {
    const { id, value } = e.target;
    const updatedData = {
      ...voucherData,
      [entryType]: {
        ...voucherData[entryType],
        [id]: value
      }
    };

    setVoucherData(updatedData);

    // Call the onUpdate function to update the parent component's state
    onUpdate(updatedData);
  };

  const onSearch = async (entryType) => {
    const accountNumber = voucherData[entryType].Account;
    if (!accountNumber) {
      console.error('Account number is empty');
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/accdetails", {
        params: { Account: accountNumber }
      });
      if (entryType === 'debitEntry') {
        setDebitAccountName(response.data.ADesc);
      } else {
        setCreditAccountName(response.data.ADesc);
      }
    } catch (error) {
      console.error('Error fetching account details:', error.message);
    }
  };

  useEffect(() => {
    // Update voucher data when voucherID or businessUnit changes
    setVoucherData(prevData => ({
      ...prevData,
      debitEntry: { ...prevData.debitEntry, VoucherID: voucherID, BusinessUnit: businessUnit },
      creditEntry: { ...prevData.creditEntry, VoucherID: voucherID, BusinessUnit: businessUnit }
    }));
  }, [voucherID, businessUnit]);

  return (
    <div className="sm:col-span-5 bg-yellow-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-black mb-4">Voucher Accounting</h3>
      <div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
        <InputwButton
          id="Account"
          label="Account Num:"
          value={voucherData.debitEntry.Account}
          onChange={(e) => handleInputChange(e, 'debitEntry')}
          onClick={() => onSearch('debitEntry')}
        />
        <Label value={debitAccountName} id="DebitAccountName" label="Account Name:" />
        <SelectField
          id="DebitCredit"
          label="DR/CR :"
          value={voucherData.debitEntry.DebitCredit}
          onChange={(e) => handleInputChange(e, 'debitEntry')}
          options={[{ value: 'D', label: 'DR' }]}
        />
        <InputField
          id="Amount"
          label="Amount: "
          value={voucherData.debitEntry.Amount}
          onChange={(e) => handleInputChange(e, 'debitEntry')}
        />

        <InputwButton
          id="Account"
          label="Account Num:"
          value={voucherData.creditEntry.Account}
          onChange={(e) => handleInputChange(e, 'creditEntry')}
          onClick={() => onSearch('creditEntry')}
        />
        <Label value={creditAccountName} id="CreditAccountName" label="Account Name:" />
        <SelectField
          id="DebitCredit"
          label="DR/CR :"
          value={voucherData.creditEntry.DebitCredit}
          onChange={(e) => handleInputChange(e, 'creditEntry')}
          options={[{ value: 'C', label: 'CR' }]}
        />
        <InputField
          id="Amount"
          label="Amount: "
          value={voucherData.creditEntry.Amount}
          onChange={(e) => handleInputChange(e, 'creditEntry')}
        />
      </div>
    </div>
  );
}