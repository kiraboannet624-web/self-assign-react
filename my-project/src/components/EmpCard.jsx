import React from "react";
import html2canvas from "html2canvas";
import { useRef } from "react";

function EmpCard({ employee }) {
  const { name, email, phone, website, company, id } = employee;
  const cardRef = useRef(null);

  const downloadCard = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `${name}-employee-card.png`;
    link.click();
  };

  const printCard = () => {
    if (!cardRef.current) return;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${name} - Employee Card</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .card { border: 1px solid #111; border-radius: 10px; padding: 20px; max-width: 460px; }
          .card h2 { margin-top: 0; }
          .card-actions { display: none; }
        </style>
      </head>
      <body>
        ${cardRef.current.outerHTML}
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="card" ref={cardRef}>
      <h2>{name}</h2>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Website:</strong> {website}</p>
      <p><strong>Company:</strong> {company.name}</p>

      <div className="card-actions no-print">
        <button onClick={printCard}>Print Card</button>
        <button onClick={downloadCard}>Download Card</button>
      </div>
    </div>
  );
}

export default EmpCard;
