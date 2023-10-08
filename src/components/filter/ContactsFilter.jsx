import css from './ContactsFilter.module.css';
import React from 'react';

const ContactsFilter = ({ value, onChange }) => {

  return (
    <form className={'css.container'}>
      <div className={css.container}>
        <label htmlFor="filter" className={css.labelInput}>
          Find contacts by name
        </label>
        <input
          value={value}
          className={css.inputFilter}
          onChange={onChange}
          type="text"
          name="filter"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
    </form>
  );
};

export default ContactsFilter;
