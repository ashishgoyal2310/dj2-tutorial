import React, { useState } from 'react'

export const Loading = () => <h2>Loading...</h2>

export const LoadingWithProps = (props) => <h2>{props.message}</h2>

export const LoadingWithMessage = ({ message }) => <h2>{message}</h2>

export const CounterApp = () => {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0)

    const incrementCount = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <span>Counter using Hooks!!</span>
            <button onClick={incrementCount}>
                Clicked {count} times
            </button>
        </div>
    )
}

export const Example = () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>You clicked {count} times</span>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}