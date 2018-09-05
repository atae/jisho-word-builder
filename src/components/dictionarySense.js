import React from 'react';

const DictionarySense = (props) => {
    return(
        <div className="sense-entry">
            {props.number + 1}. {props.entry.english_definitions.join('; ')}
        </div>
    );
};

export default DictionarySense;