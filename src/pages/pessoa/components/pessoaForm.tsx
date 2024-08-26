import { Button } from "@/components/button/button";
import { useCustomDialogContext } from "@/components/dialog/useCustomDialogContext";
import DragAndDrop from "@/components/dragAndDrop/dragAndDrop";
import { Input } from "@/components/input/input";
import { useGetCEP } from "@/lib/api/tanstackQuery/cep";
import {
  useGetPessoaById,
  usePostPessoa,
  usePutPessoa,
} from "@/lib/api/tanstackQuery/pessoa";
import useValidation from "@/lib/hooks/useValidation";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PessoaForm = () => {
  const navigate = useNavigate();

  const {
    values: formValues,
    handleChange,
    validateField,
    validateForm,
    setValues,
    errors,
  } = useValidation(
    {
      nomeCompleto: (value) => (value ? null : "Nome completo é obrigatório"),
      dataNascimento: (value) =>
        value ? null : "Data de nascimento é obrigatória",
      cpf: (value) => (value ? null : "CPF é obrigatório"),
      rg: (value) => (value ? null : "RG é obrigatório"),
      genero: (value) => (value ? null : "Gênero é obrigatório"),
      estadoCivil: (value) => (value ? null : "Estado civil é obrigatório"),
      telefoneCelular: (value) =>
        value ? null : "Telefone celular é obrigatório",
      telefoneResidencial: (value) =>
        value ? null : "Telefone residencial é obrigatório",
      email: (value) => (value ? null : "Email é obrigatório"),
      "endereco.rua": (value) => (value ? null : "Rua é obrigatória"),
      "endereco.numero": (value) => (value ? null : "Número é obrigatório"),
      "endereco.bairro": (value) => (value ? null : "Bairro é obrigatório"),
      "endereco.cidade": (value) => (value ? null : "Cidade é obrigatória"),
      "endereco.estado": (value) => (value ? null : "Estado é obrigatório"),
      "endereco.cep": (value) => (value ? null : "CEP é obrigatório"),
      "informacaoSeguranca.codigoAcesso": (value) =>
        value ? null : "Código de acesso é obrigatório",
      "informacaoSeguranca.dataEntrada": (value) =>
        value ? null : "Data de entrada é obrigatória",
      "informacaoSeguranca.nomeContatoEmergencia": (value) =>
        value ? null : "Nome do contato de emergência é obrigatório",
      "informacaoSeguranca.relacaoContatoEmergencia": (value) =>
        value ? null : "Relação com o contato de emergência é obrigatória",
      "informacaoSeguranca.telefoneContatoEmergencia": (value) =>
        value ? null : "Telefone do contato de emergência é obrigatório",
    },
    {
      foto: null,
      nomeCompleto: "",
      dataNascimento: "",
      cpf: "",
      rg: "",
      genero: "",
      estadoCivil: "",
      telefoneCelular: "",
      telefoneResidencial: "",
      email: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        unidade: "",
        bloco: "",
        vagaEstacionamento: "",
        complemento: "",
      },
      informacaoSeguranca: {
        codigoAcesso: "",
        tipoPessoa: "FUNCIONARIO",
        dataEntrada: "",
        dataSaida: "",
        placaVeiculo: "",
        autorizacaoEntradaVisitantes: false,
        nomeContatoEmergencia: "",
        relacaoContatoEmergencia: "",
        telefoneContatoEmergencia: "",
      },
    }
  );

  const [cep, setCep] = useState("");
  const { data: dataCep } = useGetCEP(cep);
  const { formType, userId } = useParams();
  const { data: dataPessoa } = useGetPessoaById(userId ?? "");
  const [visualizacao, setVisualizacao] = useState(false);

  // Atualize o estado dos campos quando a resposta da API chegar
  useEffect(() => {
    if (dataCep) {
      handleChange("endereco.estado", dataCep.uf);
      handleChange("endereco.bairro", dataCep.bairro);
      handleChange("endereco.cidade", dataCep.localidade);
      handleChange("endereco.rua", dataCep.logradouro);
    }
  }, [dataCep]);

  useEffect(() => {
    switch (formType) {
      case "cadastro":
        break;
      case "editar":
        break;

      case "visualizar":
        dataPessoa;
        setVisualizacao(true);
        break;

      default:
        break;
    }
  }, [formType]);

  useEffect(() => {
    if (dataPessoa) setValues(dataPessoa);
  }, [dataPessoa]);

  const { mutate: postPessoa, isPending, isSuccess: isSuccessPost, error: errorPost } = usePostPessoa();
  const { mutate: putPessoa, isPending: isPendingPut, isSuccess: isSuccessPut, error: errorPut } = usePutPessoa();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isPending || isPendingPut)
  }, [isPendingPut, isPending])


  const { setCustomDialog } = useCustomDialogContext();

  const submitForm = () => {
    const formData = new FormData();

    const { foto, ...props } = formValues;

    if (foto) {
      if (Array.isArray(foto)) {
        foto.forEach((file) => formData.append("file", file));
      } else {
        formData.append("file", foto);
      }
    }

    const blobJson = new Blob([JSON.stringify(props)], {
      type: "application/json",
    });
    formData.append("form", blobJson);

    if (validateForm()) {
      postPessoa(formData);
    }
  };


  const updateForm = () => {
    const formData = new FormData();

    const { foto, ...props } = formValues;

    if (foto) {
      if (Array.isArray(foto)) {
        foto.forEach((file) => formData.append("file", file));
      } else {
        formData.append("file", foto);
      }
    }

    const blobJson = new Blob([JSON.stringify(props)], {
      type: "application/json",
    });
    formData.append("form", blobJson);

    if (validateForm()) {
      putPessoa({
        pessoa: formData, id: userId ?? ""
      });
    }
  };

  useEffect(() => {
    if (isSuccessPut || isSuccessPost) {
      navigate("/");
    }
  }, [isSuccessPut, isSuccessPost]);

  useEffect(() => {
    if (errorPost || errorPut) {
      const errorMessage =
        (errorPost as any)?.response?.data?.message || (errorPut as any)?.response?.data?.message || "Ocorreu algum erro!";
      setCustomDialog({
        message: errorMessage,
        title: "Erro",
        type: "error",
        closeHandler: () => setCustomDialog({}),
      });
    }
  }, [errorPost, errorPut]);
  

  return (
    <div className="flex w-full h-full max-w-5xl flex-col gap-6 p-6">
      {/* Dados Pessoais */}
      <div className="flex flex-col gap-3 border border-gray-500/40 rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-semibold pb-4 border-b-2">
          Detalhes Pessoais
        </h1>
        <div className="flex gap-8">
          <Input
            label="Nome Completo"
            className="w-lvw"
            value={formValues.nomeCompleto}
            onChange={(e) => handleChange("nomeCompleto", e.target.value)}
            onBlur={() =>
              validateField("nomeCompleto", formValues.nomeCompleto)
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors.nomeCompleto),
              notification: errors.nomeCompleto ?? "",
            }}
          />
          <Input
            label="Data de Nascimento"
            type="date"
            value={formValues.dataNascimento}
            onChange={(e) => handleChange("dataNascimento", e.target.value)}
            onBlur={() =>
              validateField("dataNascimento", formValues.dataNascimento)
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors.dataNascimento),
              notification: errors.dataNascimento ?? "",
            }}
          />
        </div>
        <div className="flex gap-8">
          <Input
            className="w-full"
            label="CPF"
            value={formValues.cpf}
            onChange={(e) => handleChange("cpf", e.target.value)}
            onBlur={() => validateField("cpf", formValues.cpf)}
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors.cpf),
              notification: errors.cpf ?? "",
            }}
          />
          <Input
            label="RG"
            className="w-full"
            value={formValues.rg}
            onChange={(e) => handleChange("rg", e.target.value)}
            onBlur={() => validateField("rg", formValues.rg)}
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors.rg),
              notification: errors.rg ?? "",
            }}
          />
        </div>
        <div className="flex gap-8">
          <Input
            className="w-full"
            label="Gênero"
            value={formValues.genero}
            onChange={(e) => handleChange("genero", e.target.value)}
            onBlur={() => validateField("genero", formValues.genero)}
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors.genero),
              notification: errors.genero ?? "",
            }}
          />
          <Input
            className="w-full"
            label="Estado Civil"
            value={formValues.estadoCivil}
            onChange={(e) => handleChange("estadoCivil", e.target.value)}
            onBlur={() => validateField("estadoCivil", formValues.estadoCivil)}
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors.estadoCivil),
              notification: errors.estadoCivil ?? "",
            }}
          />
        </div>
        <div className="flex gap-8">
          <Input
            label="Telefone Celular"
            className="w-full"
            value={formValues.telefoneCelular}
            onChange={(e) => handleChange("telefoneCelular", e.target.value)}
            disabled={visualizacao}
            onBlur={() =>
              validateField("telefoneCelular", formValues.telefoneCelular)
            }
            notification={{
              isError: Boolean(errors.telefoneCelular),
              notification: errors.telefoneCelular ?? "",
            }}
          />
          <Input
            label="Telefone Residencial"
            className="w-full"
            value={formValues.telefoneResidencial}
            disabled={visualizacao}
            onChange={(e) =>
              handleChange("telefoneResidencial", e.target.value)
            }
            onBlur={() =>
              validateField(
                "telefoneResidencial",
                formValues.telefoneResidencial
              )
            }
            notification={{
              isError: Boolean(errors.telefoneResidencial),
              notification: errors.telefoneResidencial ?? "",
            }}
          />
        </div>
        <Input
          label="Email"
          type="email"
          value={formValues.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => validateField("email", formValues.email)}
          disabled={visualizacao}
          notification={{
            isError: Boolean(errors.email),
            notification: errors.email ?? "",
          }}
        />
        <DragAndDrop
          onAddFile={(files) => {
            handleChange("foto", files);
          }}
          label="Foto da Pessoa"
          acceptedFileTypes={{
            ".jpg": ["image/jpeg"],
            ".jpeg": ["image/jpeg"],
            ".png": ["image/png"],
          }}
        />
      </div>

      {/* Endereço */}
      <div className="flex flex-col gap-3 border border-gray-500/40 rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-semibold pb-4 border-b-2">Endereço</h1>
        <div className="flex gap-32">
          <div className="flex gap-8">
            <Input
              disabled={visualizacao}
              label="CEP"
              value={formValues.endereco.cep}
              className="w-32"
              onChange={(e) => {
                handleChange("endereco.cep", e.target.value);
                setCep(e.target.value);
              }}
              onBlur={() =>
                validateField("endereco.cep", formValues.endereco.cep)
              }
              notification={{
                isError: Boolean(errors["endereco.cep"]),
                notification: errors["endereco.cep"] ?? "",
              }}
            />
            <Input
              disabled={visualizacao}
              label="Estado"
              className="w-16"
              value={formValues.endereco.estado}
              onChange={(e) => handleChange("endereco.estado", e.target.value)}
              onBlur={() =>
                validateField("endereco.estado", formValues.endereco.estado)
              }
              notification={{
                isError: Boolean(errors["endereco.estado"]),
                notification: errors["endereco.estado"] ?? "",
              }}
            />
          </div>

          <Input
            label="Cidade"
            className="w-full"
            value={formValues.endereco.cidade}
            onChange={(e) => handleChange("endereco.cidade", e.target.value)}
            onBlur={() =>
              validateField("endereco.cidade", formValues.endereco.cidade)
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["endereco.cidade"]),
              notification: errors["endereco.cidade"] ?? "",
            }}
          />
          <Input
            label="Rua"
            className="w-full"
            value={formValues.endereco.rua}
            onChange={(e) => handleChange("endereco.rua", e.target.value)}
            onBlur={() =>
              validateField("endereco.rua", formValues.endereco.rua)
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["endereco.rua"]),
              notification: errors["endereco.rua"] ?? "",
            }}
          />
        </div>
        <div className="flex gap-32">
          <Input
            label="Número"
            className="w-full"
            value={formValues.endereco.numero}
            onChange={(e) => handleChange("endereco.numero", e.target.value)}
            onBlur={() =>
              validateField("endereco.numero", formValues.endereco.numero)
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["endereco.numero"]),
              notification: errors["endereco.numero"] ?? "",
            }}
          />
          <Input
            label="Bairro"
            value={formValues.endereco.bairro}
            className="w-full"
            onChange={(e) => handleChange("endereco.bairro", e.target.value)}
            onBlur={() =>
              validateField("endereco.bairro", formValues.endereco.bairro)
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["endereco.bairro"]),
              notification: errors["endereco.bairro"] ?? "",
            }}
          />
          <Input
            label="Bloco"
            className="w-full"
            value={formValues.endereco.bloco}
            onChange={(e) => handleChange("endereco.bloco", e.target.value)}
            onBlur={() =>
              validateField("endereco.bloco", formValues.endereco.bloco)
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["endereco.bloco"]),
              notification: errors["endereco.bloco"] ?? "",
            }}
          />
        </div>

        <div className="flex gap-32">
          <Input
            label="Unidade"
            value={formValues.endereco.unidade}
            className="w-full"
            onChange={(e) => handleChange("endereco.unidade", e.target.value)}
            onBlur={() =>
              validateField("endereco.unidade", formValues.endereco.unidade)
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["endereco.unidade"]),
              notification: errors["endereco.unidade"] ?? "",
            }}
          />
          <Input
            label="Complemento"
            className="w-full"
            value={formValues.endereco.complemento}
            onChange={(e) =>
              handleChange("endereco.complemento", e.target.value)
            }
            onBlur={() =>
              validateField(
                "endereco.complemento",
                formValues.endereco.complemento
              )
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["endereco.complemento"]),
              notification: errors["endereco.complemento"] ?? "",
            }}
          />
          <Input
            label="Vaga de Estacionamento"
            className="w-full"
            value={formValues.endereco.vagaEstacionamento}
            onChange={(e) =>
              handleChange("endereco.vagaEstacionamento", e.target.value)
            }
            onBlur={() =>
              validateField(
                "endereco.vagaEstacionamento",
                formValues.endereco.vagaEstacionamento
              )
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["endereco.vagaEstacionamento"]),
              notification: errors["endereco.vagaEstacionamento"] ?? "",
            }}
          />
        </div>
      </div>
      {/* Informação de Segurança */}

      <div className="flex flex-col gap-3 border border-gray-500/40 rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-semibold pb-4 border-b-2">
          Informações Complementares
        </h1>
        <div className="flex gap-28">
          <Input
            label="Código de Acesso"
            className="w-full"
            value={formValues.informacaoSeguranca.codigoAcesso}
            onChange={(e) =>
              handleChange("informacaoSeguranca.codigoAcesso", e.target.value)
            }
            onBlur={() =>
              validateField(
                "informacaoSeguranca.codigoAcesso",
                formValues.informacaoSeguranca.codigoAcesso
              )
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["informacaoSeguranca.codigoAcesso"]),
              notification: errors["informacaoSeguranca.codigoAcesso"] ?? "",
            }}
          />
          <Input
            label="Placa do Veículo"
            className="w-full"
            value={formValues.informacaoSeguranca.placaVeiculo}
            onChange={(e) =>
              handleChange("informacaoSeguranca.placaVeiculo", e.target.value)
            }
            onBlur={() =>
              validateField(
                "informacaoSeguranca.placaVeiculo",
                formValues.informacaoSeguranca.placaVeiculo
              )
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["informacaoSeguranca.placaVeiculo"]),
              notification: errors["informacaoSeguranca.placaVeiculo"] ?? "",
            }}
          />
        </div>

        <div className="flex gap-28">
          <Input
            label="Data de Entrada"
            className="w-full"
            type="date"
            value={formValues.informacaoSeguranca.dataEntrada}
            onChange={(e) =>
              handleChange("informacaoSeguranca.dataEntrada", e.target.value)
            }
            onBlur={() =>
              validateField(
                "informacaoSeguranca.dataEntrada",
                formValues.informacaoSeguranca.dataEntrada
              )
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["informacaoSeguranca.dataEntrada"]),
              notification: errors["informacaoSeguranca.dataEntrada"] ?? "",
            }}
          />
          <Input
            label="Data de Saída"
            className="w-full"
            type="date"
            value={formValues.informacaoSeguranca.dataSaida}
            onChange={(e) =>
              handleChange("informacaoSeguranca.dataSaida", e.target.value)
            }
            onBlur={() =>
              validateField(
                "informacaoSeguranca.dataSaida",
                formValues.informacaoSeguranca.dataSaida
              )
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(errors["informacaoSeguranca.dataSaida"]),
              notification: errors["informacaoSeguranca.dataSaida"] ?? "",
            }}
          />
        </div>

        <div className="flex gap-8">
          <Input
            label="Nome do Contato de Emergência"
            className="w-full"
            value={formValues.informacaoSeguranca.nomeContatoEmergencia}
            onChange={(e) =>
              handleChange(
                "informacaoSeguranca.nomeContatoEmergencia",
                e.target.value
              )
            }
            onBlur={() =>
              validateField(
                "informacaoSeguranca.nomeContatoEmergencia",
                formValues.informacaoSeguranca.nomeContatoEmergencia
              )
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(
                errors["informacaoSeguranca.nomeContatoEmergencia"]
              ),
              notification:
                errors["informacaoSeguranca.nomeContatoEmergencia"] ?? "",
            }}
          />
          <Input
            label="Relação com o Contato de Emergência"
            className="w-full"
            value={formValues.informacaoSeguranca.relacaoContatoEmergencia}
            onChange={(e) =>
              handleChange(
                "informacaoSeguranca.relacaoContatoEmergencia",
                e.target.value
              )
            }
            onBlur={() =>
              validateField(
                "informacaoSeguranca.relacaoContatoEmergencia",
                formValues.informacaoSeguranca.relacaoContatoEmergencia
              )
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(
                errors["informacaoSeguranca.relacaoContatoEmergencia"]
              ),
              notification:
                errors["informacaoSeguranca.relacaoContatoEmergencia"] ?? "",
            }}
          />
          <Input
            label="Telefone do Contato de Emergência"
            className="w-full"
            value={formValues.informacaoSeguranca.telefoneContatoEmergencia}
            onChange={(e) =>
              handleChange(
                "informacaoSeguranca.telefoneContatoEmergencia",
                e.target.value
              )
            }
            onBlur={() =>
              validateField(
                "informacaoSeguranca.telefoneContatoEmergencia",
                formValues.informacaoSeguranca.telefoneContatoEmergencia
              )
            }
            disabled={visualizacao}
            notification={{
              isError: Boolean(
                errors["informacaoSeguranca.telefoneContatoEmergencia"]
              ),
              notification:
                errors["informacaoSeguranca.telefoneContatoEmergencia"] ?? "",
            }}
          />
        </div>
      </div>
      {!visualizacao && (
        <div className="flex justify-end">
          <Button onClick={formType === "editar" ? updateForm : submitForm} disabled={isLoading}>
            {isLoading ? "Enviando..." : formType === "editar" ? "Editar" : "Cadastrar"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PessoaForm;
