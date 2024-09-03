import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./input";

interface InputCopyProps {
  value: string;
}

const InputCopy = ({ value }: InputCopyProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        })
        .catch((err) => {
          console.error("Erro ao copiar para a área de transferência: ", err);
        });
    } else {
      // Fallback para dispositivos que não suportam clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (err) {
        console.error("Erro ao copiar para a área de transferência: ", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex flex-row items-end">
      <div className="flex items-center">
        <Input
          value={value}
          readOnly
          className="w-full"
          label="Copie e cole para pagar via PIX!"
        />
      </div>
      <div className="relative">
        <Button className="h-10" onClick={handleCopy}>
          Copiar
        </Button>
        {copied && (
          <div className="absolute top-full mt-2 text-sm text-center bg-gray-200 p-1 rounded">
            Copiado!
          </div>
        )}
      </div>
    </div>
  );
};

export default InputCopy;
