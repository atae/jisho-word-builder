import React, {Components} from 'react';

const DictionarySense = (props) => {
    console.log(props)
    return(
        <div>
            {props.number + 1}. {props.entry.english_definitions.join('; ')}
        </div>
    );
};

export default DictionarySense;