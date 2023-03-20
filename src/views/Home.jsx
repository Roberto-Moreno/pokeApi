import image_picachu from "../assets/img/picachu.png";
import { Container } from "react-bootstrap";

//Vista de datos del home
const Home = () => {
  return (
    <Container className="text-center">
      <h1 className="pt-5">
        Bienvenido <span className="fw-bold">Maestro Pokemon</span></h1>
      
      <img className="imagen_pastel" src={image_picachu} alt={'foto'}/>
      <h2 className="pt-5 font-weight-bold">El lugar de los Pokemones felices.</h2>
    </Container>
  );
};
export default Home;