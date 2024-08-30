import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./button/button";
import { useState } from "react";
import QRCodeGenerator from "./qrCodeGenerator";

interface RandomProps {
  totalPrice: number;
  quotesSelected: Set<string>;
  valueQrCode: string;
  disableButton: boolean;
}

const DialogPayment = ({
  valueQrCode,
  quotesSelected,
  totalPrice,
  disableButton,
}: RandomProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={disableButton} className="mb-4 w-32 h-16">
          Reservar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Opções de Pagamento</DialogTitle>
          <DialogDescription>
            Escolha uma das formas de pagamento
          </DialogDescription>
        </DialogHeader>
        <p>Confira abaixo as cotas que você esta reservando:</p>
        <div className="flex flex-row flex-wrap p-2 overflow-y-auto max-h-28">
          {Array.from(quotesSelected).map((number, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded border ml-1 mt-1 w-8 "
            >
              <p>{number}</p>
            </div>
          ))}
        </div>
        <p>
          Valor total:{" "}
          {totalPrice
            .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
            .replace("R$", "")}
        </p>
        <p>QR code para pagamento:</p>
        <QRCodeGenerator
          pixkey="+5534996444008" // Chave Pix
          merchant="Your Name" // Nome do destinatário
          city="Your City" // Cidade do destinatário
          amount={totalPrice} //valor a ser pago
        ></QRCodeGenerator>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false); // Fechar o Dialog ao clicar em Confirmar
            }}
          >
            Confirmar
          </Button>

          <a
            href="https://wa.me/+5534996444008"
            target="_blank"
            rel="noopener noreferrer"
            className="my-2"
          >
            <Button className="w-full">Enviar comprovante de pagamento</Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPayment;
