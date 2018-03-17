import React, { Component } from "react"

export default class Female extends React.Component {
  render() {
    const { partnerNumber, partnerHairColor, partnerSkinColor, partnerClothesColor } = this.props.partnerDetails
    const hairColor = partnerHairColor[partnerNumber]
    const skinColor = partnerSkinColor[partnerNumber]
    const clothesColor = partnerClothesColor[partnerNumber]
    const shouldFlip = partnerNumber == 0 ? -1 : 1
    const transform = `scale(${shouldFlip},1)`
    const background = "#e6e6e6"
    //TODO: Scale images on broswer side
    return (
      <svg
        version="1.1"
        preserveAspectRatio="xMinYMin meet"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="160px"
        height="320px"
        viewBox="0 0 16 32"
        transform={transform}>
        <path d="M0 0h16v32h-7v-1h4v-2h-2v-5h-1v-4h1v-6h-1v-1h1v-1h-1v-1h1v-1h-1v-3h-1
          v-1h-1v-1h-2v1h-1v1h-1v2h1v2h-1v2h1v1h-1v6h1v4h-1v5h-1v2h3v1h-6v-32z" fill={background} /*Background*//>
        <path d="M6 5h2v1h1v1h1v3h1v1h-1v1h1v1h-2v-1h-1v-2h1v-2h-1v-1h-2v4h1v1h-1v1h-2
          v-2h1v-2h-1v-2h1v-1h1v-1z" fill={hairColor} /*Hair*/ />
        <path d="M6 7h2v1h1v2h-1v2h1v2h-1v1h-1v-1h-1v-2h1v-1h-1v-4z" fill={skinColor} /*Face*/ />
        <path d="M5 13h1v1h1v1h1v-1h1v-1h1v6h-1v-1h-1v-1h-1v1h-1v1h-1v-6z" fill={clothesColor} /*Dress*/ />
        <path d="M4 14h1v5h1v1h-2v-6z" fill={skinColor} /*Arm*/ />
        <path d="M10 14h1v6h-2v-1h1v-5z" fill={skinColor} /*Arm*/ />
        <path d="M7 17h1v1h1v3h-2v-1h-1v-2h1v-1z" fill="rgb(237,28,36)"/>
        <path d="M5 20h2v1h2v-1h1v4h1v5h2v2h-10v-2h1v-5h1v-4z" fill={clothesColor} /*Dress*/ />
        <path d="M6 31h1v1h-1v-1z" fill={clothesColor} /*Foot*/ />
        <path d="M7 31h1v1h-1v-1z" fill={background} />
        <path d="M8 31h1v1h-1v-1z" fill={clothesColor} /*Foot*/ />
      </svg>
    )
  }
}
