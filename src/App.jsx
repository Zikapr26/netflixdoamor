import React, { useState } from 'react';

// Dados das suas "capas de filme" - personalize com suas próprias fotos, títulos e descrições!
// As URLs das imagens são apenas placeholders. Substitua por links das suas fotos!
const movieData = [
  {
    id: 1,
    // ATENÇÃO: Substitua este link de placeholder por um link DIRETO para a sua imagem principal (formato retangular 16:9)!
    // Exemplo de link direto: 'https://i.imgur.com/sua_foto_destaque.jpg'
    imageUrl: 'https://i.imgur.com/EthsqMd.jpeg', // Imagem maior para o hero (proporção 16:9)
    title: 'Nosso Momento Destaque',
    description: 'Feliz Dia Dos Namorados e quero agradecer o que fez e tem feito por mim! Que possamos passar varios e varios até ficarmos bem velhinhos',
    year: '2013',
    duration: 'ao infito e além',
    genre: 'Comédia Romântica',
    rating: '5 estrelas',
    isFeatured: true // Flag para identificar o item em destaque
  },
  {
    id: 2,
    // ATENÇÃO: Substitua este link de placeholder por um link DIRETO para a sua imagem (formato pôster 2:3)!
    // Links de Google Fotos (photos.app.goo.gl) ou ibb.co geralmente NÃO funcionam diretamente aqui.
    imageUrl: 'https://i.imgur.com/nlEgoSG.jpeg', // Proporção de pôster (2:3)
    title: 'Aventura nas Montanhas',
    description: 'Nossa viagem inesquecível, com vistas deslumbrantes, risadas e muitos lanches. Onde o amor e a natureza se encontraram.',
    year: '2023',
    duration: 'alguns dias ',
    genre: 'Aventura/Documentário/comedia',
    rating: '5 estrelas',
    // Adicione videoUrl se desejar que este item tenha um vídeo
    // videoUrl: 'https://www.youtube.com/embed/SEU_VIDEO_ID_AQUI_DO_YOUTUBE'
  },
  {
    id: 3,
    imageUrl: 'https://i.imgur.com/A0cGM3E.jpeg', // CORRIGIDO: Removido o texto extra do link da imagem.
    title: 'Noite de aventuras e Risadas',
    description: 'Nessa noite foi muito engraçada e especial, e a cada dia eu percebo o quanto eu TE Amo',
    year: '2025',
    duration: 'Sempre',
    genre: 'Aventura/Romance',
    rating: 'Incalculável',
    videoUrl: 'https://www.youtube.com/embed/_ZbBr5XF6RA' // CORRIGIDO: Removido o parâmetro '?si=...' do link do YouTube.
  },
  {
    id: 4,
    imageUrl: 'https://i.imgur.com/EGu6drX.jpeg',
    title: 'O Verão Inesquecível', // Removido o '+' do título para melhor renderização
    description: 'Sol, praia, areia e muito amor. Um verão que ficará para sempre em nossas memórias, cheio de momentos felizes e relaxantes.',
    year: '2023',
    duration: '1 Semana de pura alegria',
    genre: 'Romance',
    rating: '5 estrelas'
  },
  {
    id: 5,
    imageUrl: 'https://i.imgur.com/qxYQFA5.jpeg',
    title: 'Nosso Aniversário',
    description: 'A celebração do nosso amor, ano após ano. Cada aniversário é um marco de crescimento, felicidade e companheirismo.',
    year: 'Todos os anos',
    duration: '24 horas de festa',
    genre: 'Comemoração',
    rating: 'Perfeito'
  },
  {
    id: 6,
    imageUrl: 'https://i.imgur.com/rnHqNVh.jpeg',
    title: 'Nosso Casamento',
    description: 'Um momento de muito alegria e risadas com aquele video feito que pra sempre ficara em minha memoria ',
    year: 'Desde sempre',
    duration: 'Infinito',
    genre: 'Comédia',
    rating: 'Máximo'
  },
  {
    id: 7,
    imageUrl: 'https://i.imgur.com/KcMsPkx.jpeg',
    title: 'O Dia da Primeira Viagem', // Removido o '+' do título
    description: 'Umas das primeiras "viagens" para um lugar novo. A certeza que eu tenho é que em qualquer lugar com voce é especial.',
    year: '2021',
    duration: 'Uma vida de memórias',
    genre: 'Exploração',
    rating: '5 estrelas'
  },
  {
    id: 8,
    imageUrl: 'https://i.imgur.com/VzVK7Go.jpeg',
    title: 'Momentos Culinários',
    description: 'Cada refeição que preparamos juntos é uma aventura deliciosa e cheia de amor.',
    year: 'Continuamente',
    duration: 'Sabores eternos',
    genre: 'Gastronomia/Romance',
    rating: 'Delicioso'
  },
  {
    id: 9,
    imageUrl: 'https://i.imgur.com/5xTjeiw.jpeg',
    title: 'Nosso Filho Peludo',
    description: 'A alegria de ter nossos companheiros de quatro patas, que enchem nossa casa de amor, bagunça e momentos adoráveis.',
    year: 'Sempre',
    duration: 'Pra sempre',
    genre: 'Família',
    rating: 'Amor puro'
  },
  {
    id: 10,
    imageUrl: 'https://i.imgur.com/dN7zjQ6.jpeg',
    title: 'Rolezinho Perfeito',
    description: 'Nossos rolezinho de preguiçosos, mais sempre gostosos por estar ao seu lado.',
    year: '2024',
    duration: 'Algumas horas de pura felicidade',
    genre: 'Romance',
    rating: 'Excelente'
  },
  {
    id: 11,
    imageUrl: 'https://i.imgur.com/vk3nD9V.jpeg',
    title: 'Seu dia',
    description: 'Sempre bom acompanhar suas vitorias e poder dizer que voce é a mulher da minha vida!',
    year: '2023',
    duration: 'Até altas horas',
    genre: 'Entretenimento',
    rating: '5 Estrelas'
  },
];

