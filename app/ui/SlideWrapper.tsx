import { Box, Slide, SlideProps } from "@mui/material";
import { useRef } from "react";

export default function SlideWrapper({ children, ...rest }: SlideProps) {
  const containerRef = useRef<HTMLElement>(null);
  return (
    <Box component="div" sx={{ overflow: "hidden" }} ref={containerRef}>
      <Slide
        mountOnEnter
        unmountOnExit
        timeout={500}
        direction="right"
        exit={false}
        container={containerRef.current}
        {...rest}
      >
        {children}
      </Slide>
    </Box>
  );
}
