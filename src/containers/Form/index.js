import { useCallback, useRef, useState } from "react";
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

      if(!selectOption) {
        return;
      }
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); 
        formRef.current.reset();
        setSelectOption(null)
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError, selectOption]
  );
  
  return (
    <form ref={formRef} onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="Nom" label="Nom" name="Nom"/>
          <Field placeholder="Prénom" label="Prénom" name="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) => setSelectOption(value)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
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
