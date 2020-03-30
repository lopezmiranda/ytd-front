import React from 'react';

class VideoList extends React.Component {

  constructor(props) {
    super(props);

    this.appendVid = this.appendVid.bind(this);
  }

  appendVid(vid) {
    return <li key={vid.key}>
            <div className="level">
              <div className="level-left">
                <button className="delete is-danger" onClick={() => this.delete(vid.key)}></button>
                <p className="video-on-list">{vid.key + 1} - {vid.url}</p>
              </div>
              <div className="level-right">

              </div>
            </div>
          </li>
  }

  delete(key){
    this.props.delete(key);
  }

  render(){
    if (this.props.videos.length > 0){
      var vids = this.props.videos;
      var listVideos = vids.map(this.appendVid);

      return (
        <ul>
          <h2 className="subtitle">{vids.length} videos agregados:</h2>
          {listVideos}
        </ul>
      );
    }
    else {
      return (
        <span className="subtitle is-size-5">No has agregado videos! Agregalos arriba</span>
      );
    }
  }
}

export default VideoList;
