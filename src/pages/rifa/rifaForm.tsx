import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DragAndDrop from "@/components/dragAndDrop/dragAndDrop";
import { Input } from "@/components/input/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/button/button";
import { usePostRifa } from "@/lib/api/tanstackQuery/rifa";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/input/label";
import { useState } from "react";
import DataInput from "../login/components/dateInput";

// Definindo o esquema de validação com Zod
const rifaFormSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  numberOfShares: z
    .number({ invalid_type_error: "Digite um número válido" })
    .positive("A quantidade de cotas deve ser positiva"),
  quotaPrice: z
    .number({ invalid_type_error: "Digite um número válido" })
    .positive("O valor por cota deve ser positivo"),
  compraMinCotas: z
    .number({ invalid_type_error: "Digite um número válido" })
    .positive("A compra mínima deve ser positiva"),
  compraMaxCotas: z
    .number({ invalid_type_error: "Digite um número válido" })
    .positive("A compra máxima deve ser positiva"),
  descriptionPremio: z
    .string()
    .min(1, "A descrição da premiação é obrigatória"),
  imagensPremio: z
    .any()
    .refine((files) => Array.isArray(files) && files.length > 0, {
      message: "Adicione ao menos uma imagem",
    }),
});

// Definindo os tipos com base no esquema
type RifaFormData = z.infer<typeof rifaFormSchema>;

const RifaForm = () => {
  const {
    mutate: postRifa,
    isPending,
    isSuccess: isSuccessPost,
    error: errorPost,
  } = usePostRifa();

  // Usando o React Hook Form com Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RifaFormData>({
    resolver: zodResolver(rifaFormSchema),
  });

  const submitForm = (data: RifaFormData) => {
    const formData = new FormData();

    const { imagensPremio, ...props } = data;

    if (imagensPremio) {
      if (Array.isArray(imagensPremio)) {
        imagensPremio.forEach((file) => formData.append("files", file));
      } else {
        formData.append("file", imagensPremio);
      }
    }

    const blobJson = new Blob([JSON.stringify(props)], {
      type: "application/json",
    });
    formData.append("form", blobJson);

    postRifa(formData);
  };

  const [dateRifa, setDateRifa] = useState(false);
  const [completedRifa, setCompletedRifa] = useState(true);

  const handleDateRifa = () => {
    // Se ainda não estiver ativado
    setDateRifa(!dateRifa); // Liga o switch de "Informar data de sorteio"
    setCompletedRifa(!completedRifa); // Desliga o outro switch
  };

  const handleCompletedRifa = () => {
    // Se ainda não estiver ativado
    setCompletedRifa(!completedRifa); // Liga o switch de "Sortear após realizar as vendas"
    setDateRifa(!dateRifa); // Desliga o outro switch
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 flex justify-center">
      <div className="w-full lg:w-2/3 bg-white p-3 ">
        <h1 className="text-2xl font-semibold pb-4 border-b-2">
          Detalhes da ação
        </h1>
        <div className="">
          <Input
            className="my-3"
            label="Título"
            {...register("title")}
            notification={{
              isError: Boolean(errors.title),
              notification: errors.title?.message,
            }}
          />

          <Textarea
            placeholder="Descrição da ação"
            {...register("description")}
            notification={{
              isError: Boolean(errors.description),
              notification: errors.description?.message,
            }}
          />
        </div>

        <div className="gap-3 p-3">
          <p className="mb-6">Oque você deseja?</p>
          <div className="flex flex-col">
          <Label>Informar data de sorteio</Label>
          <Switch
              className="mx-3 my-3"
              checked={completedRifa}
              onCheckedChange={handleDateRifa}
            />
            <div className="flex flex-col w-full sm:flex-row lg:flex-row ">
             

              {!dateRifa && (
                <div className="relative h-20 w-full my-2 max-w-28 sm:h-0 sm:mx-10  ">
                  <DataInput
                    label="Data de sorteio"
                    className="absolute  sm:top-[-83px] left-0 z-50  sm:ml-80"
                  />
                </div>
              )}
            </div>
           
          </div>
          <div className="flex flex-col">
            <Label>Sortear após realizar as vendas</Label>
            <Switch
              className="mx-3 my-3"
              checked={dateRifa}
              onCheckedChange={handleCompletedRifa}
            />
          </div>
        </div>

        <div className="flex justify-between my-5">
          <Input
            className="w-full mr-5"
            label="Quantidade de Cotas"
            type="number"
            {...register("numberOfShares", { valueAsNumber: true })}
            notification={{
              isError: Boolean(errors.numberOfShares),
              notification: errors.numberOfShares?.message,
            }}
          />

          <Input
            className="w-full ml-5"
            label="Valor por cota"
            type="number"
            {...register("quotaPrice", { valueAsNumber: true })}
            notification={{
              isError: Boolean(errors.quotaPrice),
              notification: errors.quotaPrice?.message,
            }}
          />
        </div>

        <div className="flex justify-between my-5">
          <Input
            className="w-full mr-5"
            label="Compra mínima de cotas por venda"
            type="number"
            {...register("compraMinCotas", { valueAsNumber: true })}
            notification={{
              isError: Boolean(errors.compraMinCotas),
              notification: errors.compraMinCotas?.message,
            }}
          />

          <Input
            className="w-full ml-5"
            label="Compra máxima de cotas por venda"
            type="number"
            {...register("compraMaxCotas", { valueAsNumber: true })}
            notification={{
              isError: Boolean(errors.compraMaxCotas),
              notification: errors.compraMaxCotas?.message,
            }}
          />
        </div>
        <h1 className="text-2xl font-semibold pb-4 border-b-2">
          Detalhes do prêmio
        </h1>
        <div>
          <Textarea
            className="my-3"
            label="Descrição da premiação"
            placeholder="Descrição da premiação"
            {...register("descriptionPremio")}
            notification={{
              isError: Boolean(errors.descriptionPremio),
              notification: errors.descriptionPremio?.message,
            }}
          />
          <DragAndDrop
            onAddFile={(files) =>
              setValue("imagensPremio", files, { shouldValidate: true })
            }
            label="Imagens do Prêmio"
            acceptedFileTypes={{
              ".jpg": ["image/jpeg"],
              ".jpeg": ["image/jpeg"],
              ".png": ["image/png"],
            }}
            notification={{
              isError: Boolean(errors.imagensPremio),
              notification: String(errors.imagensPremio?.message ?? ""),
            }}
          />
        </div>

        <div className="flex justify-center my-5">
          <Button type="submit" onClick={handleSubmit(submitForm)}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RifaForm;
