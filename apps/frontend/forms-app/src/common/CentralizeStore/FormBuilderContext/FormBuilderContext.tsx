import { createContext } from "react";
import { FormBuilderContextProviderProps } from "../../types";

const FormBuilderContext = createContext('');

const FormBuilderContextProvider = ({ children, value }: FormBuilderContextProviderProps) => {
    return (
        <FormBuilderContext.Provider value={value}>
            {children}
        </FormBuilderContext.Provider>
    )
}

export { FormBuilderContext, FormBuilderContextProvider };