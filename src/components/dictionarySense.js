import React from 'react';

const DictionarySense = (props) => {
    return(
        <div>
            {props.number + 1}. {props.entry.english_definitions.join('; ')}
        </div>
    );
};

export default DictionarySense;