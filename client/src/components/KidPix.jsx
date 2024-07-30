//KidPix.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Image, Line } from 'react-konva';
import useImage from 'use-image';
import { Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const KidPix = ({ imgRef, currentImageUrl, imgUploadURL, updateImgUploadURL, lines, setLines}) => {

  //image uploading code


  const handleImageUpload = (e) => {
    updateImgUploadURL(URL.createObjectURL(e.target.files[0]));
  };

  // useEffect(()=>{
  //   if(currentImageUrl){
  //     updateImgUrl(currentImageUrl)
  //   }
  // }, [currentImageUrl])

  let [image] = useImage(imgUploadURL);


  //drawing code
  const [tool, setTool] = useState('eraser');
  
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
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



  // function downloadURI(uri, name) {
  //   var link = document.createElement('a');
  //   link.download = name;
  //   link.href = uri;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
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
            labelId="tool-select-label"
            id="tool-select"
            value={tool}
            label="Tool"
            onChange={(e) => {
              setTool(e.target.value);
            }}
          >
            <MenuItem value='pen'>Pen</MenuItem>
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
        <Layer ref={imgRef} >
          <Image  image={image}  width={512}
        height={512}
        crossOrigin = "Anonymous"/>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke='#ff00ff'
              strokeWidth={20}
              tension={0.5}
              lineCap='round'
              lineJoin='round'
             
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
        <Layer opacity={0.4}></Layer>
      </Stage>
    </div>
  );
};

export default KidPix;
