
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./button/button";
import { NumberField } from "./input/numberField";
import { useState } from "react";

interface RandomProps {
    numberOfShares: number;
    onGenerate: (numbers: number[]) => void;

}

const DialogRandom = ({ onGenerate, numberOfShares }: RandomProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [quantityToGenerate, setQuantityToGenerate] = useState(0);
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

    const handleGenerate = () => {
        const numbers = new Set<number>();

        while (numbers.size < quantityToGenerate) {
            const randomNumber = Math.floor(Math.random() * 100);
            numbers.add(randomNumber);
        }

        const generatedNumbers = Array.from(numbers);
        setRandomNumbers(Array.from(numbers));
        onGenerate(generatedNumbers);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="mb-4 w-36 h-16"
                >
                    Gerar Aleatorio
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Gerar Cotas de Forma Aleatoria
                    </DialogTitle>
                    <DialogDescription>
                        Informe a quantidade de cotas que deseja gerar.
                    </DialogDescription>
                </DialogHeader>
                <div
                    className="flex"
                >
                    <NumberField
                        value={0}
                        onChange={setQuantityToGenerate}
                        min={1}
                        max={numberOfShares}
                        step={1}
                    />
                    <Button
                        onClick={handleGenerate}
                        className="ml-10"
                    >
                        Gerar
                    </Button>
                </div>
                <div
                    className="flex flex-row flex-wrap p-2">
                    {randomNumbers.map((number, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center rounded border ml-1 mt-1 w-8 ">
                            <p>{number}</p>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={() => {
                        onGenerate(randomNumbers);
                        setIsOpen(false); // Fechar o Dialog ao clicar em Confirmar
                    }}
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogRandom;