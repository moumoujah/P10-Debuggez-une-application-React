import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(( evtB,evtA) => // Inverser evtB evtA pour afficher les événements du plus ancien au plus récent
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // Vérification pour s'assurer que byDateDesc n'est pas undefined
    if (byDateDesc !== undefined) { 
      // Ajout d'un -1 sur byDateDesc.length pour éviter de dépasser la limite de la longueur du tableau
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0); 
    }
  };
  
  useEffect(() => {
    // déplacement de setTimeout dans useEffect pour remettre le compteur à 0 
    const time = setTimeout(() => { 
      nextCard();
    }, 5000); 
    return () => {
      clearTimeout(time);
    };
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
         // déplacer le key dans le div globale 
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))} 
      {/* extraction des boutons radio en dehors du mapping pour éviter les doublons*/}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title} 
              type="radio"
              name="radio-button"
              // checked= radioIdx correspond au state index
              checked={radioIdx === index} 
               // onChange sert à modifier le bouton coché et vient set le state index pour qu'il corresponde à l'index du bouton sélectionné
              onChange={() => setIndex(radioIdx)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;