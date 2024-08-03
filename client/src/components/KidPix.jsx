//KidPix.jsx

import React, { useState, useRef, useEffect } from 'react';
import {
  Stage,
  Layer,
  Group,
  Shape,
  Container,
  Image,
  Line,
} from 'react-konva';
import useImage from 'use-image';
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
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
  currentImageUrl,
  imgUploadURL,
  updateImgUploadURL,
  lines,
  setLines,
  handleSubmit,
  handleYesClick,
}) => {
  //image uploading code

  const handleImageUpload = (e) => {
    updateImgUploadURL(URL.createObjectURL(e.target.files[0]));
  };

  let [image] = useImage(imgUploadURL);

  //drawing code
  const [tool, setTool] = useState('eraser');

  const lineStore = useSelector((store) => store.prompt);

  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    if (tool == 'eraser') {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
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
  const [dragState, updateDrag] = useState({x:0, y: 0, dragHide: false})

  const dragStartHandler = (e) => {
    console.log(e.target)
    updateDrag({...dragState, dragHide: true})
  };

  const dragEndHandler = (e) => {
    updateDrag({...dragState, x: e.target.attrs.x, y : e.target.attrs.y, dragHide: false})
  };

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage

    <div
      style={{
        margin: '50px 80px',
        width: '300px',
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
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel>Tool</InputLabel>
          <Select
            labelId='tool-select-label'
            id='tool-select'
            value={tool}
            label='Tool'
            onChange={(e) => {
              setTool(e.target.value);
            }}
          >
            <MenuItem value='drag'>Drag</MenuItem>
            <MenuItem value='eraser'>Eraser</MenuItem>
          </Select>
        </FormControl>
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
              strokeWidth={20}
              tension={0.5}
              lineCap='round'
              lineJoin='round'
            />
          ))}
          <Image
            image={image}
            // width={512}
            // height={512}
            crossOrigin='Anonymous'
            globalCompositeOperation={
              lineStore.eraseInverse ? 'source-atop' : 'source-out'
            }
            x={dragState.x}
            y={dragState.y}
            visible = {!dragState.dragHide}
          />
        </Layer>
        <Layer>
          <Image
            image={image}
            // width={512}
            // height={512}
            crossOrigin='Anonymous'
            draggable = {tool==='drag'}
            onDragStart = {dragStartHandler}
            onDragEnd = {dragEndHandler}
          />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke='#ff00ff'
              strokeWidth={20}
              opacity={lineStore.lineVisible ? 0.8 : 0}
              tension={0.5}
              lineCap='round'
              lineJoin='round'
            />
          ))}
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
