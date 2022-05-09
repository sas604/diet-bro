import { useRef, useState, useEffect } from 'react';
import { useBarcodeReader } from '../hooks/useBarcodeReader';

export function Scanner() {
  const scannerRef = useRef(null);
  // useEffect(() => {
  //   navigator.mediaDevices
  //     .enumerateDevices()
  //     .then(function (devices) {
  //       devices.forEach(function (device) {
  //         setCamera(device);
  //         console.log(device);
  //         console.log(
  //           device.kind + ': ' + device.label + ' id = ' + device.deviceId
  //         );
  //       });
  //     })
  //     .catch(function (err) {
  //       setCamera(err);
  //       console.log(err.name + ': ' + err.message);
  //     });
  // }, []);
  const [camera, setCamera] = useState({});
  const [scanning, setScanning] = useState(false);
  const scannTest = useBarcodeReader(scannerRef, scanning);

  return (
    <div>
      <div>{JSON.stringify(camera)}</div>
      <div>{scannTest.detected} </div>
      <div
        ref={scannerRef}
        style={{ position: 'relative', border: '3px solid red' }}
      >
        <button onClick={() => setScanning(!scanning)}>Scan</button>
        <canvas
          className="drawingBuffer"
          width={320}
          height={320}
          style={{
            border: '1px solid red',
            marginTop: '20px',
            position: 'absolute',
          }}
        ></canvas>
      </div>
    </div>
  );
}
