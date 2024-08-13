import PessoaCadastro from "./components/pessoaCadastro";

const Pessoa = () => {
  return (
    <div className="flex h-screen w-full bg-green">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <PessoaCadastro />
      </div>
    </div>
  );
};

export default Pessoa;
