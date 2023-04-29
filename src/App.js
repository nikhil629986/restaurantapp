import React from 'react';
import { Route ,Routes} from 'react-router-dom';
import { Header,MainContainer,CreateContainer}  from './components';
import { AnimatePresence } from 'framer-motion';



const App = () => {
  return (
    <AnimatePresence>
    <div className="w-screen h-auto flex flex-col bg-primary
    ">
   <Header />
   <main className="mt-24 md:mt-30 px-16 py-6 w-full">
    <Routes>
      <Route path="/*" element={<MainContainer />}/>
      <Route path="createItem" element={<CreateContainer />} />
    </Routes>
   </main>
    </div>
    </AnimatePresence>
  )
}

export default App