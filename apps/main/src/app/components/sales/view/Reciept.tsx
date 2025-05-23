// apps/main/src/app/components/pdf/ReceiptPDF.tsx
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { sidebar_logo } from '../../../lib/assets/logo';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/fonts/Roboto-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/fonts/Roboto-Bold.ttf',
      fontWeight: 'bold',
    },
    {
      src: '/fonts/Roboto-SemiBold.ttf',
      fontWeight: 'semibold',
    },
    {
      src: '/fonts/Roboto-Medium.ttf',
      fontWeight: 'medium',
    },
    {
      src: '/fonts/Roboto-Regular.ttf',
      fontWeight: 'light',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 11,
    padding: 32,
    backgroundColor: '#fff',
    color: '#222',
  },
  header: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderBottomStyle: 'solid',
    paddingBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logo: {
    width: 90,
    height: 40,
    objectFit: 'contain',
  },
  receiptInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  receiptNoBlock: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  receiptNoLabel: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
  },
  receiptNo: {
    fontSize: 22,
    fontWeight: 700,
    color: '#222',
  },
  dateBlock: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
    textAlign: 'right',
  },
  dateValue: {
    fontSize: 13,
    fontWeight: 500,
    color: '#222',
    textAlign: 'right',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  infoBlockCustomer: {
    width: '48%',
  },
  infoBlockCompany: {
    width: '48%',
    textAlign: 'right',
  },
  infoTitle: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
    fontWeight: 500,
  },
  infoText: {
    fontSize: 11,
    marginBottom: 2,
    color: '#222',
    fontWeight: 500,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginTop: 24,
    marginBottom: 10,
  },
  table: {
    width: '100%',
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderStyle: 'solid',
    minHeight: 40,
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 28,
  },
  tableCell: {
    padding: 6,
    fontSize: 11,
    flexGrow: 1,
    flexBasis: 0,
  },
  productImage: {
    width: 32,
    height: 32,
    marginRight: 8,
    objectFit: 'cover',
    borderRadius: 4,
  },
  summary: {
    backgroundColor: '#f8fafd',
    padding: 12,
    marginTop: 8,
    borderRadius: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#888',
  },
  summaryTotal: {
    fontWeight: 700,
    fontSize: 16,
    marginTop: 8,
    textAlign: 'right',
  },
});

export const maskData = {
  receiptNo: '12345',
  dateIssued: '14th March 2025',
  customer: {
    name: 'Yemi Gabriel',
    phone: '09045565473',
    email: 'oluwawemilowo@gmail.com',
  },
  company: {
    name: "Builder's Construction Limited",
    address: 'No. 18 Jethro Close, Cannanland, Lagos.',
    email: 'oluwawemilowo@gmail.com',
  },
  items: [
    {
      image: 'https://placehold.co/600x400.png?text=Product', // Replace with your product image
      name: 'Premium Cement',
      desc: '10kg Smooth',
      unitPrice: 25000,
      quantity: 2,
      total: 50000,
    },
    {
      image: 'https://placehold.co/600x400/red/blue.png?text=P',
      name: 'Premium Cement',
      desc: '10 kg Coarse',
      unitPrice: 25000,
      quantity: 5,
      total: 150000,
    },
  ],
  subtotal: 60000,
  discount: 0,
  tax: 60000,
  serviceFee: 1000,
  total: 63250,
};

export const ReceiptPDF = ({ product }: { product: any }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Image src="bk_logo.png" style={styles.logo} />
        </View>
        <View style={styles.receiptInfo}>
          <View style={styles.receiptNoBlock}>
            <Text style={styles.receiptNoLabel}>RECEIPT NO:</Text>
            <Text style={styles.receiptNo}>#{product?.receiptNo}</Text>
          </View>
          <View style={{ width: 32 }} /> {/* Spacer */}
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Date Issued</Text>
            <Text style={styles.dateValue}>{product?.dateIssued}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoBlockCustomer}>
            <Text style={styles.infoTitle}>Customer Information</Text>
            <Text style={styles.infoText}>{product?.customer?.name}</Text>
            <Text style={styles.infoText}>{product?.customer?.phone}</Text>
            <Text style={styles.infoText}>{product?.customer?.email}</Text>
          </View>
          <View style={{ width: 32 }} /> {/* Spacer */}
          <View style={styles.infoBlockCompany}>
            <Text style={styles.infoTitle}>Company Information</Text>
            <Text style={styles.infoText}>{product?.company?.name}</Text>
            <Text style={styles.infoText}>{product?.company?.address}</Text>
            <Text style={styles.infoText}>{product?.company?.email}</Text>
          </View>
        </View>
      </View>

      {/* Items Table */}
      <Text style={styles.sectionTitle}>List of Items</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, { flex: 2 }]}>Product</Text>
          <Text style={styles.tableCell}>Unit Price</Text>
          <Text style={styles.tableCell}>Quantity</Text>
          <Text style={styles.tableCell}>Total Price</Text>
        </View>
        {product?.items?.map((item: any, idx: number) => (
          <View style={styles.tableRow} key={idx}>
            <View
              style={[
                styles.tableCell,
                { flex: 2, flexDirection: 'row', alignItems: 'center' },
              ]}
            >
              <Image src={item.image} style={styles.productImage} />
              <View>
                <Text style={{ fontWeight: 400, width: '140px' }}>
                  {item.name}
                </Text>
                <Text style={{ color: '#888', fontSize: 9 }}>{item.desc}</Text>
              </View>
            </View>
            <Text style={styles.tableCell}>
              {'\u20A6'}
              {item.unitPrice.toLocaleString()}
            </Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>
              {'\u20A6'}
              {item.total.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text>
            Subtotal ({product?.items?.reduce((acc, i) => acc + i.quantity, 0)}{' '}
            item)
          </Text>
          <Text>
            {'\u20A6'}
            {product?.subtotal.toLocaleString()}
          </Text>
        </View>
        {product?.discount && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.summaryLabel}>
              {'\u20A6'}
              {product?.discount.toLocaleString()}
            </Text>
          </View>
        )}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (7.5% VAT)</Text>
          <Text style={styles.summaryLabel}>
            {'\u20A6'}
            {product?.tax.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service fee</Text>
          <Text style={styles.summaryLabel}>
            {'\u20A6'}
            {product?.serviceFee.toLocaleString()}
          </Text>
        </View>
        <Text style={styles.summaryTotal}>
          TOTAL ₦{product?.total.toLocaleString()}
        </Text>
      </View>
    </Page>
  </Document>
);
