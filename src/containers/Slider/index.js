import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(( evtB,evtA) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    if (byDateDesc !== undefined) { 
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
    }
  };
  
  useEffect(() => {
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
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title} 
              type="radio"
              name="radio-button"
              checked={radioIdx === index} 
              onChange={() => setIndex(radioIdx)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;