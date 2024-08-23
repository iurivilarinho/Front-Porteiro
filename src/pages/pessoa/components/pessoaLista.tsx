import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableRowWihtButton,
} from "@/components/ui/table";
import { useState } from "react";

import { Pagination } from "@/components/ui/pagination";

import { useGetPessoa } from "@/lib/api/tanstackQuery/pessoa";
import { Pessoa } from "@/types/pessoa";
import { useNavigate } from "react-router-dom";

export function ListaPessoa() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, error } = useGetPessoa();

  const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | null>(null);

  const navigate = useNavigate();

  const handleButtonClick = (pessoa: Pessoa) => {
    setSelectedPessoa(pessoa);
    navigate(`/pessoa/visualizar/${pessoa.id}`)
  };


  // Paginação dos dados
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = Math.max(currentPage - 1, 1) * itemsPerPage;
  const paginatedData = data?.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento
  }

  if (error) {
    return <div>Erro ao carregar os dados.</div>; // Exibe uma mensagem de erro
  }

  if (!data || data.length === 0) {
    return <div>Nenhuma pessoa encontrada.</div>; // Exibe uma mensagem caso não haja dados
  }

  return (
    <div className="flex h-full justify-center w-full p-10">
      <div className="w-4/5">
        <Table className="bg-slate-50">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="">Data Nascimento</TableHead>
              <TableHead>Placa Veiculo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((pessoa: Pessoa) => (
              <TableRowWihtButton
                key={pessoa.id}
                onClickVisualize={() => handleButtonClick(pessoa)}
              >
                <TableCell className="font-medium">
                  {pessoa.nomeCompleto}
                </TableCell>
                <TableCell>{pessoa.email}</TableCell>
                <TableCell>{pessoa.telefoneCelular}</TableCell>
                <TableCell className="">{pessoa.dataNascimento}</TableCell>
                <TableCell>
                  {pessoa.informacaoSeguranca?.placaVeiculo || "N/A"}
                </TableCell>
              </TableRowWihtButton>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  ></Pagination>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
