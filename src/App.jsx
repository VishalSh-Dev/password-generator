import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [incChar, setIncChar] = useState(false);
  const [incNum, setIncNum] = useState(false);
  const [length, setLength] = useState(8);
  const [shuffle, setShuffle] = useState(false);
  const passwordRef = useRef(null);

  const passGen = useCallback(() => {
    let pass = "";
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (incChar) chars += "!@#$%^&*()-_=+;:?";
    if (incNum) chars += "0123456789";

    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(pass);
  }, [length, incChar, incNum, setPassword]);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passGen();
  }, [length, incChar, incNum, shuffle, passGen]);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 bg-slate-700 rounded-lg px-5 py-3 flex flex-col items-center">
          <h1 className="font-bold text-3xl text-amber-100 my-6 font-sans">
            Password Generator
          </h1>
          <div className="flex w-full gap-2 my-8">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Password"
              className="outline-none w-full py-3 px-3 rounded-lg"
              ref={passwordRef}
            />
            <button
              className="select-none rounded-lg bg-red-500 py-3 px-5 text-center align-middle font-sans text-s font-bold text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40"
              type="button"
              onClick={copyPass}
            >
              Copy
            </button>
          </div>
          <div className="flex w-full gap-2 px-3 py-2 flex-wrap">
            <input
              type="range"
              min="8"
              max="25"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="w-full md:w-1/3 h-2 my-2 cursor-pointer bg-gray-200 rounded-lg appearance-none dark:bg-gray-700"
            />
            <label className="text-l text-white font-sans">
              Length: {length}
            </label>
            <input
              type="checkbox"
              defaultChecked={incNum}
              id="numberInput"
              onChange={() => {
                setIncNum((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-white font-sans">
              Numbers
            </label>
            <input
              type="checkbox"
              defaultChecked={incChar}
              id="charInput"
              onChange={() => {
                setIncChar((prev) => !prev);
              }}
            />
            <label htmlFor="charInput" className="text-white font-sans">
              Characters
            </label>
          </div>
          <button
            className="w-full my-5 select-none rounded-lg bg-red-500 py-3 px-5 text-center align-middle font-sans text-s font-bold text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40"
            type="button"
            onClick={() => {
              setShuffle((prev) => !prev);
            }}
          >
            Shuffle
          </button>
        </div>
        <div className="fixed flex flex-wrap justify-center bottom-10 px-2 inset-x-0">
          Made with ❤️ by{" "}
          <span className="w-1"></span>{" "}
          <a
            href="https://www.linkedin.com/in/vishalshaw07/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vishal
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
