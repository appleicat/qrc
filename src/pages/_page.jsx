import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import QRcode from 'qrcode';
export default function Page() {
  const ref = useRef();
  const [data, setData] = useState('');
  useEffect(() => {
    QRcode.toString(
      data,
      {
        type: 'svg',
        margin: 0,
        color: { dark: '000000FF', light: '00000000' },
      },
      (err, qrc) => {
        err ? err : (ref.current.innerHTML = qrc);
        err
          ? (ref.current.style.backgroundColor = 'red')
          : (ref.current.style.backgroundColor = 'transparent');
      }
    );
  }, [data]);
  return (
    <motion.section
      animate={{ opacity: [0, 1] }}
      className="flex justify-center items-center h-full w-full"
    >
      <main className="aspect-[1/2] h-full bg-white text-black grid auto-rows-fr">
        <section
          ref={ref}
          style={{ display: data ? 'grid' : 'none' }}
          className="p-[3vmin]"
        />
        <section
          style={{ display: data ? 'none' : 'grid' }}
          className="p-[3vmin]"
        ></section>
        <section className="p-[3vmin] border-t border-black">
          <textarea
            className="outline-none bg-transparent w-full h-full resize-none font-['JetBrains_Mono']"
            onChange={(e) => setData(e.target.value)}
          />
        </section>
      </main>
    </motion.section>
  );
}
