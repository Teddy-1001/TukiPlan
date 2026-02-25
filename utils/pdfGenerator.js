import PDFDocument from "pdfkit";
import QRCode from "qrcode";

export const generateTicketPDF = async (res, booking) => {
    try {
        const doc = new PDFDocument({ size: 'letter', margin: 40 });

        // ===== QR Code first =====
        const qrData = `http://localhost:3300/verify/${booking.ticket_code}`;
        const qrImage = await QRCode.toDataURL(qrData);
        const qrBuffer = Buffer.from(qrImage.split(",")[1], "base64");

        // ===== Start piping AFTER QR is ready =====
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=ticket-${booking.ticket_code}.pdf`
        );
        doc.pipe(res);

        // Background
        doc.rect(0, 0, doc.page.width, doc.page.height).fill("#121212");

        // Header
        doc.fontSize(32).fillColor("#7b2cff").text("TukiPlan Ticket", { align: "center" });
        doc.moveDown(1.5);

        // Ticket card
        const cardX = 50, cardY = doc.y, cardWidth = doc.page.width - 100, cardHeight = 320;
        doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 20).fillAndStroke("#121212", "#7b2cff").lineWidth(3);

        // Event title
        doc.fillColor("#00f5ff").fontSize(24).text(booking.title, cardX + 20, cardY + 20);

        // Event details
        doc.fillColor("#ccc").fontSize(14)
            .text(`Date: ${new Date(booking.event_date).toLocaleString()}`)
            .text(`Location: ${booking.location}`)
            .text(`Tickets: ${booking.tickets_count}`)
            .text(`Ticket Code: ${booking.ticket_code}`)

        // QR Code
        const qrSize = 130;
        doc.image(qrBuffer, cardX + cardWidth - qrSize - 25, cardY + 50, { width: qrSize, height: qrSize });

        // Footer
        doc.fontSize(12).fillColor("#999")
            .text("Show this ticket at entry. QR code will be scanned.", cardX, cardY + cardHeight + 15, {
                align: "center",
                width: cardWidth
            });

        doc.end();

    } catch (error) {
        console.error("PDF Error:", error);
        // Don't send headers if PDF has started piping
        if (!res.headersSent) {
            res.status(500).send("Error generating PDF");
        }
    }
};