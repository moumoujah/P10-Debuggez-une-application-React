import { useCallback, useRef, useState } from "react"; // Ajout du useRef pour reset le formulaire
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 600); })

const Form = ({ onSuccess, onError }) => {
  const formRef = useRef()
  const [sending, setSending] = useState(false);
  const [selectOption, setSelectOption] = useState(null);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      // Ajout tu texte dans la li si aucune valeur n'est sélectionnée dans le composant Select
      const form = evt.target;
      const element = form.querySelector("li");
      const texte = document.createTextNode("Choisissez une valeur");

      if(!selectOption) {
      
        // Ajout du d'une class Error si aucune valeur n'est sélectionné
        element.classList.add("Error_");
        // Ajoutez le nœud texte à l'élément
        element.appendChild(texte);
      }
      else {
        // supprimer la class d'erreur si une valeur est sélectionné
        element.classList.remove("Error_");
      }
      if(!selectOption) {
        return;
      }

      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // Ajout de la fonction onSucces() pour afficher le message de confirmation
        formRef.current.reset(); // Ajout du current.reset pour reset les valeur après l'envoi du formulaire
        setSelectOption(null)
        
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError, selectOption]
  );
  
  return (
    // Ajout du formref pour reset les valeur après l'envoi du formulaire
    <form ref={formRef} onSubmit={sendContact}> 
      <div className="row">
        <div className="col">
          <Field placeholder="Nom" label="Nom" name="Nom"/> {/* // Ajout des placeholder */}
          <Field placeholder="Prénom" label="Prénom" name="Prénom" /> {/* // Ajout des placeholder */}
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) => setSelectOption(value)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          {/* // Ajout du nouveau composant Filed de type Email */}
          <Field 
          placeholder="Email" 
          label="Email" 
          type={FIELD_TYPES.EMAIL}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
