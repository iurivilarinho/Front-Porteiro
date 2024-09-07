import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DragAndDrop from "@/components/dragAndDrop/dragAndDrop";
import { Input } from "@/components/input/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/button/button";
import { usePostRifa } from "@/lib/api/tanstackQuery/rifa";

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
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 flex justify-center">
      <div className="w-2/3 bg-white p-3 ">
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