// Componente da Página Inicial (mostra a grade de capas)
const HomePage = ({ onSelectMovie }) => {
  const featuredMovie = movieData.find(movie => movie.isFeatured) || movieData[0]; // Pega o filme em destaque ou o primeiro

  // Filtra todos os filmes que NÃO são o destaque
  const nonFeaturedMovies = movieData.filter(movie => !movie.isFeatured);

  // Divide os filmes restantes em categorias para as filas de forma mais equilibrada
  const category1Movies = nonFeaturedMovies.slice(0, 4); // Por exemplo, os primeiros 4 para a primeira fila
  const category2Movies = nonFeaturedMovies.slice(4, 8); // Os próximos 4 para a segunda fila
  const remainingMovies = nonFeaturedMovies.slice(8); // O restante para uma terceira fila (se houver)


  // Componente para uma fila de filmes
  const MovieRow = ({ title, movies }) => (
    <section className="relative z-20 mb-8 pl-4 sm:pl-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white">{title}</h2> {/* Texto branco para título da fila */}
      <div className="flex overflow-x-scroll scrollbar-hide pb-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[120px] h-[180px] sm:w-[150px] sm:h-[225px] md:w-[180px] md:h-[270px] mr-2 sm:mr-3 cursor-pointer relative overflow-hidden rounded-sm transition-all duration-300 transform group hover:scale-110 hover:z-30 shadow-lg"
            onClick={() => onSelectMovie(movie)}
          >
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover rounded-sm group-hover:rounded-sm transition-all duration-300"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x450/000000/FFFFFF?text=Erro" }} // Fallback image
            />
            {/* O título não aparece na capa na Netflix, mas pode ser adicionado em um overlay ao hover se desejar */}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white font-inter overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black to-transparent p-4 z-50 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#E50914]">NETFLIX <span className="text-white">DO AMOR</span></h1> {/* Logo Netflix */}
        {/* Você pode adicionar links de navegação aqui */}
      </header>

      {/* Seção Hero (Filme em Destaque) */}
      <section
        className="relative h-[70vh] md:h-[90vh] flex items-end pb-12 sm:pb-24 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%), url(${featuredMovie.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay para escurecer a imagem */}
        <div className="relative z-10 p-6 sm:p-10 max-w-2xl mx-auto md:mx-0 md:ml-16 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4 leading-tight">
            {featuredMovie.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mb-6 line-clamp-3">
            {featuredMovie.description}
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center md:justify-start">
            <button
              onClick={() => onSelectMovie(featuredMovie)}
              className="bg-white text-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-bold text-base sm:text-lg hover:bg-gray-200 transition-colors duration-300 flex items-center shadow-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              Assistir
            </button>
            <button
              onClick={() => onSelectMovie(featuredMovie)}
              className="bg-gray-600 bg-opacity-70 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-bold text-base sm:text-lg hover:bg-gray-500 transition-colors duration-300 flex items-center shadow-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 9v2H2V9h16zm-1-6H3v2h14V3zm-1 12H4v2h12v-2z" />
              </svg>
              Mais Informações
            </button>
          </div>
        </div>
      </section>

      {/* Filas de filmes */}
      <div className="relative z-30 -mt-20 sm:-mt-24"> {/* Ajuste para sobrepor a hero section */}
        <MovieRow title="Nossos Melhores momentos" movies={category1Movies} />
        <MovieRow title="Momentos Inesquecíveis" movies={category2Movies} />
        {remainingMovies.length > 0 && <MovieRow title="Outros Momentos Especiais" movies={remainingMovies} />}
      </div>

      {/* Rodapé */}
      <footer className="text-center text-gray-400 mt-12 text-sm pb-6 bg-[#141414]">
        Feito com todo o amor para você, meu eterno par. ❤️
      </footer>
    </div>
  );
};

