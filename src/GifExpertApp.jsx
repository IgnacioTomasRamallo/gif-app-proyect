import { useState } from "react"
import { AddCategory, GifGrid } from "./components";


const apiKey = 'TuSY5JRmoGnmsuWMcM71qlIpkMo8wmk2'

export const GifExpertApp = () => {

    const [categories, setCategories] = useState(['valorant']);

    const onAddCategory = (newCategory) =>{
        
        if( categories.includes(newCategory)) return;
        setCategories([ newCategory, ...categories ]);

        //categories.push( newCategory )
        //setCategories(cat =>  [...cat, 'Valorant'] );

    }
    

    

  return (
        <>
        {/* Titulo */}
            <h1>Gif expert app</h1>
        {/* Input */}
            <AddCategory 
                // setCategories={ setCategories }
                onNewCategory={ event => onAddCategory( event ) }
            />
        {/* Listado de items */}
        
        
            { 
                    categories.map( ( category ) =>(
                        <GifGrid 
                            key={ category } 
                            category={ category }
                        />
                    )
                )
            }

        </>
    )
}
