import React, { Component } from "react";
import loaderSrc from "../assets/loader.gif";

export const Loading = () => <h2>Loading...</h2>;

export const LoadingWithProps = (props) => <h2>{props.message}</h2>;

export const LoadingWithMessage = ({ message }) => <h2>{message}</h2>;

export const LoadingImage = () => (
  <img alt="loading" src={loaderSrc} height="100px" />
);

// stateless functional component
export const SimpleNavBar = (props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/first">
        First App
      </a>
      <a className="navbar-brand" href="/hooks">
        Hooks
      </a>
      <a className="navbar-brand" href="/tvseries">
        TV Series
      </a>
      <a className="navbar-brand" href="/rowcounter">
        Row Counter
      </a>
    </nav>
  );
};
