import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { maskData, ReceiptPDF } from '../../components/sales/view/Reciept';


const ReceiptPreview = () => (
  <div className='w-full h-full'>
    <PDFViewer width="100%" height="100%" showToolbar={false}>
      <ReceiptPDF product={maskData} />
    </PDFViewer>
  </div>
);

export default ReceiptPreview;
