import { useEffect } from "react";
import { useState } from "react"

function App() {
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    getTransactions().then(setTrans);
  }, []);

  const getTransactions = async() => {
    const apiURL = import.meta.env.VITE_API_URL+'/transactions';
    const response = await fetch(apiURL);
    const json = await response.json();
    
    return json;
  }

  const addTrans = (ev) => {
    ev.preventDefault();
    const apiURL = import.meta.env.VITE_API_URL+'/transaction';
    fetch(apiURL, {
      method : 'POST',
      headers : {'Content-type' : 'application/json'},
      body : JSON.stringify({date, price, name, desc})
    }).then(response => {
      response.json().then(json => {
        console.log('result', json);
        
      })
    })
  }

  let balance = 0;
  for(const tran of trans) {
    balance = balance + tran.price;
  }
  balance = balance.toFixed(2);

  return (
    <section className="flex flex-col justify-center my-8 p-2 shadow-lg shadow-slate-600 rounded-md">
      <div>
        <h1 className="text-center text-[#FFFFFF] text-3xl md:text-4xl font-bold ">Balance : IDR {balance}</h1>
      </div>

      <form onSubmit={addTrans} className='mt-5'>
        <div id="basic" className="flex gap-2 mb-2">
          <input type="date"
          className="w-full bg-[#F9F9F9] text-[#141414] border-2 border-slate-300 px-3 py-2 rounded-md"
          value={date}
          onChange={ev => setDate(ev.target.value)}/>

          <input type="number" placeholder="IDR" 
          className="w-full bg-[#F9F9F9] text-[#141414] border-2 border-slate-300 px-3 py-2 rounded-md"
          value={price}
          onChange={ev => setPrice(ev.target.value)}/>
        </div>

        <div id="name" className="mb-2">
          <input type="text" placeholder="Transaction Name" 
          className="w-full bg-[#F9F9F9] text-[#141414] border-2 border-slate-300 px-3 py-2 rounded-md"
          value={name}
          onChange={ev => setName(ev.target.value)}/>
        </div>

        <div id="desc">
          <input type="text" placeholder="Transaction Description"
          className="w-full bg-[#F9F9F9] text-[#141414] border-2 border-slate-300 px-3 py-2 rounded-md"
          value={desc}
          onChange={ev => setDesc(ev.target.value)}/>
        </div>

        <div className="flex items-center justify-end mt-5">
          <button type="submit" className=" bg-[#4CAF50] text-[#141414] border-2 border-[#256628] px-4 py-2 rounded-lg">Add</button>
        </div> 
      </form>

      <div id="transactions-list" className="mt-5">
        {trans.length > 0 && trans.map((tran, index) => (
          <div key={index} id="transaction" className="flex justify-between mb-4 first:border-t-0 border-t border-[#f9f9f99d]">
            <div id="left-side">
              <div className="name text-xl font-semibold text-[#F9F9F9]">{tran.name}</div>
              <div className="desc text-sm text-[#f9f9f99d]">{tran.desc}</div>
            </div>

            <div id="right-side">
              <div className={"price text-xl font-semibold" + (tran.price < 0 ? ' text-red-600' : ' text-green-600')}>
                IDR {tran.price}
              </div>
              <div className="date text-sm text-[#f9f9f99d]">{tran.date}</div>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default App
