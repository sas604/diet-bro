import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CardStyles from '../styles/CardStyles';
import Weight from './Weight';

const WeightDisplayStyles = styled(CardStyles)`
  display: flex;
  flex-direction: column;
  text-align: center;
  h3 {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
    font-size: 1.6rem;
    color: var(--dark-purple);
  }
  p {
    margin: 0;
  }
  .notice {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 600;
    color: #919191;
    margin: 0;
  }
  .warning {
    font-size: 0.8rem;
    color: red;
  }
  .number {
    display: block;
    text-align: center;
    font-size: 3rem;
    font-weight: 600;
    color: var(--dark-purple);
  }
  .number-small {
    display: block;
    font-weight: 600;
    font-size: 1.2rem;
  }
  .wrap,
  .notice {
    margin-top: 1rem;
    flex: 2;
  }
`;

export default function WeightDisplay() {
  const { weight, userData, mealHistory } = useSelector((state) => state);
  if (mealHistory.loading) return <h1>Loading...</h1>;

  // loop trough object and find a lates weight
  const latestWeightDate =
    Object.keys(weight).length &&
    Object.keys(weight).reduce((a, b) =>
      +a.replace('-', '') > +b.replace('-', '') ? a : b
    );
  const weightResult = () => {
    if (userData.targetWeight - weight[latestWeightDate] === 0)
      return <p>Congratulation you've meet your target weight.</p>;

    return (
      <p>
        To meet your goal you need to
        {userData.targetWeight > weight[latestWeightDate]
          ? ` gain ${userData.targetWeight - weight[latestWeightDate]}`
          : ` loose ${weight[latestWeightDate] - userData.targetWeight} `}
        Lbs.
      </p>
    );
  };

  return (
    <WeightDisplayStyles className="display">
      <h3>Current Weight</h3>
      {latestWeightDate ? (
        <div className="wrap">
          <p>
            Your last recorded weight is
            <span className="number">
              {weight[latestWeightDate]} lbs
            </span> on <span className="number-small">{latestWeightDate}</span>
          </p>
          {userData.targetWeight ? (
            <>
              <p>Your target weight is {userData.targetWeight} lbs</p>{' '}
              {weightResult()}
            </>
          ) : (
            <span className="warning">
              *You didn't set your target weigh go to the{' '}
              <Link to="/dashboard/account">
                settings page to set yout target
              </Link>
            </span>
          )}
        </div>
      ) : (
        <p className="notice">
          You haven't recorded anything yet, try to make weight entry.
        </p>
      )}
      <Weight />
    </WeightDisplayStyles>
  );
}
