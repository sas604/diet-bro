import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../Auth";
import { getTime, format } from "date-fns";
import { Link } from "react-router-dom";

const request = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const res = response.json();
  return res;
};

export default function AddMeal({ history }) {
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [foodItemId, setFoodItemId] = useState(null);
  const [food, setFood] = useState(null);
  const { data, dateContext } = useContext(AuthContext);
  const [openAddFood, setOpenAddFood] = useState(false);

  const [currentDate] = dateContext;

  const [currentUserData, setUserData] = data;

  const getFoodItem = (e) => {
    setFoodItemId(e.target.id);
  };
  const addMeal = (food) => {
    const stamp = getTime(new Date());
    setUserData({
      ...currentUserData,
      [currentDate]: {
        ...currentUserData[currentDate],
        [stamp]: food,
      },
    });
    setFood(null);
    history.push("/home");
  };
  useEffect(() => {
    if (!foodItemId) return;
    let cancel = false;
    const url = `https://api.nal.usda.gov/fdc/v1/food/${foodItemId}?api_key=${process.env.REACT_APP_API_KEY}&nutrients=208`;
    request(url).then((res) => {
      if (!cancel) {
        setFood({
          kcal: res.foodNutrients[0].amount,

          portions: res.foodPortions.filter(
            (el) => el.portionDescription !== "Quantity not specified"
          ),
          name: res.description,
          portion: 100,
        });
      }
    });
    return () => (cancel = true);
  }, [foodItemId]);

  useEffect(() => {
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&dataType=Survey%20(FNDDS)`;
    let cancel = false;
    if (query) {
      setPending(true);
      request(url).then((res) => {
        if (!cancel) {
          setApiResponse(res);
          setPending(false);
        }
      });
    } else {
      setPending(false);
      setApiResponse(null);
    }
    return () => (cancel = true);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.split(" ").join("%20"));
  };
  const addManualFoodEntry = (e) => {
    e.preventDefault();

    addMeal(food);
  };

  if (openAddFood)
    return (
      <>
        <button onClick={() => setOpenAddFood(false)}></button>
        <form onSubmit={addManualFoodEntry}>
          <input
            onChange={(e) => setFood({ ...food, name: e.target.value })}
            type="text"
            name="name"
            placeholder="name"
            required
          />
          <input
            onChange={(e) => setFood({ ...food, kcal: Number(e.target.value) })}
            type="number"
            name="kcal"
            placeholder="KCal"
            required
          />
          <button> Add</button>
        </form>
      </>
    );
  return (
    <>
      {food && (
        <div>
          <button
            style={{ height: 50, width: 50, backgroundColor: "red" }}
            onClick={() => setFood(null)}
          ></button>
          <h2> food modal </h2>
          <div>
            <p>{Math.round(food.kcal * (food.portion / 100))} Kcal</p>
          </div>
          <select
            onChange={(e) =>
              setFood({
                ...food,
                portion: Math.round(parseInt(e.target.value)),
              })
            }
            defaultValue="100"
          >
            <option key="100" value="100">
              100g
            </option>
            {food.portions.map((el) => (
              <option key={el.id} value={el.gramWeight}>
                {el.portionDescription}
              </option>
            ))}
          </select>
          <button onClick={() => addMeal(food)}> Add +</button>
        </div>
      )}
      <h1>Add new meal entry</h1>
      <span>Search for food</span>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="search food"
          onChange={handleSearch}
        ></input>
      </form>
      {pending ? (
        <h2>Loading... </h2>
      ) : (
        apiResponse && (
          <ul>
            {apiResponse.foods.map((el) => (
              <li key={el.fdcId} id={el.fdcId} onClick={getFoodItem}>
                {el.description}
              </li>
            ))}
          </ul>
        )
      )}
      <span> or add food manually</span>
      <br />
      <button onClick={() => setOpenAddFood(true)}>Add food +</button>
    </>
  );
}
