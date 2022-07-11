import React, { useState } from 'react';
import { MessageHoverContainer, MessageHoverIcon, MessageHoverText } from "./style";

export const MessageHover = ({ errorMessage }) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(!isHovering);
  };


  return (
    <MessageHoverContainer style={{position:'relative'}}>


      <MessageHoverIcon onClick={handleMouseOver} />
      {isHovering && <MessageHoverText>{errorMessage}</MessageHoverText>}

    </MessageHoverContainer>
  );
}
