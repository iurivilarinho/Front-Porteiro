import { Document } from "../../types/document"

const DisplayImage = ({ documento, nome, contentType }: Document) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={`data:${contentType};base64,${documento}`} alt={nome} // Substitua pelo caminho da sua imagem
        className="w-64 h-64 object-cover rounded-md" // Estilo com Tailwind CSS
      />
    </div>
  );
};

export default DisplayImage;
