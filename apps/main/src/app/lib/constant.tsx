import {
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  RollbackOutlined,
  UsergroupAddOutlined,
  PercentageOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  BankOutlined,
  DollarOutlined,
  TransactionOutlined,
  AuditOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  InboxOutlined,
  OrderedListOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  href: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    href,
    children,
    label,
  } as MenuItem;
}

// Point of Sale Menu Items
export const POSMenus: MenuItem[] = [
  getItem('Dashboard', 'dashboard', '/pos', <DashboardOutlined />),
  getItem('Vendor Profile', 'vendor', '/pos/profile', <UserOutlined />),
  getItem('Products and Inventory', 'inventory', '/pos/inventory', <ShopOutlined />),
  getItem('Sales', 'sales', '/pos/sales', <ShoppingCartOutlined />, [
    getItem('All Sales', 'sales', '/pos/sales', <BarChartOutlined />),
    getItem('Sales Analytics', 'analytics', '/pos/sales/analytics', <TransactionOutlined />),
  ]),
  getItem('Returns and Refunds', 'returns', '/pos/returns', <RollbackOutlined />),
  getItem('Customers', 'customers', '/pos/customers', <UsergroupAddOutlined />, [
    getItem('Customer List', 'customer-list', '/pos/customers/list', <OrderedListOutlined />),
    getItem('Customer Groups', 'customer-groups', '/pos/customers/groups', <TeamOutlined />),
  ]),
  getItem('Discounts', 'discounts', '/pos/discounts', <PercentageOutlined />),
  getItem('Staff Management', 'staff', '/pos/staff', <TeamOutlined />),
  getItem('Reports', 'reports', '/pos/reports', <BarChartOutlined />),
  getItem('Settings', 'settings', '/pos/settings', <SettingOutlined />),
];

// Accounting Menu Items
export const AccountingMenus: MenuItem[] = [
  getItem('Dashboard', 'acc-dashboard', '/accounting/dashboard', <DashboardOutlined />),
  getItem('Financial Overview', 'financial', '/accounting/overview', <BankOutlined />),
  getItem('Revenue', 'revenue', '/accounting/revenue', <DollarOutlined />),
  getItem('Expenses', 'expenses', '/accounting/expenses', <TransactionOutlined />),
  getItem('Transactions', 'acc-transactions', '/accounting/transactions', <AuditOutlined />, [
    getItem('All Transactions', 'all-trans', '/accounting/transactions/all', <OrderedListOutlined />),
    getItem('Pending', 'pending-trans', '/accounting/transactions/pending', <FileTextOutlined />),
  ]),
  getItem('Reports', 'acc-reports', '/accounting/reports', <BarChartOutlined />, [
    getItem('Financial Reports', 'financial-reports', '/accounting/reports/financial', <FileTextOutlined />),
    getItem('Tax Reports', 'tax-reports', '/accounting/reports/tax', <FileTextOutlined />),
  ]),
  getItem('Settings', 'acc-settings', '/accounting/settings', <SettingOutlined />),
];

// Procurement Menu Items
export const ProcurementMenus: MenuItem[] = [
  getItem('Dashboard', 'proc-dashboard', '/procurement/dashboard', <DashboardOutlined />),
  getItem('Suppliers', 'suppliers', '/procurement/suppliers', <ShopOutlined />),
  getItem('Purchase Orders', 'purchase-orders', '/procurement/orders', <ShoppingOutlined />, [
    getItem('Create Order', 'create-order', '/procurement/orders/create', <FileTextOutlined />),
    getItem('Order History', 'order-history', '/procurement/orders/history', <OrderedListOutlined />),
  ]),
  getItem('Inventory Management', 'proc-inventory', '/procurement/inventory', <InboxOutlined />, [
    getItem('Stock Levels', 'stock', '/procurement/inventory/stock', <BarChartOutlined />),
    getItem('Reorder Points', 'reorder', '/procurement/inventory/reorder', <InboxOutlined />),
  ]),
  getItem('Contracts', 'contracts', '/procurement/contracts', <SolutionOutlined />),
  getItem('Reports', 'proc-reports', '/procurement/reports', <BarChartOutlined />),
  getItem('Settings', 'proc-settings', '/procurement/settings', <SettingOutlined />),
];
