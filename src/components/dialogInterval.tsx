
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
import { Input } from "./input/input";

interface IntervalProps {

}

const DialogInterval = ({ }: IntervalProps) => {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="mb-4 w-36 h-16"
                >
                    Selecione o intervalo
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Selecionar cotas entre um intervalo númerico
                    </DialogTitle>
                    <DialogDescription>
                        Informe sobre qual intervalo deseja selecionar.
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <Input
                        label="De:"
                    >
                    </Input>
                </div>
                <div>
                    <Input
                        label="Até:"
                    >
                    </Input>
                </div>

                <DialogFooter>
                    <Button >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogInterval;