import {
  useCallback,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from 'react';
import Quagga from '@ericblade/quagga2';
import styled from 'styled-components';
import {
  getMedianOfCodeErrors,
  defaultLocatorSettings,
  defaultConstraints,
  defaultDecoders,
} from '../utils/quagga';

const ScannerStyles = styled.div`
  .drawingBuffer {
    width: 100%;
    max-height: 100%;
  }
  canvas {
    position: absolute;
    transition: 0, 5s;
  }
  .overlay {
    background-color: #3fbbaf70;
  }

  video {
    width: 100%;
    max-height: 100%;
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
  numOfWorkers = 0,
  decoders = defaultDecoders,
  locate = true,
  onScannerReady,
  setSearchTearm,
  setScanning,
}) {
  const [error, setError] = useState(false);
  const [detected, setDetected] = useState(false);
  const scannerRef = useRef(null);
  const errorCheck = useCallback(
    (result) => {
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      // if Quagga is at least 75% certain that it read correctly, then accept the code.
      if (err < 0.25) {
        setDetected(true);
        setTimeout(() => {
          setSearchTearm(result.codeResult.code);
          setScanning(false);
        }, 500);
      }
    },
    [setSearchTearm, setScanning]
  );
  useLayoutEffect(() => {
    if (!scanning || !scannerRef?.current) {
      return;
    }
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
        if (err) {
          return console.log('Error starting Quagga:', err);
        }
        if (scannerRef && scannerRef.current) {
          Quagga.start();
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
        <canvas
          className={`drawingBuffer ${detected ? 'overlay' : ' '}`}
          width={320}
          height={320}
        ></canvas>
      </div>
    </ScannerStyles>
  );
}
