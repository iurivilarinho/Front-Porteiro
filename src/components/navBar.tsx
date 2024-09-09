import { Share2, Ticket, TicketCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "./button/button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog/dialog";
import { Input } from "./input/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const isValidCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let soma;
  let resto;

  // Validação do primeiro dígito verificador
  soma = 0;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};
const cpfSchema = z.object({
  cpf: z.string().refine(isValidCPF, {
    message: "CPF inválido!",
  }),
});

type findCpf = z.infer<typeof cpfSchema>;

const BottomNavBar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<findCpf>({ resolver: zodResolver(cpfSchema) });

  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>();

  // Função que será chamada após a validação
  const handleOnSubmit = (data: findCpf) => {
    const { cpf } = data;
    navigate(`/rifas/${cpf}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Título da página",
          text: "Texto a ser compartilhado",
          url: window.location.href, // URL da página atual ou a URL que você quer compartilhar
        })
        .then(() => console.log("Compartilhamento bem-sucedido"))
        .catch((error) => console.log("Erro no compartilhamento", error));
    } else {
      console.log("A API de compartilhamento não é suportada neste navegador.");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white flex justify-around p-4 sm:hidden">
      <div className="flex flex-col items-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <TicketCheck className="h-6 w-6" />
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col justify-center">
              <Input
                label="Informe o CPF usado na compra"
                {...register("cpf")}
                notification={{
                  isError: Boolean(errors.cpf),
                  notification: errors.cpf?.message,
                }}
              />
              <Button
                className="mt-3"
                onClick={handleSubmit((data) => {
                  handleOnSubmit(data);
                  setOpen(false);
                })}
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <span className="text-xs">Minhas Compras</span>
      </div>
      <div className="flex flex-col items-center">
        <Ticket
          onClick={() => {
            navigate("/rifas");
          }}
          className="h-6 w-6"
        />
        <span className="text-xs">Descobrir</span>
      </div>
      <div className="flex flex-col items-center">
        <Share2 onClick={handleShare} className="h-6 w-6" />
        <span className="text-xs">Compartilhar</span>
      </div>
    </div>
  );
};

export default BottomNavBar;
