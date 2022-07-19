import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useBarcodeReader } from '../hooks/useBarcodeReader';

const ScannerStyles = styled.div`
  canvas {
    position: absolute;
  }
  video {
    display: ${({ scanning }) => (scanning ? 'block' : 'none')};
    width: 320px;
    height: 320px;
  }
  .canvas-wrapper {
    position: relative;
  }
`;
export function Scanner({ scanning }) {
  const scannerRef = useRef(null);
  const { detected, error, debugg } = useBarcodeReader(scannerRef, scanning);
  if (error) return <h1>Camera is not avalible=</h1>;
  return (
    <ScannerStyles scanning={scanning}>
      <div>{detected}</div>
      <div className="canvas-wrapper" ref={scannerRef}>
        <canvas className="drawingBuffer" width={320} height={320}></canvas>
      </div>
      <pre>{JSON.stringify(debugg, undefined, 2)}</pre>
    </ScannerStyles>
  );
}
