const Person = ({person}) => <li>{person.name} {person.number}</li>

const PersonList = ({ persons }) => (
    <ul>
      {persons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </ul>
  );

export default PersonList