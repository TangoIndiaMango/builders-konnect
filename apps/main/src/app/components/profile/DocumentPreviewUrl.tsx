import { Image, Modal } from 'antd';

interface DocumentPreviewModalProps {
  open: boolean;
  onClose: () => void;
  fileUrl: string | null;
}

export function getFileName(url: string) {
  try {
    return decodeURIComponent(url.split('/').pop() || '');
  } catch {
    return 'File **';
  }
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  open,
  onClose,
  fileUrl,
}) => {
  if (!fileUrl) {
    return (
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        title="Document Preview"
      >
        <div className="text-center text-gray-500">N/A</div>
      </Modal>
    );
  }

  const isPdf = fileUrl.endsWith('.pdf');
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileUrl);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={getFileName(fileUrl)}
      width={isPdf ? 800 : 400}
      style={{ minHeight: isPdf ? 600 : 200 }}
    >
      {isPdf ? (
        <iframe
          src={fileUrl}
          title="PDF Preview"
          width="100%"
          height="600"
          style={{ border: 0 }}
        />
      ) : isImage ? (
        <Image
          src={fileUrl}
          alt="Document"
          className="max-w-full max-h-[500px] mx-auto"
        />
      ) : (
        <div className="text-center text-gray-500">Unsupported file type</div>
      )}
    </Modal>
  );
};
