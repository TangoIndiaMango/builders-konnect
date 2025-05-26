import { useSessionStorage } from "../../../../hooks/useSessionStorage";

export const mapPDF = (beData: any) => {
  const { businessProfile } = useSessionStorage()
  const parseAmount = (str) =>
    Number(String(str).replace(/[₦,]/g, "")) || 0;

  return {
    receiptNo: beData?.receipt_no || beData?.order_number,
    dateIssued: new Date(beData?.date).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }),
    customer: {
      name: beData?.customer?.name || "N/A",
      phone: beData?.customer?.phone || "N/A",
      email: beData?.customer?.email || "N/A"
    },
    company: {
      name: businessProfile?.business?.name || "N/A",
      address: businessProfile?.business?.address || "N/A",
      email: businessProfile?.business?.email || "N/A"
    },
    items: beData?.line_items?.map((item) => ({
      image: `https://placehold.co/600x400/E6F7FF/black.png?text=${item.product.charAt(0)?.toUpperCase()}`,
      name: item.product,
      desc: "",
      unitPrice: parseAmount(item.unit_cost),
      quantity: item.quantity,
      total: parseAmount(item.total_cost)
    })),
    subtotal: parseAmount(beData?.subtotal),
    discount: parseAmount(
      beData?.total_discount || 0
    ),
    tax: beData?.fees?.tax || 0,
    serviceFee: beData?.fees?.service_fee || 0,
    total: parseAmount(beData?.amount)
  };
}