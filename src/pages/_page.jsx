import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import QRcode from 'qrcode';
import QRscanner from 'qr-scanner';

const Button = ({ children, onClick, isActive }) => {
  return (
    <button
      className={`transition w-full h-full hover:bg-black hover:text-white ${
        isActive ? 'bg-black text-white' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function Page() {
  const qrRef = useRef();
  const cameraRef = useRef();
  const [data, setData] = useState('');
  const [camera, setCamera] = useState(false);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('L');
  // const [maskPattern, setMaskPattern] = useState(undefined);
  const [version, setVersion] = useState(undefined);

  useEffect(() => {
    if (data) setCamera(false);
    if (!cameraRef.current) return;
    const qrScanner = new QRscanner(
      cameraRef.current,
      (result) => setData(result.data),
      { returnDetailedScanResult: true }
    );
    qrScanner.start();
    return () => qrScanner.destroy();
  }, [camera, data]);

  useEffect(() => {
    QRcode.toString(
      data,
      {
        type: 'svg',
        margin: 0,
        color: { dark: '000000FF', light: '00000000' },
        errorCorrectionLevel,
        // maskPattern,
        version,
      },
      (err, qrc) => {
        err ? console.log(err) : (qrRef.current.innerHTML = qrc);
        !camera &&
          data &&
          !err &&
          (qrRef.current.style.backgroundColor = 'transparent');
        !camera && data && err && (qrRef.current.style.backgroundColor = 'red');
      }
    );
  }, [data]);

  return (
    <motion.section
      animate={{ opacity: [0, 1] }}
      className="flex justify-center items-center h-full w-full text-[1.55vh]"
    >
      <main className="aspect-[1/2] h-full bg-white text-black grid auto-rows-fr">
        {data && (
          <motion.section
            animate={{ opacity: [0, 1] }}
            ref={qrRef}
            className="grid p-[1.5rem]"
          />
        )}
        {camera && !data && (
          <motion.section
            animate={{ opacity: [0, 1] }}
            className="relative h-full w-full flex justify-center items-center p-[1.5rem] overflow-hidden"
          >
            <button
              className="absolute z-50 h-full w-full transition hover:backdrop-grayscale"
              onClick={() => setCamera(false)}
            />
            <video ref={cameraRef} className="h-full w-full object-cover" />
          </motion.section>
        )}

        {!camera && !data && (
          <motion.section
            animate={{ opacity: [0, 1] }}
            className="p-[1.5rem] grid grid-flow-row-dense w-full h-full"
          >
            <header className="flex justify-between">
              <a
                href="https://github.com/appleicat/qrc"
                className="px-[0.33rem] aspect-square h-fit underline underline-offset-[0.15rem] transition hover:bg-black hover:text-white"
              >
                QRc
              </a>
              <div className="flex flex-row-reverse">
                <button
                  className="px-[0.33rem] flex justify-end aspect-square transition hover:bg-black hover:text-white"
                  onClick={() => setCamera(true)}
                >
                  cam
                </button>
                <button
                  className="px-[0.33rem] flex justify-end aspect-square transition hover:bg-black hover:text-white"
                  onClick={async () => {
                    const clipboard = await navigator.clipboard.read();
                    const image = await clipboard[0].getType('image/png');
                    const result = await QRscanner.scanImage(image, {
                      returnDetailedScanResult: true,
                    });
                    setData(result.data);
                  }}
                >
                  clip
                </button>
              </div>
            </header>
            <div className="grid grid-flow-row-dense w-full h-full items-end">
              <div>version</div>
              <div className="grid grid-cols-10 w-full h-full">
                <div className="col-span-full">
                  <Button
                    onClick={() => {
                      setVersion(undefined);
                    }}
                    isActive={version === undefined}
                  >
                    AUTO
                  </Button>
                </div>
                {[
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '10',
                  '11',
                  '12',
                  '13',
                  '14',
                  '15',
                  '16',
                  '17',
                  '18',
                  '19',
                  '20',
                  '21',
                  '22',
                  '23',
                  '24',
                  '25',
                  '26',
                  '27',
                  '28',
                  '29',
                  '30',
                  '31',
                  '32',
                  '33',
                  '34',
                  '35',
                  '36',
                  '37',
                  '38',
                  '39',
                  '40',
                ].map((v, key) => (
                  <Button
                    key={key}
                    onClick={() => {
                      setVersion(v);
                    }}
                    isActive={version === v}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>
            {/* <div className="grid grid-flow-row-dense w-full h-full items-end">
              <div>mask pattern</div>
              <div className="grid grid-cols-8 w-full h-full">
                <div className="col-span-full">
                  <Button
                    onClick={() => {
                      setMaskPattern(undefined);
                    }}
                    isActive={maskPattern === undefined}
                  >
                    AUTO
                  </Button>
                </div>
                {['0', '1', '2', '3', '4', '5', '6', '7'].map((mp, key) => (
                  <Button
                    key={key}
                    onClick={() => {
                      setMaskPattern(mp);
                    }}
                    isActive={maskPattern === mp}
                  >
                    {mp}
                  </Button>
                ))}
              </div>
            </div> */}
            <div className="grid grid-flow-row-dense w-full h-full items-end">
              <div>error correction level</div>
              <div className="grid grid-flow-col-dense w-full h-full">
                {['L', 'M', 'Q', 'H'].map((ecl, key) => (
                  <Button
                    key={key}
                    onClick={() => {
                      setErrorCorrectionLevel(ecl);
                    }}
                    isActive={errorCorrectionLevel === ecl}
                  >
                    {ecl}
                  </Button>
                ))}
              </div>
            </div>
          </motion.section>
        )}
        <section className="p-[1.5rem] border-t border-black">
          <textarea
            className="outline-none bg-transparent w-full h-full resize-none"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </section>
      </main>
    </motion.section>
  );
}
