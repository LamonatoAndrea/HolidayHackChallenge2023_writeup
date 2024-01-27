# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Faster Lock Combination
Difficulty: :christmas_tree:   
Over on Steampunk Island, Bow Ninecandle is having trouble opening a padlock. Do some research and see if you can help open it!

### Solution
Even though not listed as a hint, Bow Ninecandle itself provides the link to a very good youtube tutorial named “[\[198\] Close Up On How To Decode A Dial Combination Lock In 8 Attempts Or Less](https://www.youtube.com/watch?v=27rE5ZvWLU0)”, which I basically followed before going ballistic 🙂

#### The first digit
By applying some tension so as to have the “Tension Status” indicator looking brown, I determined $13 as the sticky number, with $4$ and $7$ being the guess numbers. To obtain the first number then: $n1 = sticky + 5 = 13 + 5 = 18$.

#### The third digit
A little more math gives us the remainder to watch out for $r = n1 / 4 = 18 / 4 = 4 R 2$. Based on the guess number, we can write down a table such as the following with eligible ones highlighted in green:
| aaaaaaaaaaaa | aaa | aaaaaaaaaaaaa | aaaaaaaaaaaaa | aaaaaaaaaaaaa | aaa | aaaaaaaaaaaaa | aaaaaaaaaaaaa | aaaaaaaaaaaaa |
| ------------ | --- | ------------- | ------------- | ------------- | --- | ------------- | ------------- | ------------- |
| GUESS NUMBER | $4$ | $4 + 10 = 14$ | $4 + 20 = 24$ | $4 + 30 = 34$ | $7$ | $7 + 10 = 17$ | $7 + 20 = 27$ | $7 + 30 = 37$ |
| REMAINDER | $4 / 4 = 1 R 0$ | $14 / 4 = 3 R 2$ | $24 / 4 = 6 R 0$ | $34 / 4 = 8 R 2$ | $7 / 4 = 1 R 3$ | $17 / 4 = 4 R 1$ | $27 / 4 = 6 R 3$ | $37 / 4 = 9 R 1$ |