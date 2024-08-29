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
import { Input } from "./input/input";
import { useState, useEffect } from "react";
import useValidation from "@/lib/hooks/useValidation";

interface IntervalProps {
  onGenerate: (numbers: number[]) => void;
  max: number;
}

const DialogInterval = ({ max, onGenerate }: IntervalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    values: formValues,
    handleChange,
    validateField,
    validateForm,
    errors,
  } = useValidation(
    {
      de: (value) => {
        if (!value && value !== 0) return "Campo obrigatório";
        if (value < 0) return "Valor deve ser maior ou igual a 0";
        if (value > formValues.ate)
          return "Valor deve ser menor ou igual ao campo 'Até'";
        return null;
      },
      ate: (value) => {
        if (!value && value !== 0) return "Campo obrigatório";
        if (value < 0) return "Valor deve ser maior ou igual a 0";
        if (value < formValues.de)
          return "Valor deve ser maior ou igual ao campo 'De'";
        if (value > max) return `Valor deve ser menor ou igual a ${max}`;
        return null;
      },
    },
    {
      de: 0,
      ate: max,
    }
  );

  const handleGenerateNumberInterval = () => {
    if (validateForm()) {
      const numbers: number[] = [];
      for (let i = formValues.de; i <= formValues.ate; i++) {
        numbers.push(i);
      }
      onGenerate(numbers);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Exemplo para setar valores iniciais, se necessário
    handleChange("de", 0);
    handleChange("ate", max);
  }, [max]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 w-32 h-16">Selecionar faixa</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Selecionar cotas entre um intervalo numérico
          </DialogTitle>
          <DialogDescription>
            Informe sobre qual intervalo deseja selecionar.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            label="De:"
            type="number"
            name="de"
            value={formValues.de}
            min={0}
            max={formValues.ate}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              handleChange("de", value);
            }}
            onBlur={(e) => {
              const value = Math.max(
                0,
                Math.min(parseInt(e.target.value, 10), formValues.ate)
              );
              handleChange("de", value);
              validateField("de", value);
            }}
            notification={{
              isError: Boolean(errors.de),
              notification: errors.de ?? "",
            }}
          />

          <Input
            label="Até:"
            type="number"
            name="ate"
            value={formValues.ate}
            min={formValues.de}
            max={max}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              handleChange("ate", value);
            }}
            onBlur={(e) => {
              const value = Math.max(
                formValues.de,
                Math.min(parseInt(e.target.value, 10), max)
              );
              handleChange("ate", value);
              validateField("ate", value);
            }}
            notification={{
              isError: Boolean(errors.ate),
              notification: errors.ate ?? "",
            }}
          />
        </div>
        <DialogFooter className="items-center">
          <Button
            className="mb-4 w-36 h-16"
            onClick={handleGenerateNumberInterval}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogInterval;
