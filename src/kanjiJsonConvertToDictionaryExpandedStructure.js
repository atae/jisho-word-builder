let fs = require('fs');
let heisigToKanji = {"entries": []};
let kanjiToHeisig = {"entries": []};


let obj = JSON.parse(fs.readFileSync('./kanji.json', 'utf8'));

obj.feed.entry.forEach((el) => {
    let kanji = el.gsx$kanji.$t
    let heisig = el.gsx$heisigkeyword.$t

    if (heisig != "") {
        heisigToKanji.entries.push({
            "kanji" : kanji,
            "heisig": heisig
        })
    }
})


    fs.writeFile('heisigToKanjiExpandedStructure.json', JSON.stringify(heisigToKanji), function (err) {

    })


    // fs.writeFile('kanjiToHeisigExpanded.json', JSON.stringify(kanjiToHeisig), function (err) {

    

