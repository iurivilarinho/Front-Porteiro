const DisplayImage = () => {
  return (
    <div className="flex justify-center items-center">
      <img
        src="https://ogimg.infoglobo.com.br/in/3005719-29f-c95/FT1086A/Teste-da-Yamaha-XJ6.-Foto-de-Fabio-RossiAgencia-O-Globo.jpg" // Substitua pelo caminho da sua imagem
        alt="Description of the image"
        className="w-64 h-64 object-cover rounded-md" // Estilo com Tailwind CSS
      />
    </div>
  );
};

export default DisplayImage;
