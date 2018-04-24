import React, { Component } from "react"

export default class Male extends React.Component {
  render() {
    const { partnerNumber, partnerHairColor, partnerSkinColor, partnerClothesColor } = this.props.partnerDetails
    const hairColor = partnerHairColor[partnerNumber]
    const skinColor = partnerSkinColor[partnerNumber]
    const clothesColor = partnerClothesColor[partnerNumber]
    const shouldFlip = partnerNumber == 0 ? 1 : -1
    const transform = `scale(${shouldFlip},1)`
    const background = "#e6e6e6"
    // TODO: Scale images on broswer side
    return (
      <svg
        version="1.1"
        preserveAspectRatio="xMinYMin meet"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100px"
        height="200px"
        viewBox="0 0 16 32"
        transform={transform}>
        <path
          d="M0 0h16v32h-4v-1h-1v-9h1v-10h-1v-1h-1v-1h1v-6h-4v1h-1v5h1v1h-1v1h-1v10
	h1v9h-1v1h-5v-32z"
          fill={background} // Background
        />
        <path d="M7 4h4v3h-4v1h-1v-3h1v-1z" fill={hairColor} /*Hair*/ />
        <path d="M7 7h4v3h-1v1h-3v-1h-1v-2h1v-1z" fill={skinColor} /*Face*/ />
        <path
          d="M6 11h1v2h1v-2h1v2h1v-2h1v1h1v9h-1v10h1v1h-3v-10h-1v10h-3v-1h1v-10h-1
	v-9h1v-1z"
          fill={clothesColor} /*Suit*/
        />
        <path d="M7 11h1v2h-1v-2z" fill="rgb(255,255,255)" /*Shirt*/ />
        <path d="M9 11h1v2h-1v-2z" fill="rgb(255,255,255)" /*Shirt*/ />
        <path d="M5 21h1v1h-1v-1z" fill={skinColor} /*Hand*/ />
        <path d="M11 21h1v1h-1v-1z" fill={skinColor} /*Hand*/ />
        <path d="M8 22h1v10h-1v-10z" fill={background} />
      </svg>
    )
  }
}
