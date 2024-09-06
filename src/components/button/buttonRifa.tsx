// Definição da interface para as propriedades do botão
interface ButtonRifaProps {
  label?: string; // Propriedade opcional para o texto do botão
  onClickSelect: () => void; // Propriedade obrigatória para a função de clique
  disabled?: boolean; // Propriedade opcional para desabilitar o botão
  className?: string; // Propriedade opcional para adicionar classes CSS
  selected?: boolean;
  sold?: boolean;
  userPurchase?: boolean;
}

// Componente ButtonRifa utilizando a interface diretamente
const ButtonRifa = ({
  label,
  onClickSelect,
  disabled = false,
  className = "",
  selected = false,
  sold = false,
  userPurchase = false,
}: ButtonRifaProps) => {
  // Define disabled como true se sold for true
  const isDisabled = sold || disabled;

  return (
    <button
      onClick={onClickSelect}
      disabled={isDisabled}
      className={`py-2 px-4 rounded border ${userPurchase ? "bg-green-500" : isDisabled ? "bg-gray-500 text-gray-200 cursor-not-allowed" : sold ? "bg-red-300 text-white" : selected ? "bg-blue-500 text-white" : "bg-white text-black"} ${className}`}
    >
      {label}
    </button>
  );
};

export default ButtonRifa;
