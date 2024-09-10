import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePostReservation } from "@/lib/api/tanstackQuery/reservation";
import { Reservation } from "@/types/reserva";
import { CopyAndPaste } from "pixjs";
import { Button } from "./button/button";
import InputCopy from "./input/inputCopy";
import QRCodeGenerator from "./qrCodeGenerator";
import { UserFormType } from "@/types/usuario";
import { Pessoa } from "@/types/pessoa";

interface PaymentCardProps {
  totalPrice: number;
  quotesSelected: Set<string>;
  valueQrCode: string;
  rifaId: number;
  userData: UserFormType | null;
  userCreation: Pessoa;
}

const PaymentCard = ({
  userCreation,
  quotesSelected,
  totalPrice,
  rifaId,
  userData,
}: PaymentCardProps) => {
  const { mutate: postReservation, isPending } = usePostReservation();

  const submitForm = () => {
    if (!userData) {
      console.error("Dados do usuário não disponíveis");
      return;
    }

    const quotasId = Array.from(quotesSelected).map(Number);

    const reservation: Reservation = {
      quotasId: quotasId,
      userPurchase: userData,
      rifaId: rifaId,
    };

    postReservation(reservation, {
      onSuccess: () => {
        console.log("Reserva realizada com sucesso!");
      },
      onError: (error) => {
        console.error("Erro ao realizar reserva:", error);
      },
    });
  };
{console.log(userCreation.paymentInformation)}
  const copyAndPaste = CopyAndPaste({
    name: userCreation.nome,
    key: userCreation.paymentInformation.pixKey,
    amount: totalPrice,
    city: "Ituiutaba",
    id: "000000",
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opções de Pagamento</CardTitle>
        <CardDescription>Escolha uma das formas de pagamento</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Confira abaixo as cotas que você está reservando:</p>
        <div className="flex flex-row flex-wrap p-2 overflow-y-auto max-h-28">
          {Array.from(quotesSelected).map((number, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded border ml-1 mt-1 w-8"
            >
              <p>{number}</p>
            </div>
          ))}
        </div>
        <p className="my-5 font-bold">
          Valor total:
          {totalPrice
            .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
            .replace("R$", "")}
        </p>
        <p>QR code para pagamento:</p>

        <Dialog>
          <DialogTrigger>
            <Button className="mt-5">Visualizar QR code</Button>
          </DialogTrigger>
          <DialogContent>
            <QRCodeGenerator
              pixkey="+5534996444008"
              merchant="Your Name"
              city="Your City"
              amount={totalPrice}
            />
          </DialogContent>
        </Dialog>
        <div className="mt-6">
          <InputCopy value={copyAndPaste.payload}></InputCopy>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-center p-2">
        <div className="flex items-center justify-center p-2 rounded">
          <a
            href="https://wa.me/+5534996444008"
            target="_blank"
            rel="noopener noreferrer"
            className="items-center rounded px-4 py-1"
          >
            <Button onClick={submitForm}>
              Enviar comprovante de pagamento
            </Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentCard;
