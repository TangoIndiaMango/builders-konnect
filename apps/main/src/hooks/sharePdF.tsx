import { pdf } from '@react-pdf/renderer';
import { maskData, ReceiptPDF } from '../app/components/sales/view/Reciept';

const useSharePDF = () => {
  const handleSharePDF = async (
    invoiceNumber: string,
    data: any = maskData
  ) => {
    const blob = await pdf(<ReceiptPDF product={data} />).toBlob();

    const file = new File(
      [blob],
      `invoice-${invoiceNumber || 'download'}.pdf`,
      { type: 'application/pdf' }
    );

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: `Invoice ${invoiceNumber}`,
        text: 'Please find your invoice attached.',
        files: [file],
      });
    } else {
      // Fallback: download the PDF
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      alert(
        'Sharing PDF is not supported on this device. The PDF has been downloaded instead.'
      );
    }
  };

  const handleCopyPDFLink = (
    invoiceData: any,
    setShowCopied: (val: boolean) => void
  ) => {
    const id = invoiceData?.id || invoiceData?.invoiceId;
    const pdfUrl = `${window.location.origin}/invoice/${id}/pdf`;

    navigator.clipboard.writeText(pdfUrl).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const handleDownload = async (
    invoiceNumber: string,
    data: any = maskData
  ) => {
    const blob = await pdf(<ReceiptPDF product={data} />).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceNumber || 'download'}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return { handleSharePDF, handleCopyPDFLink, handleDownload };
};

export default useSharePDF;
