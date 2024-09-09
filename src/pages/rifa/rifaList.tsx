import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetRifa, useGetRifaByCpf } from "@/lib/api/tanstackQuery/rifa";
import { Rifa } from "@/types/rifa";
import { useNavigate, useParams } from "react-router-dom";

const RifaList = () => {
  const { cpf } = useParams();
  const navigate = useNavigate();

  // Consulta todas as rifas
  const {
    data: allRifas,
    isLoading: isLoadingRifas,
    error: errorRifas,
  } = useGetRifa();

  const {
    data: rifasByCpf,
    isLoading: isLoadingCpf,
    error: errorCpf,
  } = useGetRifaByCpf(cpf ?? "", {
    enabled: Boolean(cpf), // Executa apenas quando o CPF está disponível
  });

  const handleOnClickCard = (id: number | undefined) => {
    navigate(`/rifa/${id}`);
  };

  // Verificar se algum estado está carregando
  if (isLoadingRifas || isLoadingCpf) return <div>Carregando...</div>;

  // Verificar se algum erro ocorreu
  if (errorRifas || errorCpf)
    return (
      <div>
        Erro ao carregar dados: {errorRifas?.message || errorCpf?.message}
      </div>
    );

  // Decidir qual conjunto de rifas exibir: todas as rifas ou rifas filtradas por CPF
  const rifas = cpf ? rifasByCpf : allRifas;

  // Verifique se 'rifas' existe e se é uma lista antes de tentar mapear
  if (!rifas || rifas.length === 0) {
    return <div>Nenhuma rifa encontrada</div>;
  }

  return (
    <div className="mb-16">
      {rifas.map((rifa: Rifa) => {
        // Calcular a porcentagem de cotas vendidas
        const totalCotas = rifa.cotas.length;
        const cotasVendidas = rifa.cotas.filter((cota) => cota.sold).length;
        const porcentagemVendida =
          cotasVendidas === 0 ? 0 : (cotasVendidas / totalCotas) * 100;

        return (
          <div className="relative my-3" key={rifa.id}>
            <Card
              onClick={() => handleOnClickCard(rifa.id)}
              className="relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 h-full bg-green-500"
                style={{ width: `${porcentagemVendida}%` }}
              ></div>

              <CardHeader className="relative">
                <CardTitle>{rifa.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative"></CardContent>
              <CardFooter className="relative flex justify-between">
                <p> Preço da Cota: {rifa.quotaPrice} </p>
                <p>{porcentagemVendida.toFixed(2)}% vendido</p>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default RifaList;
