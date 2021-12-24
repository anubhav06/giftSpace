import React, { useState } from "react";
import {
  HeroWrapper,
  Left,
  Right,
  MainText,
  BoldText,
  DescText,
  OrangeText,
  ListOfFeatures,
  Feat,
  Img,
  LinkRouterButton,
} from "../StyledElements/HeroSectionElements";
import { Link } from "react-router-dom";

import imgOne from "../images/imageOne.svg";
import imgTwo from "../images/imageTwo.svg";
import imgThree from "../images/imgThree.svg";
import imgFour from "../images/imageFour.svg";
const HeroSection = () => {
  const images = [imgOne, imgTwo, imgThree, imgFour];
  const [image, setImage] = useState(0);

  const changeImage = () => {
    if (image <= images.length) {
      setImage(0);
    }
    setImage((image) => image + 1);
    console.log(image);
  };

  // setTimeout(changeImage, 1000);

  return (
    <>
      <HeroWrapper>
        <Left>
          <MainText>
            Shopping for winters and the holiday season could be a
            <BoldText> big task! </BoldText>
          </MainText>
          <DescText>
            Don’t worry, <OrangeText> GiftSpace </OrangeText> has your back!{" "}
            <br />
            We’ll help you with
          </DescText>
          <ListOfFeatures>
            <Feat>✅ Managing your gift lists.</Feat>
            <Feat>✅ Managing your budget for the gifts.</Feat>
            <Feat>✅ Curating all your gift ideas at one place.</Feat>
            <Feat>
              🎁 Asking <OrangeText> Santa </OrangeText> to deliver your gifts!
            </Feat>
          </ListOfFeatures>
          <Link to="/register">
            <LinkRouterButton>Make your own list</LinkRouterButton>
          </Link>
        </Left>

        <Right>
          <Img src={images[image]} alt="" />
        </Right>
      </HeroWrapper>
    </>
  );
};

export default HeroSection;
