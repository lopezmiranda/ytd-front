import React from 'react';
import './App.css';
import VideoList from './VideoList';

const API_URL = "http://localhost:4200/convert";

function TopSection() {
  var title = "Descargador de videos";
  var subtitle = "Para que me pases videos para editar";
  return (
    <section className="hero is-info">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            {title}
          </h1>
          <h2 className="subtitle">
            {subtitle}
          </h2>
        </div>
      </div>
    </section>
  );
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      videos:[]
    }

    this.addVideo = this.addVideo.bind(this);
    this.convertAll = this.convertAll.bind(this);
    this.deleteVideo = this.deleteVideo.bind(this);
  }

  addVideo(e){
    if (this._vInput.value !== ""){
      var newVideo = {
        url: this._vInput.value,
        // Setting the key to the size of the array means key = index starting at 0
        key: this.state.videos.length
      };

      this.setState((prevState) => {
        return {
          videos: prevState.videos.concat(newVideo)
        };
      });


      this._vInput.value = "";
    }
    e.preventDefault();
  }


  convertAll(e) {
    e.preventDefault();
    var videos = this.state.videos;
    for (var vid of videos){
      console.log(vid);
      console.log(JSON.stringify(vid));
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vid)
      })
      .then((response) => console.log(response) )
      .then(response => {  console.log(response) });
    }
  }

  deleteVideo(key){
    var filteredVideos = this.state.videos.filter(function (vid) {
      return (vid.key !== key);
    });
    for (var i = key; i < filteredVideos.length; i++){
      filteredVideos[i].key = i;
    }

    this.setState({
      videos: filteredVideos
    });
  }

  render(){
    return (
      <div className="App">
        <TopSection/>
        <div className="section">
          <div className="container is-widescreen">
              <article className="tile is-child notification is-dark">
                  <h1 className="title"> Link al video </h1>
                    <form onSubmit={this.addVideo} className="field has-addons">
                      <div className="control is-expanded">
                        <input className="input is-warning is-medium is-fullwidth" ref={ (v => this._vInput = v) } type="text" placeholder="Ctrl+V aquí">
                        </input>
                      </div>
                      <div className="control">
                        <button className="button is-warning is-medium" type="submit">+</button>
                      </div>
                    </form>
                </article>
                <div className="box">
                  <div className="level">
                    <div className="level-left">
                      <VideoList videos={this.state.videos} delete={this.deleteVideo}/>
                    </div>
                    <div className="level-right">
                      <button className="button is-primary is-large" onClick={this.convertAll}>Descargar videos
                      </button>
                    </div>
                  </div>
                </div>
              <div className="section is-centered">
              </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
