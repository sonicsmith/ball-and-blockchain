import React, { Component } from "react"

export default class Male extends React.Component {
  render() {
    const { partnerNumber, partnerSkinColor, partnerClothesColor } = this.props.partnerDetails
    return (
      <svg
        version="1.1"
        preserveAspectRatio="xMinYMin meet"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="160px"
        height="320px"
        viewBox="0 0 16 32">
        <path
          d="M0 0h16v32h-4v-1h-1v-9h1v-10h-1v-1h-1v-1h1v-6h-4v1h-1v5h1v1h-1v1h-1v10
	h1v9h-1v1h-5v-32z"
          fill="rgb(195,195,195)"
        />
        <path d="M7 4h4v3h-4v1h-1v-3h1v-1z" fill="rgb(185,122,87)" />
        <path d="M7 7h4v3h-1v1h-3v-1h-1v-2h1v-1z" fill="rgb(255,174,201)" />
        <path
          d="M6 11h1v2h1v-2h1v2h1v-2h1v1h1v9h-1v10h1v1h-3v-10h-1v10h-3v-1h1v-10h-1
	v-9h1v-1z"
          fill={partnerClothesColor[partnerNumber]}
        />
        <path d="M7 11h1v2h-1v-2z" fill="rgb(255,255,255)" />
        <path d="M9 11h1v2h-1v-2z" fill="rgb(255,255,255)" />
        <path d="M5 21h1v1h-1v-1z" fill="rgb(255,174,201)" />
        <path d="M11 21h1v1h-1v-1z" fill="rgb(255,174,201)" />
        <path d="M8 22h1v10h-1v-10z" fill="rgb(195,195,195)" />
      </svg>
    )
  }
}
