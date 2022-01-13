import React from 'react';
import { act } from 'react-dom/test-utils';
import { v4 as uuidv4 } from 'uuid';

const initialList = [
  {
    id: 'a',
    name: 'Robin'
  },
  {
    id: 'b',
    name: 'Dennis'
  }
];

const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state.concat({ name: action.name, id: action.id });
    default:
      throw new Error();
  }
};

const App = () => {
  const [list, dispatchList] = React.useReducer(
    listReducer,
    initialList
  );

  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    dispatchList({ type: 'ADD_ITEM', name, id: uuidv4() });

    setName('');
  }

  return (
    <div>
      <AddItem
        name={name}
        onChange={handleChange}
        onAdd={handleAdd}
      />

      <List list={list} />
    </div>
  );
};

const AddItem = ({ name, onChange, onAdd }) => (
  <div>
    <input type="text" value={name} onChange={onChange}></input>
    <button type="button" onClick={onAdd}>
      Add
    </button>
  </div>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);

export default App;
