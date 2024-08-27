// Definição da interface para as propriedades do botão
interface ButtonRifaProps {
  label?: string; // Propriedade opcional para o texto do botão
  onClickSelect: () => void; // Propriedade obrigatória para a função de clique
  disabled?: boolean; // Propriedade opcional para desabilitar o botão
  className?: string; // Propriedade opcional para adicionar classes CSS
  selected?: boolean;
}

// Componente ButtonRifa utilizando a interface diretamente
const ButtonRifa = ({
  label,
  onClickSelect,
  disabled,
  className = "",
  selected = false, // Valor padrão para className
}: ButtonRifaProps) => {
  return (
    <button
      onClick={onClickSelect}
      disabled={disabled}
      className={`py-2 px-4 rounded border ${selected ? "bg-blue-500 text-white" : "bg-white text-black"} ${className}`}
    >
      {label}
    </button>
  );
};

export default ButtonRifa;
