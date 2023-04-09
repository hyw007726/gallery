import { createContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
interface ContextProps {
    data: {};
    setData:Dispatch<SetStateAction<{}>>
  }
const DataContext = createContext<ContextProps>({data:{}, setData: () => {}});

function DataContextProvider({children, dataContext}: {children: React.ReactNode, dataContext: {data: {}, setData:Dispatch<SetStateAction<{}>>}}) {

  return (
    <DataContext.Provider value={dataContext}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContextProvider };
export default DataContext;

