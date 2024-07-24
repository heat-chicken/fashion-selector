import React, { useState } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';

const KidPix = () => {
  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <div>
      <h1>Kid Pix goes here.</h1>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect width={50} height={50} fill='red' />
          <Circle x={200} y={200} stroke='black' radius={50} />
        </Layer>
      </Stage>
    </div>
  );
};

export default KidPix;
