import { useCallback, useEffect, useState, useRef } from 'react';
import Quagga from '@ericblade/quagga2';
import styled from 'styled-components';
import { setBarcodeData } from '../features/userData/userDataSlice';
import {
  getMedianOfCodeErrors,
  defaultLocatorSettings,
  defaultConstraints,
  defaultDecoders,
} from '../utils/quagga';
import { useDispatch } from 'react-redux';
const ScannerStyles = styled.div`
  .drawingBuffer {
    width: 320px;
    height: 320px;
  }
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

export function BarcodeReader({
  scanning,
  locator = defaultLocatorSettings,
  constraints = defaultConstraints,
  cameraId,
  facingMode,
  numOfWorkers = navigator.hardwareConcurrency || 0,
  decoders = defaultDecoders,
  locate = false,
  onScannerReady,
}) {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [debugg, setDebugg] = useState(false);
  const scannerRef = useRef(null);
  const errorCheck = useCallback(
    (result) => {
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      // if Quagga is at least 75% certain that it read correctly, then accept the code.
      if (err < 0.25) {
        console.log(result.codeResult.code);
        dispatch(setBarcodeData(result.codeResult.code));
      }
    },
    [dispatch]
  );
  const handleProcessed = (result) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;
    drawingCtx.font = '24px Arial';
    drawingCtx.fillStyle = 'green';
    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute('width')),
          parseInt(drawingCanvas.getAttribute('height'))
        );
        result.boxes
          .filter((box) => box !== result.box)
          .forEach((box) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: 'purple',
              lineWidth: 2,
            });
          });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: 'blue',
          lineWidth: 2,
        });
      }
    }
  };
  useEffect(() => {
    if (!scanning || !scannerRef?.current) {
      return;
    }

    console.log(scanning);
    if (
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function' ||
      !navigator.mediaDevices.enumerateDevices
    ) {
      setError('Camera is unavalible');
      return;
    }
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            ...constraints,
            ...(cameraId && { deviceId: cameraId }),
            ...(!cameraId && { facingMode }),
          },
          target: scannerRef.current,
        },
        locator,
        numOfWorkers,
        decoder: { readers: decoders },
        locate,
      },
      (err) => {
        Quagga.onProcessed(handleProcessed);

        if (err) {
          return console.log('Error starting Quagga:', err);
        }
        console.log(Quagga.canvas.ctx.overlay);
        if (scannerRef && scannerRef.current) {
          Quagga.start();
          setDebugg(Quagga.CameraAccess.getActiveTrack().getSettings());
          console.log(Quagga.CameraAccess.getActiveTrack().getSettings());
          if (onScannerReady) {
            console.log('scanner is ready');
            onScannerReady();
          }
        }
      }
    );
    Quagga.onDetected(errorCheck);
    return () => {
      Quagga.offDetected(errorCheck);
      Quagga.offProcessed(handleProcessed);
      Quagga.stop();
    };
  }, [
    scanning,
    scannerRef,
    errorCheck,
    locate,
    cameraId,
    constraints,
    decoders,
    facingMode,
    locator,
    numOfWorkers,
    onScannerReady,
  ]);

  return (
    <ScannerStyles scanning={scanning}>
      <div className="canvas-wrapper" ref={scannerRef}>
        <canvas className="drawingBuffer" width={320} height={320}></canvas>
      </div>
      <pre>{JSON.stringify(debugg, undefined, 2)}</pre>
    </ScannerStyles>
  );
}
