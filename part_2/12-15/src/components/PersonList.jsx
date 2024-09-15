const Person = ({person}) => <li>{person.name} {person.number}</li>

const PersonList = ({ persons }) => (
    <ul>
      {persons.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  );

export default PersonList