// Componente da Página de Detalhes (mostra informações de um "filme")
const DetailPage = ({ movie, onBack }) => {
  const [showPlayMessage, setShowPlayMessage] = useState(false);

  // Função para simular o "play" do filme
  const handlePlayClick = () => {
    setShowPlayMessage(true);
    setTimeout(() => setShowPlayMessage(false), 3000); // Esconde a mensagem após 3 segundos
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white font-inter p-6 sm:p-10 flex flex-col items-center justify-start pt-20"> {/* Ajuste o padding-top */}
      <div className="max-w-4xl w-full bg-[#222222] rounded-xl shadow-2xl p-6 sm:p-8 relative">
        {/* Botão de voltar */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-full text-lg sm:text-xl transition-colors duration-300 flex items-center justify-center"
          aria-label="Voltar para a página inicial"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start mt-8 md:mt-0"> {/* Ajuste o margin-top */}
          {/* AQUI: Renderiza o vídeo se houver videoUrl, senão a imagem */}
          <div className="flex-shrink-0">
            {movie.videoUrl ? (
              <div className="relative w-64 sm:w-80 h-36 sm:h-48 rounded-xl shadow-lg border-2 border-[#E50914] overflow-hidden">
                <iframe
                  src={movie.videoUrl}
                  title={movie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            ) : (
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-64 sm:w-80 h-auto rounded-xl shadow-lg border-2 border-[#E50914]"
              />
            )}
          </div>

          {/* Detalhes do filme */}
          <div className="flex-grow text-center md:text-left mt-4 md:mt-0">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E50914] mb-2">{movie.title}</h1>
            <p className="text-gray-300 text-base sm:text-lg mb-4">{movie.description}</p>

            {/* Informações adicionais */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-400 text-sm sm:text-base mb-6 justify-center md:justify-start">
              <span>Ano: <span className="font-semibold text-white">{movie.year}</span></span>
              <span>Duração: <span className="font-semibold text-white">{movie.duration}</span></span>
              <span>Gênero: <span className="font-semibold text-white">{movie.genre}</span></span>
              <span>Avaliação: <span className="font-semibold text-white">{movie.rating}</span></span>
            </div>

            {/* Botão de "Play" */}
            <button
              onClick={handlePlayClick}
              className="bg-[#E50914] hover:bg-[#B9090B] text-white font-bold py-3 px-8 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto md:mx-0"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              {movie.videoUrl ? 'Assistir Vídeo' : 'Assistir Agora'}
            </button>

            {/* Mensagem de "Play" */}
            {showPlayMessage && (
              <div className="mt-4 p-3 bg-red-500 rounded-lg text-center text-white font-semibold animate-fadeInOut">
                Que a magia da nossa história continue a cada clique! ❤️
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal da aplicação
export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para o filme selecionado

  // Função para lidar com a seleção de um filme (abre a página de detalhes)
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  // Função para voltar para a página inicial
  const handleBackToHome = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="font-inter">
      {/* Renderiza a página de detalhes se um filme estiver selecionado, caso contrário, a página inicial */}
      {selectedMovie ? (
        <DetailPage movie={selectedMovie} onBack={handleBackToHome} />
      ) : (
        <HomePage onSelectMovie={handleSelectMovie} />
      )}
    </div>
  );
}
