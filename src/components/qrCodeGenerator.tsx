import QRCodePix from "react-qrcode-pix";

interface QRcodeProps {
  pixkey: string; // Chave Pix
  merchant: string; // Nome do destinatário
  city: string; // Cidade do destinatário
  amount: number;
}

const QRCodeGenerator = ({ pixkey, merchant, city, amount }: QRcodeProps) => {
  return (
    <div className="flex justify-center items-center ">
      <QRCodePix
        pixkey={pixkey} // Chave Pix
        merchant={merchant} // Nome do destinatário
        city={city} // Cidade do destinatário
        amount={amount} // Valor da transação
      />
    </div>
  );
};

export default QRCodeGenerator;
