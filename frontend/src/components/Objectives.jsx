import { Carousel } from "antd";
import humanity from "../assets/humanite.jpg";
import impartialite from "../assets/IMPARTIALITe.jpg";
import neutralite from "../assets/NEUTRALITe.jpg";
import independance from "../assets/INDePENDANCE.jpg";
import volantaire from "../assets/Volontariat.jpg";
import unite from "../assets/unité.jpg";
const Objectives = () => {
  return (
    <div className="vh-100 bg-white pt-5" id="principle">
      <h2 className="text-center fw-bold">
        Les Principes fondamentaux de la <br />
        Croix Croissant Rouge
      </h2>
      <div className="container pt-5">
        <Carousel autoplay>
          <div>
            <div className="row">
              <div className="col-lg-4">
                <div className="d-flex justify-content-center flex-column text-center">
                  <img
                    src={humanity}
                    style={{
                      height: "150px",
                      width: "150px",
                      margin: "0 auto",
                    }}
                  />

                  <h4 className="fw-bold">HUMANITÉ</h4>
                  <p>
                    Né du souci de porter secours sans discrimination aux
                    blessés des champs de bataille, le Mouvement International
                    de la Croix-Rouge et du Croissant-Rouge, s'efforce de
                    prévenir et d'alléger en toutes circonstances les
                    souffrances humaine. Il tend à protéger la vie et la santé
                    ainsi qu'à faire respecter la personne humaine. Il favorise
                    la compréhension mutuelle, l'amitié, la coopération et une
                    paix durable entre tous les peuples.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-center flex-column text-center">
                  <img
                    src={impartialite}
                    style={{
                      height: "150px",
                      width: "150px",
                      margin: "0 auto",
                    }}
                  />

                  <h4 className="fw-bold">IMPARTIALITÉ </h4>
                  <p>
                    Il ne fait aucune distinction de nationalité, de race, de
                    religion, de condition sociale et d'appartenance politique.
                    Il s'applique seulement à secourir les individus à la mesure
                    de leur souffrance et à subvenir par priorité aux détresses
                    les plus urgentes
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-center flex-column text-center">
                  <img
                    src={neutralite}
                    style={{
                      height: "150px",
                      width: "150px",
                      margin: "0 auto",
                    }}
                  />

                  <h4 className="fw-bold">NEUTRALITÉ</h4>
                  <p>
                    Afin de garder la confiance de tous, le mouvement s'abstient
                    de prendre part aux hostilités et, en tout temps, aux
                    controverses d'ordre politique, racial, religieux et
                    idéologique.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-lg-4">
                <div className="d-flex justify-content-center flex-column text-center">
                  <img
                    src={independance}
                    style={{
                      height: "150px",
                      width: "150px",
                      margin: "0 auto",
                    }}
                  />

                  <h4 className="fw-bold">INDÉPENDANCE</h4>
                  <p>
                    Le Mouvement est indépendant. Auxiliaires des pouvoirs
                    publics dans leurs activités humanitaires et soumises aux
                    lois qui régissent leurs pays respectifs, les Sociétés
                    Nationales doivent pourtant conserver une autonomie qui leur
                    permette d'agir toujours selon les principes du Mouvement.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-center flex-column text-center">
                  <img
                    src={volantaire}
                    style={{
                      height: "150px",
                      width: "150px",
                      margin: "0 auto",
                    }}
                  />

                  <h4 className="fw-bold">VOLONTARIAT </h4>
                  <p>
                    Il est un Mouvement de secours volontaire et désintéressé.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-center flex-column text-center">
                  <img
                    src={unite}
                    style={{
                      height: "150px",
                      width: "150px",
                      margin: "0 auto",
                    }}
                  />

                  <h4 className="fw-bold">UNITÉ </h4>
                  <p>
                    Il ne peut y avoir qu'une seule société de la Croix-Rouge ou
                    du Croissant-Rouge dans un même pays. Elle doit être ouverte
                    à tous et étendre son action humanitaire au territoire
                    entier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};
export default Objectives;
