'use client';

import { useState } from 'react';
import { Button, Modal, Input, Select, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { sterling, visa } from '../../lib/assets/icons';

const { Option } = Select;

type CardType = {
  last4: string;
  type: string;
};

type BankType = {
  bankName: string;
  accountNumber: string;
  accountName: string;
};

const PaymentMethodPage = () => {
  const [cards, setCards] = useState<CardType[]>([
    { last4: '1234', type: 'visa' },
  ]);

  const [banks, setBanks] = useState<BankType[]>([
    {
      bankName: 'Union Bank',
      accountNumber: '00501235455',
      accountName: 'John Doe',
    },
  ]);

  const [showCardModal, setShowCardModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showBankOptions, setShowBankOptions] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');

  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<'card' | 'bank' | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAddCard = () => {
    if (cardNumber && cvv && expiry) {
      const last4 = cardNumber.slice(-4);
      setCards([...cards, { last4, type: 'visa' }]);
      setCardNumber('');
      setCvv('');
      setExpiry('');
      setShowCardModal(false);
      message.success('Card added successfully');
    }
  };

  const handleAddBank = () => {
    if (bankName && accountNumber && accountName) {
      setBanks([...banks, { bankName, accountNumber, accountName }]);
      setBankName('');
      setAccountNumber('');
      setAccountName('');
      setShowBankModal(false);
      message.success('Bank added successfully');
    }
  };

  const promptDeleteCard = (index: number) => {
    setDeleteType('card');
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const promptDeleteBank = (index: number) => {
    setDeleteType('bank');
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteType === 'card' && deleteIndex !== null) {
      const updated = [...cards];
      updated.splice(deleteIndex, 1);
      setCards(updated);
      message.success('Card deleted successfully');
    }

    if (deleteType === 'bank' && deleteIndex !== null) {
      const updated = [...banks];
      updated.splice(deleteIndex, 1);
      setBanks(updated);
      message.success('Bank account deleted successfully');
    }

    setDeleteModalOpen(false);
    setDeleteType(null);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setDeleteType(null);
    setDeleteIndex(null);
  };

  return (
    <div className="p-8 ">
      <h1 className="text-xl md:text-3xl font-medium mb-8">Payment Method</h1>

      {cards.length === 0 && banks.length === 0 && (
        <p className="text-gray-600 mb-6">You haven't added any cards yet</p>
      )}

      {cards.map((card, index) => (
        <div
          key={index}
          className="flex text-[#000000D9] justify-between items-center border rounded-md px-4 py-2 mb-4"
        >
          <div className="flex gap-2">
            <img
              src={visa}
              className="w-[24px]"
              alt="visa"
            />
            **** {card.last4}
          </div>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => promptDeleteCard(index)}
          />
        </div>
      ))}

      {banks.map((bank, index) => (
        <div
          key={index}
          className="flex justify-between items-center border rounded-md px-4 py-2 mb-4"
        >
          <div className="flex gap-2">
            <img
              src={sterling}
              className="w-[24px]"
              alt="visa"
            />
            {bank.accountNumber} • {bank.bankName}
          </div>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => promptDeleteBank(index)}
          />
        </div>
      ))}

      <div className="flex flex-col gap-4 mt-6">
        <Button
          type="link"
          icon={<PlusOutlined />}
          onClick={() => setShowCardModal(true)}
        >
          Add New Card
        </Button>
        <Button
          type="link"
          icon={<PlusOutlined />}
          onClick={() => setShowBankModal(true)}
        >
          Add New Bank
        </Button>
      </div>
      <Modal
        className="rounded-lg shadow-md text-lg md:text-2xl"
        open={showCardModal}
        title="Add New Card"
        onCancel={() => setShowCardModal(false)}
        onOk={handleAddCard}
        okText="Add Card"
        okButtonProps={{
          disabled: !cardNumber || !cvv || !expiry,
          className: 'bg-blue-200 text-black hover:bg-blue-300 border-none',
        }}
        centered
      >
        <div className="mb-6  mt-6">
          <label className="block text-gray-700 mb-2">Card Number</label>
          <Input
            placeholder="Enter"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="mb-3 p-3 h-auto"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">CVV</label>
            <Input
              placeholder="Enter"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="mb-3 p-3 h-auto"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Expiry Date</label>
            <Input
              placeholder="Enter"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="mb-3 p-3 h-auto"
            />
          </div>
        </div>
      </Modal>
      <Modal
        open={showBankModal}
        title="Add New Bank"
        onCancel={() => setShowBankModal(false)}
        onOk={handleAddBank}
        okText="Add Bank"
        okButtonProps={{
          disabled: !bankName || !accountNumber || !accountName,
          className: 'bg-blue-200 text-black hover:bg-blue-300 border-none',
        }}
        centered
      >
        <div className="mb-6 mt-6">
          <label className="block text-gray-700 mb-2">Bank Name</label>
          <Select
            showSearch
            placeholder="Search"
            value={bankName || undefined}
            onChange={(value) => setBankName(value)}
            className="w-full mb-3"
            dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
          >
            <Option value="Union Bank">Union Bank</Option>
            <Option value="Zenith Bank">Zenith Bank</Option>
            <Option value="GTBank">GTBank</Option>
            <Option value="Access Bank">Access Bank</Option>
          </Select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Account Number</label>
          <Input
            placeholder="Enter"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mb-3 p-3 h-auto"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Account Name</label>
          <Input
            placeholder="Enter"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="p-3 h-auto"
          />
        </div>
      </Modal>

      <Modal
        open={deleteModalOpen}
        title="Delete Account"
        onCancel={cancelDelete}
        onOk={confirmDelete}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
        centered
      >
        <p>
          Are you sure you want to delete this{' '}
          {deleteType === 'card' ? 'card' : 'bank account'}? Please note this
          action is not irreversible.
        </p>
      </Modal>
    </div>
  );
};

export default PaymentMethodPage;
