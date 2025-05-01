'use client';

import { useState } from 'react';
import { Select, Button, Rate, Collapse } from 'antd';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


export default function Detail() {
  const [selectedSize, setSelectedSize] = useState('1285cm by 192cm');
  const [selectedColor, setSelectedColor] = useState('brown');

  const colors = [
    { name: 'brown', hex: '#8B4513' },
    { name: 'black', hex: '#000000' },
    { name: 'beige', hex: '#D2B48C' },
    { name: 'white', hex: '#FFFFFF' },
  ];

  return (
    <div className="w-full mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Eurohome Dartmoor Wood Planks Laminate Flooring, 1.48m²
      </h1>

      <Link
              className="text-blue-600 hover:underline mb-6 inline-block" to="/vendor-store"     >
        Visit Builder&apos;s connect store
      </Link>

      <div className="flex items-center mt-4 mb-2">
        <Rate
          allowHalf
          defaultValue={4.5}
          disabled
          className="text-yellow-400"
        />
        <span className="text-gray-500 ml-2">(567)</span>
      </div>

      <div className="mt-6 mb-8">
        <h2 className="text-4xl font-bold">₦ 23,803</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">Quantity :</label>
          <Select
            className="w-full"
            placeholder="Select Qty"
            suffixIcon={<DownOutlined />}
            options={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
            ]}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Surface :</label>
          <Select
            className="w-full"
            placeholder="Select Material"
            suffixIcon={<DownOutlined />}
            options={[
              { value: 'matte', label: 'Matte' },
              { value: 'glossy', label: 'Glossy' },
              { value: 'textured', label: 'Textured' },
            ]}
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-gray-700 mb-2">Length by Width :</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['1285cm by 192cm', '1400cm by 200cm', '2355cm by 334cm'].map(
            (size) => (
              <button
                key={size}
                className={`border rounded-md py-3 px-4 text-center ${
                  selectedSize === size
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-700'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            )
          )}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-gray-700 mb-2">Color</label>
        <div className="flex space-x-3 mt-2">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`w-10 h-10 rounded-full border-2 ${
                selectedColor === color.name
                  ? 'border-blue-500'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.name)}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      </div>

      <div className="text-gray-600 mb-6">
        <p>
          Transform your living space with our Glossy White Ceramic Wall Tile,
          perfect for kitchens, bathrooms, and living room walls. With a smooth
          glossy finish, it adds elegance and brightness to any interior.
        </p>
      </div>

      <Link to="#" className="text-blue-600 hover:underline block mb-8">
        See More Product Details
      </Link>

      <Button
        type="primary"
        size="large"
        block
        className="h-14 text-lg bg-blue-800 hover:bg-blue-700"
        icon={<ShoppingCartOutlined />}
      >
        Add To Cart
      </Button>

      <Collapse
        className="mt-6 border border-gray-200 rounded-md"
        items={[
          {
            key: '1',
            label: (
              <span className="text-lg font-medium">How much will I need?</span>
            ),
            children: (
              <div>
                <p>To calculate how much flooring you'll need:</p>
                <ol className="list-decimal ml-5 mt-2">
                  <li>Measure the length and width of your room in meters</li>
                  <li>
                    Multiply these measurements to get the area in square meters
                  </li>
                  <li>Add 10% extra for cuts and waste</li>
                  <li>
                    Divide by 1.48 (the area per pack) to determine how many
                    packs you need
                  </li>
                </ol>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
