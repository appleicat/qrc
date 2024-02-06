import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import QRcode from 'qrcode';

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
  const ref = useRef();
  const [data, setData] = useState('');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('L');
  const [maskPattern, setMaskPattern] = useState(undefined);
  const [version, setVersion] = useState(undefined);
  useEffect(() => {
    QRcode.toString(
      data,
      {
        type: 'svg',
        margin: 0,
        color: { dark: '000000FF', light: '00000000' },
        errorCorrectionLevel,
        maskPattern,
        version,
      },
      (err, qrc) => {
        err ? console.log(err) : (ref.current.innerHTML = qrc);
        err
          ? (ref.current.style.backgroundColor = 'red')
          : (ref.current.style.backgroundColor = 'transparent');
      }
    );
  }, [data]);
  return (
    <motion.section
      animate={{ opacity: [0, 1] }}
      className="flex justify-center items-center h-full w-full text-[1.55vh]"
    >
      <main className="aspect-[1/2] h-full bg-white text-black grid auto-rows-fr">
        <section
          ref={ref}
          style={{ display: data ? 'grid' : 'none' }}
          className="p-[1.5rem]"
        />
        <section
          style={{ display: data ? 'none' : 'grid' }}
          className="p-[1.5rem] grid-flow-row-dense w-full h-full"
        >
          <div>QRcode</div>
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
          <div className="grid grid-flow-row-dense w-full h-full items-end">
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
          </div>
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
        </section>
        <section className="p-[1.5rem] border-t border-black">
          <textarea
            className="outline-none bg-transparent w-full h-full resize-none font-['JetBrains_Mono']"
            onChange={(e) => setData(e.target.value)}
          />
        </section>
      </main>
    </motion.section>
  );
}
