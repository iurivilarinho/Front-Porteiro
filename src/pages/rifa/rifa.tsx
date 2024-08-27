import ButtonRifa from "@/components/button/buttonRifa";
import ImageDisplay from "@/components/image/ImageDisplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const Rifa = () => {
  type SelectedButtonsState = Set<string>;

  const buttons = Array.from({ length: 10000 }, (_, index) =>
    index.toString().padStart(2, "0")
  );

  // Estado para gerenciar a seleção dos botões
  const [selectedButtons, setSelectedButtons] = useState<SelectedButtonsState>(
    new Set()
  );

  // Função para alternar a seleção dos botões
  const handleButtonClick = (label: string) => {
    setSelectedButtons((prev) => {
      const updated = new Set(prev);
      if (updated.has(label)) {
        updated.delete(label); // Desmarcar se já estiver selecionado
      } else {
        updated.add(label); // Marcar se não estiver selecionado
      }
      return updated;
    });
  };

  return (
    <div>
      <div className="flex justify-center" >
        <Card className="w-screen mx-10 mb-10">
          <CardHeader>
            <CardTitle>XJ6</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
            <ImageDisplay></ImageDisplay>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-5 gap-2 mx-10">
        {buttons.map((button, index) => (
          <ButtonRifa
            key={index}
            label={button}
            onClickSelect={() => handleButtonClick(button)}
            selected={selectedButtons.has(button)}
          ></ButtonRifa>
        ))}
      </div>
    </div>
  );
};

export default Rifa;
