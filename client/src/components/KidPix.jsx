//KidPix.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Shape, Container, Image, Line } from 'react-konva';
import useImage from 'use-image';
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const KidPix = ({
  imgRef,
  imgUploadURL,
  updateImgUploadURL,
  lines,
  setLines,
  handleSubmit,
  handleYesClick,
  dragState,
  updateDrag
}) => {
  const [scaleState, updateScale] = useState({ x: 1, y: 1 });
  const [tool, setTool] = useState('drag');
  const [lineWidth, updateWidth] = useState(1)
  //image uploading code

  const handleImageUpload = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    updateDrag({ x: 0, y: 0, dragHide: false });
    updateImgUploadURL(url);
  };

  const [image] = useImage(imgUploadURL);

  //resizing code

  useEffect(() => {
    updateScale(defaultScale(image));
  }, [image]);

  const defaultScale = (img) => {
    if (img) {
      const smallEdge = Math.min(img.height, img.width);
      const scale = 512 / smallEdge;
      return { x: scale, y: scale };
    }
    return;
  };

  const sliderChange = (e) => {
    const scaleMultiplier = e.target.value / 20 + 0.1;
    if (image && tool == 'drag') {
      const originalScale = defaultScale(image).x;
      const newScale = originalScale * scaleMultiplier;

      updateScale({ x: newScale, y: newScale });
    }
    if (tool == 'eraser') {
      updateWidth(scaleMultiplier)
    }
  };

  //drawing code

  const lineStore = useSelector((store) => store.prompt);

  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    if (tool == 'eraser') {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y], lineWidth }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || !lineStore.drawable) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  //dragging logic

  const dragStartHandler = (e) => {
    console.log(e.target);
    updateDrag({ ...dragState, dragHide: true });
  };

  const dragEndHandler = (e) => {
    updateDrag({
      ...dragState,
      x: e.target.attrs.x,
      y: e.target.attrs.y,
      dragHide: false,
    });
  };

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage

    <div
      style={{
        margin: '50px 80px',
        width: '512px',
      }}
    >
      <div>
        <Button
          component='label'
          role={undefined}
          variant='contained'
          style={{
            width: '120px',
          }}
        >
          Upload
          <VisuallyHiddenInput type='file' onChange={handleImageUpload} />
        </Button>
        <ToggleButtonGroup
          value={tool}
          exclusive
          onChange={(e) => {
            setTool(e.target.value);
          }}
          aria-label='select tool'
          sx={{ m: 1, minWidth: 120 }}
        >
          <ToggleButton value='drag'>Drag</ToggleButton>
          <ToggleButton value='eraser'>Erase</ToggleButton>
        </ToggleButtonGroup>
        <Slider
          aria-label='Scale'
          defaultValue={20}
          //getAriaValueText={valuetext}
          color='primary'
          onChange={sliderChange}
        />
      </div>
      <Stage
        width={512}
        height={512}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer ref={imgRef}>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke='#ff00ff'
              strokeWidth={20*line.lineWidth}
              tension={0.5}
              lineCap='round'
              lineJoin='round'
            />
          ))}
          <Image
            image={image}
            // width={512}
            // height={512}
            scale={scaleState}
            crossOrigin='Anonymous'
            globalCompositeOperation={
              lineStore.eraseInverse ? 'source-atop' : 'source-out'
            }
            x={dragState.x}
            y={dragState.y}
            visible={!dragState.dragHide}
          />
        </Layer>
        <Layer>
          <Image
            image={image}
            // width={512}
            // height={512}
            crossOrigin='Anonymous'
            draggable={tool === 'drag'}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            x={dragState.x}
            y={dragState.y}
            scale={scaleState}
          />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke='#ff00ff'
              strokeWidth={20*line.lineWidth}
              opacity={lineStore.lineVisible ? 0.8 : 0}
              tension={0.5}
              lineCap='round'
              lineJoin='round'
            />
          ))}
          <Rect
            x={0}
            y={0}
            width={512}
            height={512}
            stroke='#ff00ff'
            shadowBlur={10}
            fillEnabled={false}
          />
        </Layer>
      </Stage>
      {imgUploadURL && (
        <div>
          <button onClick={handleSubmit}>No</button>
          <button onClick={handleYesClick}>Yes</button>
        </div>
      )}
    </div>
  );
};

export default KidPix;
