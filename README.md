

# Hiyoko Jisho

[Live Link](http://www.hiyokojisho.com/)

This dictionary was built to serve as a sort of transitional dictionary tool for the intermediate japanese learner. 
The main audience is the japanese learner who knows their Heisig keywords (RTK 1 & 3 plus thecite's RTK4 list) but still doesn't yet know all the readings or has trouble with kanji compounds. You can also enter the kanji and retrieve the Heisig keyword if it exists or not.

The app allows you to lookup kanji by their Heisig keywords and to build kanji compounds cumulatively as you go through multiple search queries within the same app window. This saves you from having to copy and paste into another window just to build up a search query.

I am actually actively using this application and am always looking for ways to add to the experience. 

# Example
If you wanted to look up the word 一網打尽, you could take the following actions
1. Type in "一”　into built word
2. Look up 'netting' (RTK1 Keyword) and click 'Add '網' to built word.'
3. Look up 'utsu' or ’うつ’, click on 'Add 打つ to built word.' and delete the つ
4. You can click on 'Search built word' at this point and the underlying Jisho.org API will complete the kanji compound for you if it's well known and  defined in its dictionary.
    
There are multiple ways to lookup a word, but so far these tools allow the user to improvise and use whatever method they'd like depending on how much of the word they already know.
    
# Technologies Used
- React
- Jisho.org Unofficial Official API
- Node for CORS

## Upcoming features
- J-J dictionary mode
- Word Branching History 
- Multitab Search Results Navigation
- Accomodate large blocks of unique kanji


