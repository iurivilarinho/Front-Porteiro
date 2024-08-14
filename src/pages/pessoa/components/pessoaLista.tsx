import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis
} from "@/components/ui/pagination"

import { useGetPessoa } from "@/lib/api/tanstackQuery/pessoa";
import { Pessoa } from "@/types/pessoa";

export function ListaPessoa() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data, isLoading, error } = useGetPessoa();

    if (isLoading) {
        return <div>Carregando...</div>; // Exibe uma mensagem de carregamento
    }

    if (error) {
        return <div>Erro ao carregar os dados.</div>; // Exibe uma mensagem de erro
    }

    if (!data || data.length === 0) {
        return <div>Nenhuma pessoa encontrada.</div>; // Exibe uma mensagem caso não haja dados
    }

    // Paginação dos dados
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    // Função para renderizar itens da paginação com "..."
    const renderPaginationItems = () => {
        const items = [];
        if (totalPages <= 3) {
            // Se há 3 páginas ou menos, mostra todas
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => setCurrentPage(i)}
                            isCurrent={currentPage === i}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            // Sempre mostra a primeira página
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        onClick={() => setCurrentPage(1)}
                        isCurrent={currentPage === 1}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            // Adiciona "..." antes da página atual, se necessário
            if (currentPage > 2) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            // Adiciona a página atual, se for diferente da primeira e última
            if (currentPage > 1 && currentPage < totalPages) {
                items.push(
                    <PaginationItem key={currentPage}>
                        <PaginationLink
                            onClick={() => setCurrentPage(currentPage)}
                            isCurrent
                        >
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            // Adiciona "..." depois da página atual, se necessário
            if (currentPage < totalPages - 1) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            // Sempre mostra a última página
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        onClick={() => setCurrentPage(totalPages)}
                        isCurrent={currentPage === totalPages}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

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
                            <TableRow key={pessoa.id}>
                                <TableCell className="font-medium">{pessoa.nomeCompleto}</TableCell>
                                <TableCell>{pessoa.email}</TableCell>
                                <TableCell>{pessoa.telefoneCelular}</TableCell>
                                <TableCell className="">{pessoa.dataNascimento}</TableCell>
                                <TableCell>{pessoa.informacaoSeguranca?.placaVeiculo || 'N/A'}</TableCell>
                            </TableRow>
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
                                    >
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Anterior
                                        </PaginationPrevious>
                                        {renderPaginationItems()}
                                        <PaginationNext
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Próximo
                                        </PaginationNext>
                                    </Pagination>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}
