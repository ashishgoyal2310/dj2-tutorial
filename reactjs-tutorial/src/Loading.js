import React from 'react'

export const Loading = () => <h2>Loading...</h2>

export const LoadingWithProps = (props) => <h2>{props.message}</h2>

export const LoadingWithMessage = ({ message }) => <h2>{message}</h2>