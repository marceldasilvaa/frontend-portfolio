import "./About.css";

// images
import reactJS from "../../images/reactjs.png";
import mongoAndNode from "../../images/nodejs-mongodb.png";

// components
import Button from "../../components/Button/Button";

// links
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div id="about">
      <div className="container">
        <h1>Sobre mim</h1>
        <h2>Trajetória</h2>
        <p>
          Iniciei minha jornada na programação no início de 2024. Meus primeiros
          passos foram com HTML e CSS, que, embora não sejam linguagens de
          programação, me introduziram ao mundo do desenvolvimento web. Aprendi
          a criar layouts e estilizar páginas, e foi essa experiência que
          despertou meu interesse em explorar mais a fundo o desenvolvimento de
          aplicações dinâmicas e interativas.
        </p>
        <p>
          Decidi então mergulhar no JavaScript, uma linguagem que me permitiria
          dar vida aos meus projetos. Comecei com um curso básico e gratuito
          para entender os fundamentos da linguagem. Gostei tanto que, ao
          concluir o curso, decidi me aprofundar ainda mais, realizando um curso
          completo que cobria desde o básico até tópicos avançados, como
          Programação Orientada a Objetos (POO), manipulação de APIs e muito
          mais.
        </p>
        <p>
          Não satisfeito, busquei expandir meus conhecimentos para o ecossistema
          React, que concluí em 2025. Durante esse período, desenvolvi projetos
          completos, integrando frontend com backend utilizando tecnologias como
          Node.js, Mongoose (MongoDB), Bcrypt, Multer e JWT para autenticação.
          Esses projetos me permitiram consolidar minhas habilidades e entender
          como todas as peças do desenvolvimento web se conectam.
        </p>
        <h2>Habilidades</h2>
        <p>
          Ao longo da minha jornada, adquiri um conjunto diversificado de
          habilidades que me permitem atuar tanto no desenvolvimento frontend
          quanto no backend.{" "}
        </p>
        <div id="skills">
          <div className="jsAndReact">
            <img src={reactJS} alt="React e JavaScript" />
            <h2>JS & React</h2>
            <p>
              No frontend, domino JavaScript e React, tecnologias que utilizo
              para criar interfaces dinâmicas, responsivas e interativas.
            </p>
          </div>
          <div className="mongoAndNode">
            <img src={mongoAndNode} alt="Mongo e Node" />
            <h2>Mongo & NodeJS</h2>
            <p>
              No backend, tenho experiência com Node.js e MongoDB (através do
              Mongoose), que me permitem construir APIs robustas e gerenciar
              bancos de dados de forma eficiente.{" "}
            </p>
          </div>
        </div>
        <p>
          Além disso, utilizei JWT e Bcrypt para implementar sistemas de
          autenticação seguros, e Multer para gerenciar uploads de arquivos.
          Essas habilidades, combinadas com boas práticas como versionamento com
          Git e metodologias ágeis, me capacitam a desenvolver soluções
          completas e escaláveis, desde a concepção até a implementação.
        </p>
        <h2>Objetivos</h2>
        <p>
          Meu objetivo é continuar aprimorando minhas habilidades tanto no
          frontend quanto no backend, buscando sempre me atualizar com as
          melhores práticas e tecnologias do mercado. Além disso, planejo
          expandir meus conhecimentos aprendendo Golang, uma linguagem que
          admiro por sua eficiência e desempenho. Acredito que essa combinação
          de habilidades me permitirá desenvolver soluções ainda mais robustas e
          escaláveis, contribuindo para projetos inovadores e desafiadores.
        </p>
        <div id="buttonsAbout">
          <Link to="/contact">
            <Button children={"Fale comigo"} className={"btn-contact"} />
          </Link>
          <Link to="/projects">
            <Button children={"Meus projetos"} className={"btn-main"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
