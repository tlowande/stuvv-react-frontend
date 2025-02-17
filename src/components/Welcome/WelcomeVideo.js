import React, { useState } from "react";
import Sample from './stuvvWelcomeVideo.mov';
import "./Welcome.scss"
import CachedIcon from '@material-ui/icons/Cached';


export default function WelcomeVideo(props) {

  const [search, setSearch] = useState("");

  return (
    <div>
      <header className="v-header container">
        <div className="fullscreen-video-wrap">
          <video src={Sample} autoPlay loop></video>
        </div>
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1><b>Stuvv</b></h1>
          <p>Stuvv allows you to rent your personal belongings</p>
          <form className="form-inline my-2 my-lg-0" onSubmit={event => event.preventDefault()}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={e => setSearch(e.target.value)}
              value={search}
            >
            </input>
            <button className="btn btn-light my-2 my-sm-0" type="submit" onClick={() => props.sendRequest(search)}>Search</button>
            <button
              className="btn btn-light my-2 my-sm-0"
              type="submit"
              onClick={() => {
                props.sendRequest()
                setSearch("")
              }}>
              <CachedIcon className="refresh" />
            </button>
          </form>
        </div>
      </header>
    </div>
  )
}