import React, { Component } from "react";
import SearchBar from "./components/SearchBar";

import axios from "axios";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import "./App.css";
class App extends Component {
  state = {
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    this.onTermSubmit("children");
  }

  onTermSubmit = async (term) => {
    // Object way With Axios
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults: 10,
          key: "AIzaSyASxAvF-j2otv2e2f0VQ-Yg-IGZZUw-ilk",
          q: term,
          type: "video",
        },
      }
    );
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });

    // const response = await youtube.get("/search", {
    //   params: {
    //     key: "AIzaSyASxAvF-j2otv2e2f0VQ-Yg-IGZZUw-ilk",
    //     q: term,
    //   },
    // });

    // console.log(response.data);
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };
  render() {
    return (
      <div className="ui container">
        <div className="search">
          <SearchBar onFormSubmit={this.onTermSubmit} />
        </div>
        <div className="contain">
          <div className="video">
            <VideoDetail video={this.state.selectedVideo} />
          </div>

          <div className="video-list">
            <VideoList
              videos={this.state.videos}
              onVideoSelect={this.onVideoSelect}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
