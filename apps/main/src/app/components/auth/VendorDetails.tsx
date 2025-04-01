import { Form, Input, Select, Button } from 'antd';



const VendorDetails = () => {


  const businessCategories = [
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
    // Add more categories as needed
  ];

  const businessTypes = [
    { value: 'type1', label: 'Type 1' },
    { value: 'type2', label: 'Type 2' },
    // Add more types as needed
  ];

  const states = [
    { value: 'lagos', label: 'Lagos' },
    { value: 'abuja', label: 'Abuja' },
    // Add more states as needed
  ];



  return (
    <div className="">

        <Form.Item
          label="Business Name"
          name="businessName"
          rules={[{ required: true, message: 'Please enter business name' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Business Category"
          name="businessCategory"
          rules={[{ required: true, message: 'Please select business category' }]}
        >
          <Select
            placeholder="Select business category"
            options={businessCategories}
          />
        </Form.Item>

        <Form.Item
          label="Business Type"
          name="businessType"
          rules={[{ required: true, message: 'Please select business type' }]}
        >
          <Select
            placeholder="Select business type"
            options={businessTypes}
          />
        </Form.Item>

        <Form.Item
          label="Contact Name"
          name="contactName"
          rules={[{ required: true, message: 'Please enter contact name' }]}
        >
          <Input placeholder="Enter contact name" />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Please enter email address' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          label="Business Address"
          name="businessAddress"
          rules={[{ required: true, message: 'Please enter business address' }]}
          extra="Use the business headquarters' address"
        >
          <Input placeholder="Enter business address" />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: 'Please select state' }]}
        >
          <Select
            placeholder="Select state"
            options={states}
          />
        </Form.Item>

        <Form.Item
          label="City/Region"
          name="cityRegion"
          rules={[{ required: true, message: 'Please enter city/region' }]}
        >
          <Input placeholder="Enter city/region" />
        </Form.Item>

        <Form.Item
          label="Street"
          name="street"
          rules={[{ required: true, message: 'Please enter street' }]}
        >
          <Input placeholder="Enter street address" />
        </Form.Item>

    </div>
  );
};

export default VendorDetails;
