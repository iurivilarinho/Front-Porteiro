import { DeleteIcon, EyeIcon, PinIcon } from "lucide-react";
import { Button } from "../button/button";

interface DialogProps {
  selectId: number;
  onClose: () => void;
} 

const OptionDialogTable = ({ selectId, onClose }: DialogProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <div className="mt-2">
          <Button size="sm" className="w-28" onClick={()=>alert(selectId)}>
            Visualizar <EyeIcon className="ml-3" />
          </Button>
        </div>
        <div className="mt-2">
          <Button size="sm" className="w-28">
            Editar <PinIcon className="ml-8" />
          </Button>
        </div>
        <div className="mt-2">
          <Button size="sm" className="w-28">
            Desativar <DeleteIcon className="ml-3" />
          </Button>
        </div>
        <div>
          <Button size="sm" className="mt-4" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OptionDialogTable;
