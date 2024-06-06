import { useState, useCallback, useEffect, useRef } from "react";

function App() {

  let [msg, setMsg] = useState("");
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePass = useCallback( () => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$&*_-~^|?";

    for(let i=1;i<=length;i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setMsg("")
    setPassword(pass);
  } ,[length, numberAllowed,charAllowed,setPassword,setMsg]);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
    setMsg("Copied to clipbord!")

  }, [password, setMsg])

    // useRef hook
  const passwordRef = useRef(null);

  

  useEffect(() => {
    generatePass();
  }, [length, numberAllowed, charAllowed, generatePass])



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md 
        rounded-lg px-4 py-3 mt-5 bg-gray-700">

        <h1 className="text-center text-white  mb-2">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className="outline-none w-full text-orange-400 py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button className="hover:bg-blue-400 outline-none text-white 
            bg-blue-700 px-2 py-0.5 shrink-0" onClick={copyPassToClipboard}>
            Copy
          </button>
        </div>
        <div className="text-yellow-300 mb-2">{msg}</div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer "
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className="text-orange-400 ">Length :  {length}</label>

          </div>

          <div className="flex items-center  gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              value={length}
              id="numberInput"
              className="cursor-pointer "
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            />
            <label className="text-orange-400 ">Numbers</label>

          </div>

          <div className="flex items-center  gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              className="cursor-pointer"
              onChange={() => { setCharAllowed((prev) => !prev) }}
            />
            <label className="text-orange-400 ">Characters</label>

          </div>
        </div>

      </div>
    </>
  )
}

export default App
