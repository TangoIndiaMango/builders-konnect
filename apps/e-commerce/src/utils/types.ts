export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  howDidYouHear?: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface VerifyEmailData {
  entity: string;
  token: string;
  code: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ForgotPasswordValue {
  email: string;
}

export interface NewPasswordValue {
  password: string;
  password_confirmation: string;
  token: string;
  code: string;
  entity: string;
}

export interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  orderNumber: string;
  orderDate: string;
  orderTime: string;
  deliveryDate: string;
  deliveryTime: string;
  amount: number;
  status: 'Processing' | 'Completed' | 'Cancelled';
  totalItems: number;
  products: OrderProduct[];
  discount?: number;
  deliveryFee?: number;
  paymentMethod: string;
  paymentStatus: 'Successful' | 'Pending' | 'Failed';
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
}


export interface OrderDetailsProps {
  orderNumber: string;
  orderDate: string;
  status: 'Processing' | 'Completed' | 'Cancelled';
  amount: number;
  shippingAddress: Address;
  onBack: () => void;
  onCancel: () => void;
  products: OrderProduct[];
  discount?: number;
  deliveryFee?: number;
  paymentMethod: string;
  paymentStatus: 'Successful' | 'Pending' | 'Failed';
}