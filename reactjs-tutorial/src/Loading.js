import React, { useState, useEffect } from 'react'

export const Loading = () => <h2>Loading...</h2>

export const LoadingWithProps = (props) => <h2>{props.message}</h2>

export const LoadingWithMessage = ({ message }) => <h2>{message}</h2>

export const CounterApp = () => {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0)
    const [searchQuery, setSearchQuery] = useState('react')
    const [loading, setLoading] = useState(false)

    // useEffect takes function as an argument. 
    // Execute as there is cange in state.
    useEffect(() => {
        console.log(`state changed. count: ${count}, searchQuery: ${searchQuery}`)
        document.title = `Clicked ${count} times`
    }, [searchQuery])

    const incrementCount = () => {
        setCount(count + 1)
    }

    const showCounterFirst = () => {
        return (
            <p>
                Counter using external function!!
                <button onClick={incrementCount}>
                    Clicked {count} times
                </button>
            </p>
        )
    }

    const showCounterSecond = () => {
        return (
            <p>
                You clicked {count} times
                <button onClick={() => setCount(count + 1)}>
                  Click me
                </button>
            </p>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`inside handleSubmit`)
        setLoading(!loading)
    }

    const searchFrom = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button>{loading ? 'Cancel' : 'Search'}</button>{showLoading()}
            </form>
        )
    }

    const showLoading = () => loading ? 'Loading...': ''

    return (
        <div>
            <h4><u>React Hooks:</u></h4>
            {showCounterFirst()}
            {showCounterSecond()}
            {searchFrom()}
        </div>
    )
}
