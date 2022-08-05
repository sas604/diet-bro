import { useState, useEffect, useCallback } from 'react';
import { subDays, format } from 'date-fns';
import { days, restD } from './testDataFile';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number
    let { value } = e.target;
    if (e.target.type === 'number') {
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
  const [loading, setPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setPending(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        setData(data);
        setPending(false);
        setError(false);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message);
          setData(null);
          setPending(false);
        }
      }
    };

    fetchData();
    return () => {
      setPending(false);
      setData(null);
      setError(null);
    };
  }, [url]);

  return { loading, data, error };
};

export const useHandleLogInTestUser = (history) =>
  useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          'test@tagunovdesign.com',
          '123456'
        );
        history('/');
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
      week.push(format(subDays(date, week.length), 'yyyy-MM-dd'));
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
