import React from "react";
import { motion } from "framer-motion";
import { LoaderContainer } from "./style";

const style = {
  width: 20,
  height: 20,
  opacity: 1,
  margin: 10,
  borderRadius: 50,
  display: "inline-block",
  background: "#ffc43d",
}

const variants = {
  start: {
    scale: 0.2,
    rotate: 0,
  },
  end: {
    scale: 2,
    rotate: 360,
  },
}

export const Loader = (props) => {
  return (
    <LoaderContainer>
      <motion.div
        style={style}
        variants={variants}
        initial={"start"}
        animate={"end"}
        transition={{
          repeat: "Infinity",
          repeatType: "reverse",
          ease: "linear",
          duration: 1,
          delay: 0
        }}
      />
      <motion.div
        style={style}
        variants={variants}
        initial={"start"}
        animate={"end"}
        transition={{
          repeat: "Infinity",
          repeatType: "reverse",
          ease: "linear",
          duration: 1,
          delay: 0.3
        }}
      />
      <motion.div
        style={style}
        variants={variants}
        initial={"start"}
        animate={"end"}
        transition={{
          repeat: "Infinity",
          repeatType: "reverse",
          ease: "linear",
          duration: 1,
          delay: 0.6
        }}
      />
    </LoaderContainer>
  )
}