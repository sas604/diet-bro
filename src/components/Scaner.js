import { useRef, useState } from 'react';
import { useBarcodeReader } from '../hooks/useBarcodeReader';

export function Scanner() {
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const scannTest = useBarcodeReader(undefined, scannerRef, scanning);
  console.log(scannTest);

  return (
    <div>
      <div ref={scannerRef}>
        <button onClick={() => setScanning(!scanning)}>Scan</button>
        <canvas
          className="buffer"
          width={320}
          height={320}
          style={{ border: '1px solid red', marginTop: '20px' }}
        ></canvas>
      </div>
    </div>
  );
}
