import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoadingWithMessage, LoadingImage } from './Loading';
import axios from 'axios';

const SeriesListItem = ({ series_dct }) => (
  <li>
    <Link to={`/tvseries/${series_dct.show.id}`}>
      {series_dct.show.name}
    </Link>
  </li>
)

const SeriesList = (props) => {
  return (
    <ul>
      {props.series.map((dct) => (
        // <li key={dct.show.id}>{dct.show.name}</li>
        <SeriesListItem series_dct={dct} key={dct.show.id} />
      ))}
    </ul>
  )
}

export class TVSeries extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      loading: false,
      series: [],
      searchQuery: ''
    }
  }

  getTvSeries() {
    this.setState({
      loading: true
    })
    let counter = 2
    let intervalID = setInterval(() => {
      if (counter <= 1) { 
        clearInterval(intervalID);  // stop interval 
        let url = `http://api.tvmaze.com/search/shows?q=${this.state.searchQuery}`
        axios.get(url).then((response) => 
          {
            this.setState({
              // series: [...this.state.series, ...response.data]
              series: [...response.data],
              loading: false
            })
          }
        );
      }

      counter = counter - 1
    }, 1000);

  }

  showLoading() {
    let messageASD = `Loading data...`
    return (
      this.state.loading ? <LoadingWithMessage message={messageASD} /> : ''
    )
  }

  showLoadingImg = () => {
    return (
      this.state.loading ? <LoadingImage /> : ''
    )
  }

  // componentDidMount() {
  //   // console.log('------ TVSeries - componentDidMount --------')
  //   this.getTvSeries();
  //   // setTimeout(() => {
  //   //   this.getTvSeries()
  //   // }, 2000)
  // }

  handleBtnClick = (e) => {
    this.getTvSeries();
  }

  render() {
    let { series, searchQuery } = this.state
    return (
      <div className="App">
        <header className="App-header">
          TV Series Lists
        </header>
        
        <p>The length of series array : {series.length}</p>
        <input type="text" onChange={(e) => this.setState({searchQuery: e.target.value, series: []})} /><button onClick={this.handleBtnClick}>Search</button>
        
        <p>{!searchQuery && 'Please enter the series name into the input and search.'}</p>
        <p>{searchQuery && !series.length ? ' Click search button Or try some other keywords.' : ''}</p>
        
        {this.showLoadingImg()}
        
        <SeriesList series={series} />
      </div>
    );
  }
}


export class SingleTVSeries extends Component {
  state = {
    show: '',
    loading: true
  }

  getTvSeriesDetail() {
    const { id } = this.props.match.params
    axios.get(`http://api.tvmaze.com/shows/${id}?embed=episodes`).then((response) => 
      {
        // console.log(response.data)
        this.setState({
          show: response.data
        })
      }
    ).catch((error) => console.log(error)
    ).then(() => this.setState({ loading: false }));
  }

  componentDidMount() {
    this.getTvSeriesDetail();
  }

  displayShowDetail = (show) => {
    return (
      <div>
        <p><b>{show.name}</b> ({show.language})</p>
        <p>Type - {show.type}</p>
        <p>{show.summary}</p>
        <p>Premiered - {show.premiered}</p>
        <p>Rating - {show.rating.average}</p>
        <p>{show.image ? <img alt="show" src={show.image.medium} /> : ''}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          TV Series Detail
        </header>
        { this.state.loading ? <LoadingImage /> : <p>Show has been loaded</p> }
        { this.state.show && this.displayShowDetail(this.state.show) }
      </div>
    )
  }
}