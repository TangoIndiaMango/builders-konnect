export const mapPDF = (beData: any) => {

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
      name: beData?.customer?.name || "",
      phone: beData?.customer?.phone || "",
      email: beData?.customer?.email || ""
    },
    company: {
      name: "Builder's Construction Limited",
      address: "No. 18 Jethro Close, Cannanland, Lagos.",
      email: "info@builderskonnect.com"
    },
    items: beData?.line_items?.map((item) => ({
      image: `https://placehold.co/600x400/E6F7FF/black.png?text=${item.product.charAt(0)?.toUpperCase()}`, // or your product image if available
      name: item.product,
      desc: "", // add description if available
      unitPrice: parseAmount(item.unit_cost),
      quantity: item.quantity,
      total: parseAmount(item.total_cost)
    })),
    subtotal: parseAmount(beData?.subtotal),
    discount: parseAmount(
      beData?.discount_breakdown?.order_discount || 0
    ),
    tax: beData?.fees?.tax || 0,
    serviceFee: beData?.fees?.service_fee || 0,
    total: parseAmount(beData?.amount)
  };
}