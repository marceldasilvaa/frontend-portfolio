import "./Home.css";

// images
import myPhoto from "../../images/foto-diploma.jpeg";
import jsLogo from "../../images/js.png"
import reactLogo from "../../images/react.png"
import nodeLogo from "../../images/nodejs.png"

// components
import Button from "../../components/Button/Button";

// links
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home">
      <div className="container">
        <div className="me">
          <img src={myPhoto} alt="Minha foto" />
          <h1>Eu sou o Marcel Alves</h1>
          <p>Desenvolvedor Front-End em Rio de Janeiro, Brasil.</p>
        </div>
        <div className="resume">
          <p>Apaixonado por resolver problemas através da programação</p>
          <aside>
            <Link to="/contact">
              <Button children={"Fale comigo"} className={"btn-contact"} />
            </Link>
            <Link to="/projects">
              <Button children={"Meus projetos"} className={"btn-main"} />
            </Link>
          </aside>
          <hr />
          <div className="portfolioLanguages">
            <h3>Linguagens neste projeto</h3>
            <div id="languages">
              <div className="js">
                <img src={jsLogo} alt="Logo JavaScript" />
                <p>JavaScript</p>
              </div>
              <div className="react">
                <img src={reactLogo} alt="Logo React" />
                <p>React</p>
              </div>
              <div className="nodejs">
                <img src={nodeLogo} alt="Logo Node" />
                <p>NodeJS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
