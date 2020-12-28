import { useState, useEffect, useCallback } from "react";
import base from "./firebase";
import { subDays, format } from "date-fns";
import { days, restD } from "./testDataFile";

export function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number
    let { value } = e.target;
    if (e.target.type === "number") {
      value = +value;
    }
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }
  return { values, updateValue };
}
export const useFetch = (url) => {
  const [pendingFetch, setPending] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancel = false;

    if (!url) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setPending(true);
      const response = await fetch(url);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      if (!cancel) {
        setData(data);
        setPending(false);
      } else {
        setPending(false);
        setData(null);
      }
    };

    fetchData();

    return () => (cancel = true);
  }, [url]);

  return [pendingFetch, data];
};

export const useHandleLogInTestUser = (history) =>
  useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await base
          .auth()
          .signInWithEmailAndPassword("test@tagunovdesign.com", "123456");
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

export const useTestData = () => {
  const makeWeek = () => {
    const week = [];

    const date = new Date();
    while (week.length < 7) {
      week.push(format(subDays(date, week.length), "yyyy-MM-dd"));
    }
    return week;
  };
  const week = makeWeek();
  const mapedWeek = week.reduce((sum, day, i) => {
    return { ...sum, [day]: days[i] };
  }, {});
  const weight = week.reduce((sum, day, i) => {
    return { ...sum, [day]: restD.weight[i] };
  }, {});

  const testData = {
    mapedWeek,
    weight,
    data: {
      targetEnergy: restD.target,
      targetWeight: restD.targetWeight,
    },
  };
  return testData;
};
