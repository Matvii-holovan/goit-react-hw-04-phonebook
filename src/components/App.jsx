import css from './App.module.css';
import { useEffect, useState } from 'react';
import  PhoneBookForm  from './PhoneBookForm/PhoneBookForm';
import { nanoid } from 'nanoid';
import BookItem from './phoneBookItem/phoneBookItem';
import ContactsFilter from './filter/ContactsFilter';
const LS_KEY = 'contacts';
const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(LS_KEY)) ?? []
  );

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const createContacts = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.filter(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    ).length
      ? alert(`${newContact.name}: is already in contacts`)
      : setContacts([newContact, ...contacts]);
  };

  const handleDelete = id => {
    setContacts(prevContacts => 
    prevContacts.filter(el => el.id !== id),
    );
  };

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };


  return (
    <div>
      <div className={css.container}>
        <h1 className={css.titlePhoneBook}>Phonebook</h1>
        <PhoneBookForm onSubmit={createContacts} />
      </div>
      <div className={css.container}>
        <h2 className={css.titleContacts}>Contacts</h2>
        <ContactsFilter value={filter} onChange={handleChangeFilter} />
        <ul className="bookList">
          {contacts
            .filter(
              contact =>
                filter === '' ||
                contact.name
                  .toLowerCase()
                  .includes(filter.toLowerCase())
            )
            .map(el => (
              <BookItem key={el.id} contacts={el} handleDelete={handleDelete} />
            ))}
        </ul>
      </div>
    </div>
  );
};
export default App;

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const localData = localStorage.getItem('contacts');
//     if (localData) {
//       this.setState({ contacts: JSON.parse(localData) });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts.length !== this.state.contacts.length) {
//       // console.log(this.state.contacts)
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   createContacts = dataByForm => {
//     const alreadyExists = this.state.contacts.find(
//       el => el.name.toLowerCase() === dataByForm.name.toLowerCase()
//     );
//     if (alreadyExists) return alert('Already exist');

//     const newContacts = {
//       ...dataByForm,
//       id: nanoid(),
//     };
//     this.setState(prev => ({
//       contacts: [newContacts, ...prev.contacts],
//     }));
//   };

//   handleDelete = id => {
//     this.setState(prev => ({
//       contacts: prev.contacts.filter(el => el.id !== id),
//     }));
//   };

//   filterInputNames = event => {
//     this.setState({
//       filter: event.currentTarget.value,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <div className={css.container}>
//           <h1 className={css.titlePhoneBook}>Phonebook</h1>
//           <PhoneBookName createContacts={this.createContacts} />
//         </div>
//         <div className={css.container}>
//           <h2 className={css.titleContacts}>Contacts</h2>
//           <ContactsFilter
//             value={this.state.filter}
//             onChange={this.filterInputNames}
//           />
//           <ul className="bookList">
//             {this.state.contacts
//               .filter(
//                 contact =>
//                   this.state.filter === '' ||
//                   contact.name
//                     .toLowerCase()
//                     .includes(this.state.filter.toLowerCase())
//               )
//               .map(el => (
//                 <BookItem
//                   key={el.id}
//                   contacts={el}
//                   handleDelete={this.handleDelete}
//                 />
//               ))}
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }
