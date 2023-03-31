import express from 'express';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());

let vowels = ['a', 'e', 'i', 'o', 'u'];

/*
Test requests:
curl -X POST -H "Content-Type:application/json" -d "{\"string\":\"asdfqwerty189%u^$@kli\"}" http://localhost:4004/vowels
curl -X POST -H "Content-Type:application/json" -d "{\"string\":\"\"}" http://localhost:4004/vowels
curl -X POST -H "Content-Type:application/json" -d "{\"string\":\"#q$r!GQPT^&LP\"}" http://localhost:4004/vowels
curl -X POST -H "Content-Type:application/json" -d "{\"string\":\"aUdfqAeOiy189%u^$@kli\"}" http://localhost:4004/vowels
curl -X POST -H "Content-Type:application/json" -d "{\"someKey\":\"someValue\"}" http://localhost:4004/vowels
*/
app.post('/vowels', (req, res) => {
    if (req.body.string) {
        let matches = req.body.string.match(
            new RegExp(vowels.join('|'), "gi")
        ) || [];
        let vowelsCounter = matches.length;
        res.send(
            "Vowels: " + JSON.stringify(matches) +
            "\nThe passed string: " + JSON.stringify(req.body) +
            "\nThere is/are " + vowelsCounter +
            " vowel(-s) in this string."
        );
    } else {
        res.send(
            "The passed string: " + JSON.stringify(req.body) +
            "\nSorry, there is no way we can count the vowels in this case."
        );
    }
})

app.listen(4004, () => {
    console.log("A server is listening at port 4004.");
});