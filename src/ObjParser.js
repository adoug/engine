function ObjParser(fileName) {
  console.log('Now loading file:', fileName);

  const modelStringData = loadFileAJAX(fileName);

  if (!modelStringData) { alert(`Could not retrieve model data:${fileName}`); }

  const lineSplit = modelStringData.split('\n');

  const tempVertexPositionList = [];

  this.vertexPositions = [];

  let bfirstVertex = false;
  this.minValues = [-1, -1, -1];
  this.maxValues = [-1, -1, -1];
  this.centre = [];

  for (var lineId = 0; lineId < lineSplit.length; lineId++) {
    if (lineSplit[lineId][0] == 'v' && lineSplit[lineId][1] == ' ') {
      const posString = lineSplit[lineId].split(' ');
      const newPos = [parseFloat(posString[1]), parseFloat(posString[2]), parseFloat(posString[3])];

      if (bfirstVertex) {
        minValues = newPos;
        max = newPos;
        bfirstVertex = false;
      } else {
                // X axis
        if (newPos[0] < this.minValues[0]) {
          this.minValues[0] = newPos[0];
        }
        if (newPos[0] > this.maxValues[0]) {
          this.maxValues[0] = newPos[0];
        }
                // Y axis
        if (newPos[1] < this.minValues[1]) {
          this.minValues[1] = newPos[1];
        }
        if (newPos[1] > this.maxValues[1]) {
          this.maxValues[1] = newPos[1];
        }
                // Z axis
        if (newPos[2] < this.minValues[2]) {
          this.minValues[2] = newPos[2];
        }
        if (newPos[2] > this.maxValues[2]) {
          this.maxValues[2] = newPos[2];
        }
      }

      tempVertexPositionList.push(newPos);
    }
  }


  for (var lineId = 0; lineId < lineSplit.length; lineId++) {
    if (lineSplit[lineId][0] == 'f' && lineSplit[lineId][1] == ' ') {
      const faceString = lineSplit[lineId].split(' ');
      console.log(faceString);
            // count

      const vxString = faceString[1].split('/');
      const vyString = faceString[2].split('/');
      const vzString = faceString[3].split('/');

      const vx = parseInt(vxString[0]);
      const vy = parseInt(vyString[0]);
      const vz = parseInt(vzString[0]);

      this.vertexPositions.push(tempVertexPositionList[vx - 1]);
      this.vertexPositions.push(tempVertexPositionList[vy - 1]);
      this.vertexPositions.push(tempVertexPositionList[vz - 1]);
    }
  }
  this.centre = [(this.maxValues[0] + this.minValues[0]) * 0.5, (this.maxValues[1] + this.minValues[1]) * 0.5, (this.maxValues[2] + this.minValues[2]) * 0.5];
}

export { ObjParser as default };
