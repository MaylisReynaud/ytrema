import React, { useState } from "react";
import { MessageHoverContainer, MessageHoverIcon, MessageHoverText} from "./style";

export function MessageHover(props) {
  const {
    error
  } = props;
    //Handle error message on hover
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
      setIsHovering(!isHovering);
    };


  return (
    <>
    <MessageHoverContainer>
      <MessageHover>
        <MessageHoverIcon onClick={handleMouseOver} />
        

        {isHovering && <h2>{error}</h2>}
      </MessageHover>
    </MessageHoverContainer>

    </>
  );
}

//export default MessageHover;
