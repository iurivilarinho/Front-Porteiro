import ButtonRifa from "@/components/button/buttonRifa";
import ImageDisplay from "@/components/image/ImageDisplay";
import { Document } from "../../types/document";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DialogRandom from "@/components/dialogRandom";
import DialogInterval from "@/components/dialogInterval";
import DialogPayment from "@/components/dialogPayment";

const RifaPage = () => {
  const { data: dataRifa, isLoading: isLoadingRifa } = useGetRifaById(4);

  useEffect(() => {}, [isLoadingRifa]);

  // Estado para gerenciar a seleção dos botões
  const [selectedButtons, setSelectedButtons] = useState<Set<string>>(
    new Set()
  );

  const [totalPrice, setTotalPrice] = useState(0);

  const handleGeneratedNumbers = (numbers: number[]) => {
    const updated = new Set(numbers.map(String));
    console.log(updated);
    setSelectedButtons(updated);
    setTotalPrice((dataRifa?.quotaPrice ?? 0) * updated.size);
  };

  // Função para alternar a seleção dos botões
  const handleButtonClick = (label: string) => {
    setSelectedButtons((prev) => {
      const updated = new Set(prev);
      if (updated.has(label)) {
        updated.delete(label); // Desmarcar se já estiver selecionado
      } else {
        updated.add(label); // Marcar se não estiver selecionado
      }
      setTotalPrice((dataRifa?.quotaPrice ?? 0) * updated.size);
      return updated;
    });
  };

  if (isLoadingRifa) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <Card className="w-screen mx-10 mb-10">
          <CardHeader>
            <CardTitle>{dataRifa?.title}</CardTitle>
            <CardDescription>{dataRifa?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {dataRifa?.images?.map((foto: Document) => (
                  <CarouselItem key={foto.id} className="basis-full">
                    <ImageDisplay {...foto}></ImageDisplay>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card className="w-screen mx-10 mb-10">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-blue-700 drop-shadow-lg tracking-wide">
              Por Apenas R$ {dataRifa.quotaPrice ?? 0} !
            </p>
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card className="w-screen mx-10 mb-10">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="flex  flex-col items-center justify-center">
            <div className="flex justify-between w-full">
              <DialogInterval
                max={dataRifa?.cotas.length}
                onGenerate={handleGeneratedNumbers}
              ></DialogInterval>
              <p className="mt-5 mx-2">ou</p>
              <DialogRandom
                onGenerate={handleGeneratedNumbers}
                numberOfShares={dataRifa?.cotas.length}
              ></DialogRandom>
            </div>
            <div className="w-full flex flex-col items-center justify-center border-t-2">
              <p className=" mt-3">
                Quantidade de Cotas: {selectedButtons.size}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center border-t-2 p-3">
            <p>
              Valor: R${" "}
              {totalPrice
                .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                .replace("R$", "")}
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col items-center">
        <DialogPayment
          disableButton={selectedButtons.size > 0 ? false : true}
          valueQrCode="34996444008"
          quotesSelected={selectedButtons}
          totalPrice={totalPrice}
        ></DialogPayment>
      </div>

      <div className="grid grid-cols-5 gap-2 mx-10">
        {dataRifa?.cotas.map((cota: Cota) => (
          <ButtonRifa
            key={cota.id}
            label={cota.number}
            onClickSelect={() => handleButtonClick(String(cota.number))}
            selected={selectedButtons.has(String(cota.number))}
          ></ButtonRifa>
        ))}
      </div>
    </div>
  );
};

export default RifaPage;
