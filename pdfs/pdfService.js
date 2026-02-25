import PDFDocument from "pdfkit";

export const generateTicketPDF = (res, booking) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=ticket_${booking.ticket_code}.pdf`
  );

  doc.fontSize(20).text("TukiPlan Ticket", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Event: ${booking.title}`);
  doc.text(`Date: ${booking.event_date}`);
  doc.text(`Location: ${booking.location}`);
  doc.text(`Tickets: ${booking.tickets_count}`);
  doc.text(`Ticket Code: ${booking.ticket_code}`);

  doc.moveDown();
  doc.text("Enjoy your event 🎉", { align: "center" });

  doc.pipe(res);
  doc.end();
};