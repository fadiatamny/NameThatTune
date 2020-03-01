import React, { Component } from 'react'
import { withMediaProps } from 'react-media-player'
import {FaPlay, FaPause} from 'react-icons/fa'

 
class CustomControlls extends Component {
  shouldComponentUpdate({ media }) {
    return this.props.media.isPlaying !== media.isPlaying
  }
 
  _handlePlayPause = () => {
    this.props.media.playPause()
  }
 
  render() {
    const { className, style, media } = this.props
    return (
      <div
        type="button"
        className={className}
        style={style}
        onClick={this._handlePlayPause}
      >
        {media.isPlaying ? <FaPause className="playButton" /> : <FaPlay className="playButton" />}
      </div>
    )
  }
}

export default withMediaProps(CustomControlls)