import { Button } from "@/components/button/button";
import DragAndDrop from "@/components/dragAndDrop/dragAndDrop";
import { Input } from "@/components/input/input";
import { usePostPessoa } from "@/lib/api/tanstackQuery/pessoa";
import useValidation from "@/lib/hooks/useValidation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PessoaForm = () => {
  const navigate = useNavigate();

  const {
    values: formValues,
    handleChange,
    validateField,
    validateForm,
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
      telefoneCelular: (value) => (value ? null : "Telefone celular é obrigatório"),
      telefoneResidencial: (value) => (value ? null : "Telefone residencial é obrigatório"),
      email: (value) => (value ? null : "Email é obrigatório"),
      "endereco.rua": (value) => (value ? null : "Rua é obrigatória"),
      "endereco.numero": (value) => (value ? null : "Número é obrigatório"),
      "endereco.bairro": (value) => (value ? null : "Bairro é obrigatório"),
      "endereco.cidade": (value) => (value ? null : "Cidade é obrigatória"),
      "endereco.estado": (value) => (value ? null : "Estado é obrigatório"),
      "endereco.cep": (value) => (value ? null : "CEP é obrigatório"),
      "endereco.unidade": (value) => (value ? null : "Unidade é obrigatória"),
      "endereco.bloco": (value) => (value ? null : "Bloco é obrigatório"),
      "endereco.vagaEstacionamento": (value) => (value ? null : "Vaga de estacionamento é obrigatória"),
      "endereco.complemento": (value) => (value ? null : "Complemento é obrigatório"),
      "informacaoSeguranca.codigoAcesso": (value) => (value ? null : "Código de acesso é obrigatório"),
      "informacaoSeguranca.dataEntrada": (value) => (value ? null : "Data de entrada é obrigatória"),
      "informacaoSeguranca.dataSaida": (value) => (value ? null : "Data de saída é obrigatória"),
      "informacaoSeguranca.placaVeiculo": (value) => (value ? null : "Placa do veículo é obrigatória"),
      "informacaoSeguranca.nomeContatoEmergencia": (value) => (value ? null : "Nome do contato de emergência é obrigatório"),
      "informacaoSeguranca.relacaoContatoEmergencia": (value) => (value ? null : "Relação com o contato de emergência é obrigatória"),
      "informacaoSeguranca.telefoneContatoEmergencia": (value) => (value ? null : "Telefone do contato de emergência é obrigatório"),
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

  const { mutate: postPessoa, isPending, isSuccess } = usePostPessoa();

  const submitForm = () => {
    const formData = new FormData()

    const { foto, ...props } = formValues;

    formData.append('file', foto);


    const blobJson = new Blob([JSON.stringify(props)], {
      type: "application/json",
    });
    formData.append("form", blobJson);

    if (validateForm()) {
      postPessoa(formData);
    }

  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/pessoas-lista");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex w-full h-full max-w-5xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Detalhes Pessoais</h1>

      {/* Dados Pessoais */}
      <div className="flex flex-col gap-3 border border-gray-500/40 rounded-lg p-6 bg-white" >

        <div className="flex gap-8">
          <Input
            label="Nome Completo"
            className="w-lvw"
            value={formValues.nomeCompleto}
            onChange={(e) => handleChange("nomeCompleto", e.target.value)}
            onBlur={() => validateField("nomeCompleto", formValues.nomeCompleto)}
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
            onBlur={() => validateField("telefoneCelular", formValues.telefoneCelular)}
            notification={{
              isError: Boolean(errors.telefoneCelular),
              notification: errors.telefoneCelular ?? "",
            }}
          />
          <Input
            label="Telefone Residencial"
            className="w-full"
            value={formValues.telefoneResidencial}
            onChange={(e) => handleChange("telefoneResidencial", e.target.value)}
            onBlur={() => validateField("telefoneResidencial", formValues.telefoneResidencial)}
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
        />

      </div>

      {/* Endereço */}
      <h1 className="text-2xl font-semibold">Endereço</h1>
      <div className="flex flex-col gap-3 border border-gray-500/40 rounded-lg p-6 bg-white" >
        <div className="flex justify-between">
          <Input
            label="CEP"
            value={formValues.endereco.cep}
            onChange={(e) => handleChange("endereco.cep", e.target.value)}
            onBlur={() => validateField("endereco.cep", formValues.endereco.cep)}
            notification={{
              isError: Boolean(errors["endereco.cep"]),
              notification: errors["endereco.cep"] ?? "",
            }}
          />
          <Input
            label="Estado"
            className="w-24"
            value={formValues.endereco.estado}
            onChange={(e) => handleChange("endereco.estado", e.target.value)}
            onBlur={() => validateField("endereco.estado", formValues.endereco.estado)}
            notification={{
              isError: Boolean(errors["endereco.estado"]),
              notification: errors["endereco.estado"] ?? "",
            }}
          />
          <Input
            label="Cidade"
            value={formValues.endereco.cidade}
            onChange={(e) => handleChange("endereco.cidade", e.target.value)}
            onBlur={() => validateField("endereco.cidade", formValues.endereco.cidade)}
            notification={{
              isError: Boolean(errors["endereco.cidade"]),
              notification: errors["endereco.cidade"] ?? "",
            }}
          />
          <Input
            label="Rua"
            className="w-80"
            value={formValues.endereco.rua}
            onChange={(e) => handleChange("endereco.rua", e.target.value)}
            onBlur={() => validateField("endereco.rua", formValues.endereco.rua)}
            notification={{
              isError: Boolean(errors["endereco.rua"]),
              notification: errors["endereco.rua"] ?? "",
            }}
          />

        </div>
        <div className="flex justify-between">
          <Input
            label="Número"
            className="w-36"
            value={formValues.endereco.numero}
            onChange={(e) => handleChange("endereco.numero", e.target.value)}
            onBlur={() => validateField("endereco.numero", formValues.endereco.numero)}
            notification={{
              isError: Boolean(errors["endereco.numero"]),
              notification: errors["endereco.numero"] ?? "",
            }}
          />
          <Input
            label="Bairro"
            value={formValues.endereco.bairro}
            onChange={(e) => handleChange("endereco.bairro", e.target.value)}
            onBlur={() => validateField("endereco.bairro", formValues.endereco.bairro)}
            notification={{
              isError: Boolean(errors["endereco.bairro"]),
              notification: errors["endereco.bairro"] ?? "",
            }}
          />
          <Input
            label="Unidade"
            value={formValues.endereco.unidade}
            onChange={(e) => handleChange("endereco.unidade", e.target.value)}
            onBlur={() => validateField("endereco.unidade", formValues.endereco.unidade)}
            notification={{
              isError: Boolean(errors["endereco.unidade"]),
              notification: errors["endereco.unidade"] ?? "",
            }}
          />
          <Input
            label="Bloco"
            value={formValues.endereco.bloco}
            onChange={(e) => handleChange("endereco.bloco", e.target.value)}
            onBlur={() => validateField("endereco.bloco", formValues.endereco.bloco)}
            notification={{
              isError: Boolean(errors["endereco.bloco"]),
              notification: errors["endereco.bloco"] ?? "",
            }}
          />
        </div>
        <Input
          label="Vaga de Estacionamento"
          value={formValues.endereco.vagaEstacionamento}
          onChange={(e) => handleChange("endereco.vagaEstacionamento", e.target.value)}
          onBlur={() => validateField("endereco.vagaEstacionamento", formValues.endereco.vagaEstacionamento)}
          notification={{
            isError: Boolean(errors["endereco.vagaEstacionamento"]),
            notification: errors["endereco.vagaEstacionamento"] ?? "",
          }}
        />
        <Input
          label="Complemento"
          value={formValues.endereco.complemento}
          onChange={(e) => handleChange("endereco.complemento", e.target.value)}
          onBlur={() => validateField("endereco.complemento", formValues.endereco.complemento)}
          notification={{
            isError: Boolean(errors["endereco.complemento"]),
            notification: errors["endereco.complemento"] ?? "",
          }}
        />
      </div>
      {/* Informação de Segurança */}
      <h1 className="text-2xl font-semibold">Informações Complementares</h1>
      <div className="flex flex-col gap-3 border border-gray-500/40 rounded-lg p-6 bg-white" >

        <div className="flex gap-28">
          <Input
            label="Código de Acesso"
            className="w-full"
            value={formValues.informacaoSeguranca.codigoAcesso}
            onChange={(e) => handleChange("informacaoSeguranca.codigoAcesso", e.target.value)}
            onBlur={() => validateField("informacaoSeguranca.codigoAcesso", formValues.informacaoSeguranca.codigoAcesso)}
            notification={{
              isError: Boolean(errors["informacaoSeguranca.codigoAcesso"]),
              notification: errors["informacaoSeguranca.codigoAcesso"] ?? "",
            }}
          />
          <Input
            label="Placa do Veículo"
            className="w-full"
            value={formValues.informacaoSeguranca.placaVeiculo}
            onChange={(e) => handleChange("informacaoSeguranca.placaVeiculo", e.target.value)}
            onBlur={() => validateField("informacaoSeguranca.placaVeiculo", formValues.informacaoSeguranca.placaVeiculo)}
            notification={{
              isError: Boolean(errors["informacaoSeguranca.placaVeiculo"]),
              notification: errors["informacaoSeguranca.placaVeiculo"] ?? "",
            }}
          /></div>


        <div className="flex gap-80">
          <Input
            label="Data de Entrada"
            className="w-full"
            type="date"
            value={formValues.informacaoSeguranca.dataEntrada}
            onChange={(e) => handleChange("informacaoSeguranca.dataEntrada", e.target.value)}
            onBlur={() => validateField("informacaoSeguranca.dataEntrada", formValues.informacaoSeguranca.dataEntrada)}
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
            onChange={(e) => handleChange("informacaoSeguranca.dataSaida", e.target.value)}
            onBlur={() => validateField("informacaoSeguranca.dataSaida", formValues.informacaoSeguranca.dataSaida)}
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
            onChange={(e) => handleChange("informacaoSeguranca.nomeContatoEmergencia", e.target.value)}
            onBlur={() => validateField("informacaoSeguranca.nomeContatoEmergencia", formValues.informacaoSeguranca.nomeContatoEmergencia)}
            notification={{
              isError: Boolean(errors["informacaoSeguranca.nomeContatoEmergencia"]),
              notification: errors["informacaoSeguranca.nomeContatoEmergencia"] ?? "",
            }}
          />
          <Input
            label="Relação com o Contato de Emergência"
            className="w-full"
            value={formValues.informacaoSeguranca.relacaoContatoEmergencia}
            onChange={(e) => handleChange("informacaoSeguranca.relacaoContatoEmergencia", e.target.value)}
            onBlur={() => validateField("informacaoSeguranca.relacaoContatoEmergencia", formValues.informacaoSeguranca.relacaoContatoEmergencia)}
            notification={{
              isError: Boolean(errors["informacaoSeguranca.relacaoContatoEmergencia"]),
              notification: errors["informacaoSeguranca.relacaoContatoEmergencia"] ?? "",
            }}
          />
          <Input
            label="Telefone do Contato de Emergência"
            className="w-full"
            value={formValues.informacaoSeguranca.telefoneContatoEmergencia}
            onChange={(e) => handleChange("informacaoSeguranca.telefoneContatoEmergencia", e.target.value)}
            onBlur={() => validateField("informacaoSeguranca.telefoneContatoEmergencia", formValues.informacaoSeguranca.telefoneContatoEmergencia)}
            notification={{
              isError: Boolean(errors["informacaoSeguranca.telefoneContatoEmergencia"]),
              notification: errors["informacaoSeguranca.telefoneContatoEmergencia"] ?? "",
            }}
          /></div>

      </div>
      <div className="flex justify-end">
        <Button onClick={submitForm} disabled={isPending}>
          {isPending ? "Enviando..." : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default PessoaForm;
