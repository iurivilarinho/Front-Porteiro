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
import { useEffect, useState } from "react";
import { useGetRifaById } from "@/lib/api/tanstackQuery/rifa";


const RifaPage = () => {
  type SelectedButtonsState = Set<string>;

  const { data: dataRifa, isLoading: isLoadingRifa } = useGetRifaById(3);

  useEffect(() => {

  }, [isLoadingRifa])


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

  if (isLoadingRifa) {
    return <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>

    </div>
    // Exibe uma mensagem de carregamento
  }

  return (
    <div>
      <div className="flex justify-center" >
        <Card className="w-screen mx-10 mb-10">
          <CardHeader>
            <CardTitle>{dataRifa?.title}</CardTitle>
            <CardDescription>{dataRifa?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
            <ImageDisplay {...dataRifa?.image}></ImageDisplay>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-5 gap-2 mx-10">
        {dataRifa?.cotas.map((cota: Cota) => (
          <ButtonRifa
            key={cota.id}
            label={cota.number}
            onClickSelect={() => handleButtonClick(cota.number)}
            selected={selectedButtons.has(cota.number)}
          ></ButtonRifa>
        ))}
      </div>
    </div>
  );
};

export default RifaPage;
