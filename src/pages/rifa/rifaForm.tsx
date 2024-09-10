import { Button } from "@/components/button/button";
import DragAndDrop from "@/components/dragAndDrop/dragAndDrop";
import DataInput from "@/components/input/dateInput";
import { Input } from "@/components/input/input";
import { Label } from "@/components/input/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetRifaById,
  usePostRifa,
  usePutRifa,
} from "@/lib/api/tanstackQuery/rifa";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Loading from "@/components/loading";
import { useCustomDialogContext } from "@/components/dialog/useCustomDialogContext";

// Definindo o esquema de validação com Zod
// Esquema de validação com Zod
const rifaFormSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  numberOfShares: z
    .number()
    .positive("A quantidade de cotas deve ser positiva"),
  quotaPrice: z.number().positive("O valor por cota deve ser positivo"),
  compraMinCotas: z.number().positive("A compra mínima deve ser positiva"),
  compraMaxCotas: z.number().positive("A compra máxima deve ser positiva"),
  descriptionAward: z.string().min(1, "A descrição da premiação é obrigatória"),
  images: z.any().refine((files) => Array.isArray(files) && files.length > 0, {
    message: "Adicione ao menos uma imagem",
  }),
});

// Definindo os tipos com base no esquema
type RifaFormData = z.infer<typeof rifaFormSchema>;

const RifaForm = () => {
  const navigate = useNavigate();
  const { formType, rifaId } = useParams();
  const [isViewMode, setIsViewMode] = useState(false);

  // Hooks para requisições de API
  const {
    data: rifaData,
    isLoading: isLoadingGet,
    error: errorGet,
  } = useGetRifaById(rifaId ?? "");
  const {
    mutate: postRifa,
    isPending,
    isSuccess: isSuccessPost,
    error: errorPost,
  } = usePostRifa();
  const {
    mutate: putRifa,
    isPending: isPendingPut,
    isSuccess: isSuccessPut,
    error: errorPut,
  } = usePutRifa();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RifaFormData>({
    resolver: zodResolver(rifaFormSchema),
  });

  const [dateRifa, setDateRifa] = useState(false);
  const [completedRifa, setCompletedRifa] = useState(true);
  const { setCustomDialog } = useCustomDialogContext();

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
  // Controla a submissão do formulário
  const submitForm = (data: RifaFormData) => {
    const formData = new FormData();
    const { images, ...props } = data;

    // Função para converter base64 em arquivo (para arquivos vindos do backend)
    const convertDocumentToFile = (document: any): File => {
      const byteString = atob(document.documento); // Decodifica o Base64
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: document.contentType });
      return new File([blob], document.nome, { type: document.contentType });
    };

    if (images) {
      if (Array.isArray(images)) {
        images.forEach((file) => {
          // Se for um arquivo vindo do backend (tem 'documento'), converte
          if (file.documento) {
            formData.append("files", convertDocumentToFile(file));
          } else {
            // Se for um arquivo novo, apenas adiciona
            formData.append("files", file);
          }
        });
      } else {
        if (images.documento) {
          formData.append("file", convertDocumentToFile(images));
        } else {
          formData.append("file", images);
        }
      }
    }

    // Serializa o restante do formulário como JSON e adiciona ao FormData
    const blobJson = new Blob([JSON.stringify(props)], {
      type: "application/json",
    });
    formData.append("form", blobJson);

    // Decide entre POST ou PUT com base no formType
    formType === "editar"
      ? putRifa({ rifa: formData, id: rifaId ?? "" })
      : postRifa(formData);
  };

  // Carregar dados da rifa existente
  useEffect(() => {
    if (rifaData) {
      reset(rifaData);
    }
  }, [rifaData]);

  useEffect(() => {
    switch (formType) {
      case "cadastro":
        break;
      case "editar":
        break;
      case "visualizar":
        setIsViewMode(true);
        break;
      default:
        break;
    }
  }, [formType]);

  // Tratamento de erro e sucesso
  useEffect(() => {
    if (isSuccessPut || isSuccessPost) {
      navigate("/"); // Redireciona após o sucesso
    }
  }, [isSuccessPut, isSuccessPost]);

  useEffect(() => {
    if (errorPost || errorPut || errorGet) {
      const errorMessage =
        (errorPost as any)?.response?.data?.message ||
        (errorPut as any)?.response?.data?.message ||
        (errorGet as any)?.response?.data?.message ||
        "Ocorreu algum erro!";
      setCustomDialog({
        message: errorMessage,
        title: "Erro",
        type: "error",
        closeHandler: () => setCustomDialog({}),
      });
    }
  }, [errorPost, errorPut, errorGet]);

  if (isPending || isPendingPut || isLoadingGet) {
    return <Loading />;
  }

  return (
    <div className="bg-black/40 flex justify-center">
      <div className="w-full lg:w-2/3 bg-white p-3 ">
        <h1 className="text-2xl font-semibold pb-4 border-b-2">
          Detalhes da Rifa
        </h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="">
            <Input
              className="my-3"
              label="Título"
              {...register("title")}
              disabled={isViewMode}
              notification={{
                isError: Boolean(errors.title),
                notification: errors.title?.message,
              }}
            />
            <Textarea
              placeholder="Descrição da rifa"
              {...register("description")}
              disabled={isViewMode}
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
              disabled={isViewMode}
              notification={{
                isError: Boolean(errors.numberOfShares),
                notification: errors.numberOfShares?.message,
              }}
            />

            <Input
              className="w-full ml-5"
              label="Valor por cota"
              //type="number"
              {...register("quotaPrice", { valueAsNumber: true })}
              disabled={isViewMode}
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
              disabled={isViewMode}
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
              disabled={isViewMode}
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
              {...register("descriptionAward")}
              disabled={isViewMode}
              notification={{
                isError: Boolean(errors.descriptionAward),
                notification: errors.descriptionAward?.message,
              }}
            />
            <DragAndDrop
              initialFiles={rifaData?.images} // Exibe as imagens já existentes
              onAddFile={(files) =>
                setValue("images", files, { shouldValidate: true })
              }
              label="Imagens do Prêmio"
              acceptedFileTypes={{
                ".jpg": ["image/jpeg"],
                ".jpeg": ["image/jpeg"],
                ".png": ["image/png"],
              }}
              notification={{
                isError: Boolean(errors.images),
                notification: String(errors.images?.message ?? ""),
              }}
              //disabled={isViewMode}
            />
          </div>

          {!isViewMode && (
            <div className="flex justify-center my-5">
              <Button type="submit">
                {formType === "editar" ? "Editar Rifa" : "Cadastrar Rifa"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RifaForm;
