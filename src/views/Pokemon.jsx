import { Container } from "react-bootstrap";
import PokemonComp from "../components/PokemonComp";

//Vista de los datos del Pokemon seleccionado. 
const Navigation = () => {
    return (
        <Container className="pt-5">
            <PokemonComp />
        </Container>
    );
};
export default Navigation;
