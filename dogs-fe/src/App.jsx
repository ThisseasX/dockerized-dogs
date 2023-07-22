import React, { useState, useEffect } from 'react';

import {
  getDog,
  getDogs,
  createDog,
  updateDog,
  deleteDog,
  deleteDogs,
} from './requests';

import { useAsyncEffect } from './hooks';

import classes from './App.module.css';

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', breed: '' });

  useAsyncEffect(async () => {
    const dogs = await getDogs();
    setDogs(dogs);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleGet = async () => {
    const dog = await getDog(form);

    if (!dog) {
      setDogs([]);
    } else {
      setDogs([dog]);
    }
  };

  const handleGetAll = async () => {
    const dogs = await getDogs();
    setDogs(dogs);
  };

  const handleAdd = async () => {
    const dog = await createDog(form);
    setDogs((prevDogs) => [dog, ...prevDogs]);
  };

  const handleUpdate = async () => {
    const dog = await updateDog(form);
    if (!dog) return;

    setDogs((prevDogs) =>
      prevDogs.map((prevDog) => (prevDog._id === dog._id ? dog : prevDog)),
    );
  };

  const handleDelete = async () => {
    const dog = await deleteDog(form);
    if (!dog) return;

    setDogs((prevDogs) => prevDogs.filter(({ _id }) => _id !== dog._id));
  };

  const handleDeleteAll = async () => {
    await deleteDogs();
    setDogs([]);
  };

  return (
    <div className={classes.root}>
      <h1>Dogs</h1>

      <fieldset className={classes.fieldset}>
        <legend>Add Dog</legend>

        <label htmlFor="name" className={classes.mr4}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={classes.mr8}
          onChange={handleChange}
        />

        <label htmlFor="age" className={classes.mr4}>
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          className={classes.mr8}
          onChange={handleChange}
        />

        <label htmlFor="breed" className={classes.mr4}>
          Breed
        </label>
        <input
          id="breed"
          name="breed"
          type="text"
          className={classes.mr8}
          onChange={handleChange}
        />

        <button className={classes.btn} onClick={handleGet}>
          Get
        </button>
        <button className={classes.btn} onClick={handleGetAll}>
          Get All
        </button>
        <button className={classes.btn} onClick={handleAdd}>
          Add
        </button>
        <button className={classes.btn} onClick={handleUpdate}>
          Update
        </button>
        <button className={classes.btn} onClick={handleDelete}>
          Delete
        </button>
        <button className={classes.btn} onClick={handleDeleteAll}>
          Delete All
        </button>
      </fieldset>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Breed</th>
          </tr>
        </thead>

        <tbody>
          {dogs.map(({ _id, name, age, breed }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{breed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
