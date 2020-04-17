import React from 'react';
import loaderSrc from '../assets/loader.gif'

export const Loading = () => <h2>Loading...</h2>

export const LoadingWithProps = (props) => <h2>{props.message}</h2>

export const LoadingWithMessage = ({ message }) => <h2>{message}</h2>

export const LoadingImage = () => <img alt="loading" src={loaderSrc} height="100px" />