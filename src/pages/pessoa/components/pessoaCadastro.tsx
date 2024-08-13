import { useEffect, useState } from "react";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { usePostPessoa } from "@/lib/api/tanstackQuery/pessoa";
import useValidation from "@/lib/hooks/useValidation";
import { useNavigate } from "react-router-dom";
import { Pessoa } from "@/types/pessoa";

const PessoaForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
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
      urlFotoPerfil: "",
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
  });

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
      "endereco.rua": (value) => (value ? null : "Rua é obrigatória"),

      // Adicione validação para outros campos conforme necessário
    },
    {
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
        urlFotoPerfil: "",
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

  const handleInputChange = (field: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitForm = () => {
    if (validateForm()) {
      postPessoa(values as Pessoa);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/pessoas-lista");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex w-full max-w-lg flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Cadastrar Pessoa</h1>
      <Input
        label="Nome Completo"
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
      {/* Adicione campos adicionais para cpf, rg, genero, estadoCivil, etc. */}
      <Input
        label="CPF"
        value={formValues.cpf}
        onChange={(e) => handleChange("cpf", e.target.value)}
        onBlur={() => validateField("cpf", formValues.cpf)}
        notification={{
          isError: Boolean(errors.cpf),
          notification: errors.cpf ?? "",
        }}
      />
      {/* Campos de endereço */}
      <Input
        label="Rua"
        value={formValues.endereco.rua}
        onChange={(e) => {
          handleChange("endereco.rua", e.target.value);
          console.log(errors.endereco);
        }}
        onBlur={() => validateField("endereco.rua", formValues.endereco.rua)}
        notification={{
          isError: Boolean(errors["endereco.rua"]),
          notification: errors["endereco.rua"] ?? "",
        }}
      />
      {/* Adicione outros campos do endereço e informações de segurança */}
      <div className="flex justify-end">
        <Button onClick={submitForm} disabled={isPending}>
          {isPending ? "Enviando..." : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default PessoaForm;
