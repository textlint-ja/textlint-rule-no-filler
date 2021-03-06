# @textlint-ja/textlint-rule-no-filler

「ええと」「あの」「まあ」などのフィラー（つなぎ表現）を禁止するtextlintルール

フィラー（つなぎ表現）は口語表現であるため、文章だと読みにくくなります。

NG:

```
えーと、フィラーについてですね。
あのー、この問題について教えてくれますか?
なんか出た…。
Vueのステート管理ライブラリでああるVuexについての文章です。
                          ^ 「あ」 がおかしな位置にあるため検出される
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint-ja/textlint-rule-no-filler

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "@textlint-ja/no-filler": true
    }
}
```

Via CLI

```
textlint --rule @textlint-ja/no-filler README.md
```


## Changelog

See [Releases page](https://github.com/textlint-ja/textlint-rule-no-filler/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint-ja/textlint-rule-no-filler/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
