import { useState } from "react"


export const AddCategory = ({ onNewCategory }) => {
  
    const [inputValue, setInputValue] = useState('');

    const onInputChange = ({target}) =>{
        setInputValue(target.value);
    }
    
    const onSubmit = ( event ) =>{
        event.preventDefault();
        if(inputValue.trim().length <= 1)return;
        //setCategories(cat => [ inputValue, ...cat ]);
        setInputValue('');
        onNewCategory( inputValue.trim() );
        
        


        

    }

    return (
        <form onSubmit={ event => onSubmit(event)}>
            <input 
                type="text"
                placeholder="Search Gifs"
                value={ inputValue }
                onChange={ onInputChange }
            />
        </form>
  )
}
