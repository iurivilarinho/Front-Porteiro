import { useState } from "react";
import QRCodePix from "react-qrcode-pix";
import InputCopy from "./input/inputCopy";

interface QRcodeProps {
  pixkey: string; // Chave Pix
  merchant: string; // Nome do destinatário
  city: string; // Cidade do destinatário
  amount: number;
}

const QRCodeGenerator = ({ pixkey, merchant, city, amount }: QRcodeProps) => {
  const [qrContent, setQRContent] = useState<string>("");

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div>
        <QRCodePix
          size={200}
          pixkey={pixkey} // Chave Pix
          merchant={merchant} // Nome do destinatário
          city={city} // Cidade do destinatário
          amount={amount} // Valor da transação
          onLoad={setQRContent}
        />
      </div>
      <div className="mt-6">
        <InputCopy value={qrContent}></InputCopy>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
